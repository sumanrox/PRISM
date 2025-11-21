#!/bin/bash

# Start local development server for modular HTML version
# This script starts a simple HTTP server to test the modular version

PORT=${1:-8000}

echo "🚀 Starting Vulnerability Report Builder (Modular Version)"
echo "================================================"
echo ""
echo "📁 Serving from: $(pwd)"
echo "🌐 Server: http://localhost:$PORT"
echo "📄 Modular: http://localhost:$PORT/index-modular.html"
echo "📄 Original: http://localhost:$PORT/index.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server $PORT
# Fallback to Python 2
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer $PORT
else
    echo "❌ Error: Python not found!"
    echo "Please install Python or use another web server."
    exit 1
fi
