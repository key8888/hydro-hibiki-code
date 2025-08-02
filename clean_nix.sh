#!/usr/bin/env bash

# === 設定変数 ===
# このセクションでは、スクリプト全体で使用される基本的な変数を定義します。

# Nix環境変数を設定するためのプロファイルスクリプトのパス
# このファイルはNixのインストール後に生成され、シェルで `nix` コマンドを使えるようにします。
profile=~/.nix-profile/etc/profile.d/nix.sh

# Nixの公式インストールスクリプトのURL
# 常に公式の最新版を使用することで、安定性と安全性を確保します。
install_source=https://nixos.org/nix/install

# 使用するNixpkgsのチャンネル名
# 'nixpkgs-unstable' は最新のパッケージが含まれる開発版のチャンネルです。
# 安定版を希望する場合は 'nixpkgs-24.05' など、特定のバージョンを指定します。
channel=nixpkgs-unstable


# === スクリプトの実行設定 ===

# エラーが発生した場合にスクリプトを即座に終了させる設定
# これにより、予期せぬ問題が起きた際に処理が中途半端な状態で続行されるのを防ぎます。
set -e


# === Nixのインストール処理 ===
# このセクションでは、Nixがシステムにインストールされているかを確認し、
# インストールされていない場合にのみ、インストール処理を実行します。

# `command -v nix` でnixコマンドが存在するかどうかをチェック
if ! [ -x "$(command -v nix)" ]; then
    echo "Nixが見つかりません。インストールを開始します..."

    # --- 依存関係のインストール ---
    # ディストリビューションに応じて、Nixのインストールに必要なパッケージを導入します。
    if [ -x "$(command -v apk)" ]; then
        # Alpine Linuxの場合
        echo "Alpine Linuxを検出しました。依存関係をインストールします..."
        # `coreutils` は `cp` コマンドの互換性のため、`shadow` はユーザー管理のために必要です。
        apk add xz curl bash shadow coreutils
    elif [ -x "$(command -v apt-get)" ]; then
        # Debian/Ubuntuベースの場合
        echo "Debian/Ubuntuを検出しました。依存関係をインストールします..."
        apt-get update
        apt-get install -y curl xz-utils
    fi

    # --- Snapでインストールされたcurlの対処 ---
    # Snap版のcurlはNixインストーラーと互換性の問題を起こすことがあるため、
    # 存在する場合はアンインストールし、aptで再インストールを試みます。
    if [ -f "/snap/bin/curl" ]; then
        echo "Snap版のcurlを検出しました。互換性のために削除します..."
        snap remove curl || true
        if [ -x "$(command -v apt-get)" ]; then
            apt-get update
            apt-get install -y curl
        elif ! [ -x "$(command -v wget)" ]; then
            echo "エラー: Snap以外のcurlまたはwgetをインストールしてください。"
            exit 1
        fi
    fi
    
    # --- Nixのマルチユーザーインストール準備 ---
    # Nixを安全なマルチユーザーモードで動作させるための準備です。
    
    # Nixストア用のディレクトリを作成
    mkdir -p -m 0755 /nix

    # Nixのビルドプロセス専用のユーザーグループ 'nixbld' を作成
    # `|| true` をつけることで、既に存在する場合でもエラーで停止しないようにします。
    if command -v groupadd &> /dev/null; then
        groupadd nixbld -g 30000 || true
    else
        echo "警告: 'groupadd' コマンドが見つかりません。ユーザー作成をスキップします。"
    fi

    # Nixのビルドを実行するための専用ユーザー 'nixbld1' から 'nixbld10' を作成
    # これにより、各ビルドが隔離された権限で実行され、セキュリティが向上します。
    if command -v useradd &> /dev/null; then
        for i in {1..10}; do
            useradd -c "Nix build user $i" -d /var/empty -g nixbld -G nixbld -M -N -r -s "$(which nologin)" "nixbld$i" || true
        done
    else
        echo "警告: 'useradd' コマンドが見つかりません。ユーザー作成をスキップします。"
    fi

    # --- Nixインストーラーのダウンロードと実行 ---
    echo "公式インストーラーをダウンロードしています: $install_source"
    
    # curlで公式インストーラーをダウンロードし、/tmpに保存
    curl -L $install_source --output /tmp/nix-install.sh
    
    echo "インストーラーを実行します..."
    # ダウンロードしたスクリプトを実行してNixをインストール
    # `--daemon`: マルチユーザーモードでのインストールを指定（推奨）
    # `--no-channel-add`: インストーラーによるチャンネル追加をスキップし、後ほど手動で設定
    sh /tmp/nix-install.sh --daemon --no-channel-add
    
    # --- シェル設定の更新 ---
    # Nixを恒久的に利用できるよう、シェルの設定ファイルにプロファイルの読み込みコマンドを追記します。
    echo ". $profile" >> ~/.bashrc
    # zshを使用している場合、~/.zshrcにも追記
    [[ -f ~/.zshrc ]] && echo ". $profile" >> ~/.zshrc
    
    # 現在のセッションでNixを有効化
    . $profile
fi


# === Nixの基本設定 (/etc/nix/nix.conf) ===
# このセクションでは、Nixのグローバルな設定ファイルを作成・設定します。

echo "Nixの設定ファイルを作成しています..."

# Nixの設定ディレクトリを確保
mkdir -p /etc/nix

# Nixの設定ファイル /etc/nix/nix.conf を作成または上書き
# `substituters` に公式のバイナリキャッシュを指定
# これにより、ソースからビルドする代わりに、ビルド済みのパッケージを高速にダウンロードできます。
echo "substituters = https://cache.nixos.org/" > /etc/nix/nix.conf

# `trusted-public-keys` に公式キャッシュの公開鍵を指定
# これにより、キャッシュからダウンロードしたパッケージの信頼性を検証します。
echo "trusted-public-keys = cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY=" >> /etc/nix/nix.conf

# `experimental-features` を有効化
# `nix-command`: 新しい `nix` コマンド体系（例: `nix profile install`）を有効にします。
# `flakes`: 再現性の高いビルドを実現するFlakes機能を有効にします。
echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf

# ネットワーク接続のタイムアウト値を設定
echo "connect-timeout = 10" >> /etc/nix/nix.conf


# === Nixチャンネルの設定 ===
# このセクションでは、パッケージの集合である「チャンネル」をシステムに登録・更新します。

# `nixpkgs` チャンネルがまだ登録されていない場合のみ、追加処理を実行
if ! [ "$(nix-channel --list | grep nixpkgs)" ]; then
    echo "'nixpkgs' チャンネルを登録します..."
    # 公式のチャンネルURLを追加
    nix-channel --add https://nixos.org/channels/$channel nixpkgs
fi

echo "チャンネル情報を更新しています。これには時間がかかる場合があります..."
# 登録したチャンネルの最新情報を取得
nix-channel --update

# ユーザーごとのNixpkgs設定ディレクトリを作成
mkdir -p ~/.config/nixpkgs


# === 完了 ===
# エラーで停止する設定を解除
set +e

echo ""
echo "✅ Nixのインストールと設定が完了しました！"
echo "新しいターミナルを開くか、'source ~/.bashrc' (または '.zshrc') を実行してNixを有効にしてください。"