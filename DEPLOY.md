# AI Daily Roast Dashboard - Deployment Guide

## Quick Deployment (Complete these steps)

### Step 1: Authenticate with GitHub CLI
```bash
gh auth login
# Choose "Login with a web browser" and enter the one-time code
```

### Step 2: Create Repository & Push
```bash
cd /Users/heitoyu/.openclaw/workspace/ai-daily-roast
gh repo create ai-daily-roast --public --source=. --push
```

### Step 3: Enable GitHub Pages
1. Go to: https://github.com/$(gh repo view ai-daily-roast --json owner,name --jq '.owner.login + "/" + .name')/settings/pages
2. Under "Build and deployment", select "Source" as "GitHub Actions"

### Step 4: Trigger First Deployment
```bash
# Push any change to trigger the workflow, or manually run it:
gh workflow run deploy.yml
```

## Repository & Pages URLs
- **Repository URL**: https://github.com/$(gh repo view ai-daily-roast --json owner,name --jq '.owner.login + "/" + .name')
- **GitHub Pages URL**: https://$(gh repo view ai-daily-roast --json owner,name --jq '.owner.login + ".github.io/" + .name')

## What the Workflow Does
The `.github/workflows/deploy.yml` workflow:
1. Runs on every push to `main`
2. Runs daily at 5:00 AM UTC+8 (via cron)
3. Installs dependencies
4. Generates daily roast data
5. Commits and pushes updated data
6. Deploys to GitHub Pages

## Current Project Status
- ✅ Workflow file: `.github/workflows/deploy.yml` (ready)
- ❌ GitHub repository: Not yet created (requires authentication)
- ❌ GitHub Pages: Not yet enabled (requires repo creation first)
