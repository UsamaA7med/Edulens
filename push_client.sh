#!/bin/bash

# ─── CONFIG ───────────────────────────────────────────────
GITHUB_USER="UsamaA7med"
REPO_NAME="Edulens"
BRANCH="main"
FILE_PATH="client"        # Change to specific file if needed, e.g. "client/src/index.js"
COMMIT_MSG="Update client"
# ──────────────────────────────────────────────────────────

echo "📦 Staging client files..."
git add $FILE_PATH

echo "💬 Committing..."
git commit -m "$COMMIT_MSG"

echo "🚀 Pushing to GitHub..."
git push origin $BRANCH

echo ""
echo "✅ Done! Raw URL for your file:"
echo "https://raw.githubusercontent.com/$GITHUB_USER/$REPO_NAME/$BRANCH/$FILE_PATH"
