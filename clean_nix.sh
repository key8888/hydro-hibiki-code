#!/usr/bin/env bash
set -e

install_source="https://nixos.org/nix/install"
profile=~/.nix-profile/etc/profile.d/nix.sh
channel=nixpkgs-unstable

if [ -f $profile ] && ! command -v nix >/dev/null; then
    . $profile || true
fi

PATH=$PATH:/usr/sbin

if ! command -v nix >/dev/null; then
    echo "No nix found. Installing..."

    if [ -x "$(command -v apk)" ]; then
        apk add xz curl bash shadow coreutils
    fi

    mkdir -p -m 0755 /nix
    if ! command -v groupadd >/dev/null; then
        echo "groupadd command is required to run this script"
        exit 1
    fi

    groupadd nixbld -g 30000 || true
    for i in {1..10}; do
        useradd -c "Nix build user $i" -d /var/empty -g nixbld -G nixbld -M -N -r -s "$(which nologin)" "nixbld$i" || true
    done

    if ! command -v xz >/dev/null; then
        if command -v apt-get >/dev/null && command -v dpkg >/dev/null; then
            apt-get update
            apt-get install xz-utils -y
        else
            echo "xz command is required to run this script"
            exit 1
        fi
    fi

    if [ -f "/snap/bin/curl" ]; then
        snap remove curl || true
        if command -v apt-get >/dev/null && command -v dpkg >/dev/null; then
            apt-get update
            apt-get install curl -y
        elif ! command -v wget >/dev/null; then
            echo "Please install wget or curl (not snap)."
            exit 1
        fi
    fi

    echo "Downloading from $install_source"
    curl -L "$install_source" --output /tmp/nix-install.sh
    head /tmp/nix-install.sh

    sh /tmp/nix-install.sh --no-channel-add

    echo ". $profile" >>~/.bashrc
    [[ -f ~/.zshrc ]] && echo ". $profile" >>~/.zshrc
    . $profile
    mkdir -p /etc/nix
fi

# Nix設定
echo "substituters = https://cache.nixos.org/" >/etc/nix/nix.conf
echo "trusted-public-keys = cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY=" >>/etc/nix/nix.conf
echo "connect-timeout = 10" >>/etc/nix/nix.conf
echo "experimental-features = nix-command flakes" >>/etc/nix/nix.conf

# チャンネル追加
if ! nix-channel --list | grep nixpkgs >/dev/null; then
    nix-channel --add https://nixos.org/channels/$channel nixpkgs
fi
nix-channel --add https://nix-channel.hydro.ac/ hydro

echo "Now unpacking channel. Might take a while..."
echo "You can safely ignore the 'installing Nix as root is not supported by this script' error above."
nix-channel --update
mkdir -p ~/.config/nixpkgs
echo "Hydro Nix channel added successfully."