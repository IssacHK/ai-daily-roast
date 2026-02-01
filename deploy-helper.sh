#!/bin/bash
# Helper script for GitHub Pages deployment

cd "$(dirname "$0")"

echo "=== GitHub Pages Deployment Helper ==="
echo ""

# Check if authenticated
if ! gh auth status &>/dev/null; then
    echo "❌ Not authenticated with GitHub CLI"
    echo "Please run: gh auth login"
    echo ""
    echo "After authentication, run these commands:"
    echo "1. gh repo create ai-daily-roast --public --source=. --push"
    echo "2. Enable GitHub Pages in repo settings (Settings > Pages > Source: GitHub Actions)"
    exit 1
fi

echo "✓ Authenticated with GitHub CLI"

# Create repo if doesn't exist
if ! gh repo view ai-daily-roast &>/dev/null; then
    echo "Creating repository..."
    gh repo create ai-daily-roast --public --source=. --push
fi

echo "✓ Repository created/pushed"

# Get repo URL
REPO_URL=$(gh repo view ai-daily-roast --json url --jq '.url')
echo "Repository URL: $REPO_URL"

echo ""
echo "✓ GitHub Pages will be deployed via GitHub Actions workflow"
echo "  (The workflow is already configured in .github/workflows/deploy.yml)"
echo ""
echo "To enable GitHub Pages:"
echo "1. Go to: https://github.com/$(gh repo view ai-daily-roast --json owner,name --jq '.owner.login + "/" + .name')/settings/pages"
echo "2. Set Source to 'GitHub Actions'"
echo ""
echo "GitHub Pages URL (after deployment): https://$(gh repo view ai-daily-roast --json owner,name --jq '.owner.login + ".github.io/" + .name')"
