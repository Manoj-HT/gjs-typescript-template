#!/bin/bash

# Function to install gjs
install_gjs() {
    echo "GJS not found. Attempting to install..."
    if [ -x "$(command -v apt-get)" ]; then
        sudo apt-get update && sudo apt-get install -y gjs libgtk-4-1 gir1.2-gtk-4.0
    elif [ -x "$(command -v dnf)" ]; then
        sudo dnf install -y gjs gtk4
    elif [ -x "$(command -v pacman)" ]; then
        sudo pacman -S --noconfirm gjs gtk4
    else
        echo "Could not detect package manager. Please install 'gjs' and 'gtk4' manually."
        exit 1
    fi
}

# Check for GJS
if ! command -v gjs &> /dev/null; then
    install_gjs
fi

# Get the directory of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the app
# Assuming the app is in the same directory or dist/app.js relative to it
if [ -f "$DIR/app.js" ]; then
    gjs -m "$DIR/app.js"
elif [ -f "$DIR/dist/app.js" ]; then
    gjs -m "$DIR/dist/app.js"
else
    echo "Error: Could not find app.js"
    exit 1
fi
