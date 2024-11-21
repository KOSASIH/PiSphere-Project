#!/bin/bash

# Setup the environment for PiSphere testing

echo "Setting up the environment..."

# Step 1: Create a virtual environment
echo "Creating a virtual environment..."
python3 -m venv venv

# Step 2: Activate the virtual environment
echo "Activating the virtual environment..."
source venv/bin/activate

# Step 3: Install required packages
echo "Installing required packages..."
pip install -r requirements.txt

echo "Environment setup completed successfully."
