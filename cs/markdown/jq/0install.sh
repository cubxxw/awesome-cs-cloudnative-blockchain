#!/bin/sh
set -e

if [ "$#" -eq 0 ]; then
    echo "This script runs 0install from your PATH or downloads it on-demand."
    echo ""
    echo "To run 0install commands without adding 0install to your PATH:"
    echo "./0install.sh --help"
    echo "./0install.sh COMMAND [OPTIONS]"
    echo ""
    echo "To install to /usr/local:"
    echo "sudo ./0install.sh install local"
    echo ""
    echo "To install to your home directory:"
    echo "./0install.sh install home"
    exit 1
fi

download() {
    zeroinstall_release=0install-$(uname | tr '[:upper:]' '[:lower:]')-$(uname -m)-${ZEROINSTALL_VERSION:-latest}
    download_dir=~/.cache/0install.net/$zeroinstall_release

    if [ ! -f $download_dir/files/0install ]; then
        echo "Downloading 0install..." >&2
        rm -rf $download_dir
        mkdir -p $download_dir
        curl -sSL https://get.0install.net/$zeroinstall_release.tar.bz2 | tar xj --strip-components 1 --directory $download_dir
    fi
}

if [ "$1" = "install" ]; then
    download
    shift 1
    $download_dir/install.sh "$@"
else
    if command -v 0install > /dev/null 2> /dev/null; then
        0install "$@"
    else
        download
        $download_dir/files/0install "$@"
    fi
fi
