#!/bin/bash

# Ask for a commit message
read -p "Enter commit message: " commit_msg

echo "📦 Staging tracked changes only (untracked files will be skipped)..."
git add -u  # Only add modified/deleted tracked files

echo "🔍 Here's what will be committed:"
git status

# Ask for confirmation
read -p "Proceed with commit and push? (y/n): " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "❌ Aborted."
  exit 0
fi

echo "📝 Committing..."
git commit -m "$commit_msg" || { echo "⚠️ Nothing to commit."; exit 0; }

echo "🚀 Pushing to GitHub..."
git push origin main
echo "✅ Push complete!"
