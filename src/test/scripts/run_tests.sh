#!/bin/bash

# Run the tests for the PiSphere application

echo "Running tests..."

# Step 1: Activate the virtual environment
if [ -d "venv" ]; then
    echo "Activating the virtual environment..."
    source venv/bin/activate
else
    echo "Virtual environment not found. Please run setup_environment.sh first."
    exit 1
fi

# Step 2: Run the tests
echo "Executing tests..."
pytest test/ --maxfail=1 --disable-warnings -q

# Step 3: Deactivate the virtual environment
echo "Deactivating the virtual environment..."
deactivate

echo "Tests completed."
