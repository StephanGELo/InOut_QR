#!/bin/bash

echo "🔄 Pulling latest from GitHub..."
git pull origin main || { echo "❌ Pull failed. Please resolve any conflicts."; exit 1; }
echo "✅ Local repo is up to date!"
