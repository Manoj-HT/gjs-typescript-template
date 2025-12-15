#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Create release directory
rm -rf release
mkdir -p release

# Copy compiled files
# Assuming compiled files are in dist/
cp -r dist/* release/

# Copy runner script
cp tools/runner.sh release/start.sh
chmod +x release/start.sh

echo "Build complete! Distribution files are in 'release/' directory."
echo "You can zip this folder or create an installer from it."
