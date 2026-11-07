#!/bin/bash
# Deployment helper for Mylesh S Portfolio

echo "=================================================="
echo "   MYLESH S — PORTFOLIO DEPLOYMENT HELPER"
echo "=================================================="

# Check if git remote exists
REMOTE_URL=$(git remote get-url origin 2>/dev/null)

if [ -z "$REMOTE_URL" ]; then
  echo ""
  echo "⚠️  No GitHub remote detected yet."
  echo ""
  echo "To connect to your GitHub repository, run:"
  echo "  git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/mylesh-portfolio.git"
  echo "  git push -u origin main"
  echo ""
  echo "Then open https://vercel.com/new and click 'Import' on your repo!"
else
  echo ""
  echo "✅ GitHub Remote found: $REMOTE_URL"
  echo "Pushing latest commits to GitHub..."
  git push origin main
  echo ""
  echo "🚀 Pushed successfully! Vercel will auto-deploy your updates."
fi

