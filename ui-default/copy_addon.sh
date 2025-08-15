#!/bin/bash

# chmod +x copy_addon.sh
# ./copy_addon.sh

# コピー元のパス（このスクリプトがある場所）
SOURCE_DIR="$(cd "$(dirname "$0")"; pwd)"

# コピー先のパス
DEST_DIR="/root/.hydro/addons/addon"

# コピー対象のリスト
ITEMS=("frontend" "locales" "package.json" "public" "templates")

# コピー先ディレクトリが存在しない場合は作成
mkdir -p "$DEST_DIR"

# 各アイテムをチェックしてコピー
for ITEM in "${ITEMS[@]}"; do
    if [ -e "$SOURCE_DIR/$ITEM" ]; then
        echo "コピー中: $ITEM → $DEST_DIR"
        cp -r "$SOURCE_DIR/$ITEM" "$DEST_DIR/"
    else
        echo "存在しないためスキップ: $ITEM"
    fi
done

echo "✅ コピー完了"