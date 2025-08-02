#!/bin/bash
if [ $EUID != 0 ]; then
    echo "This script requires root however you are currently running under another user."
    echo "We will call sudo directly for you."
    echo "Please input your account password below:"
    echo "安装脚本需要使用 root 权限，请在下方输入此账号的密码确认授权："
    sudo "$0" "$@"
    exit $?
fi

set -e
echo "Executing Hydro install script v3.0.1 (Modified)"
echo "Hydro includes system telemetry,
which helps developers figure out the most commonly used operating system and platform.
To disable this feature, checkout our sourcecode."

mkdir -p /data/db /data/file ~/.hydro

# 元の curl スクリプトの代わりにローカルの clean_nix.sh を実行
bash ./clean_nix.sh

# PATH 設定
export PATH=$HOME/.nix-profile/bin:$PATH

# 必要なパッケージをインストール
nix-env -iA nixpkgs.nodejs nixpkgs.coreutils nixpkgs.qrencode

echo "扫码加入QQ群："
echo https://qm.qq.com/cgi-bin/qm/qr\?k\=0aTZfDKURRhPBZVpTYBohYG6P6sxABTw | qrencode -o - -m 2 -t UTF8

# base64/gunzip の代わりにローカルの JS ファイルを直接実行
node ./install.js "$@"

set +e
