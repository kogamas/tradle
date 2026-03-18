# GitHub Actions Auto-Deployment

Your Tradle project now has automated deployment to GitHub Pages via GitHub Actions!

## How It Works

The workflow (`.github/workflows/deploy.yml`) automatically:

1. **Triggers on push to main branch** - Every time you push code to main, the workflow runs
2. **Installs dependencies** - Runs `npm install`
3. **Builds the project** - Runs `npm run build`
4. **Uploads artifacts** - Prepares the build files for deployment
5. **Deploys to GitHub Pages** - Automatically publishes to your GitHub Pages site

## Manual Deployment (Optional)

You can also manually trigger the workflow:

1. Go to your GitHub repository
2. Click on the **Actions** tab
3. Select **"Deploy to GitHub Pages"** workflow
4. Click **"Run workflow"** → **"Run workflow"**

## Setup Requirements

### Prerequisites

Before the workflow can work, you need to:

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/tradle.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository Settings → Pages
   - Under "Build and deployment":
     - **Source:** Select `Deploy from a branch`
     - **Branch:** Select `gh-pages`
     - **Folder:** Select `/ (root)`
   - Save

3. **Ensure main branch is protected** (optional but recommended)
   - Go to Settings → Branches
   - Add a rule for `main` branch

## Workflow Details

### What the workflow does:

- ✅ Runs on every push to the `main` branch
- ✅ Uses Node.js 18 (latest stable LTS)
- ✅ Caches npm dependencies for faster builds
- ✅ Uses official GitHub Pages deployment action
- ✅ Can be manually triggered via workflow_dispatch

### Benefits over manual deployment:

1. **Automatic** - No need to run `npm run deploy` manually
2. **Reliable** - GitHub officially maintains the deployment actions
3. **Consistent** - Same build environment every time
4. **Fast** - Dependencies are cached between runs
5. **Transparent** - See deployment history in Actions tab

## Monitoring Deployments

To watch your deployments:

1. Go to your GitHub repository
2. Click the **Actions** tab
3. View the workflow runs for "Deploy to GitHub Pages"
4. Click on any run to see detailed logs

Green checkmarks mean successful deployment! 🎉

## Deployment Flow

```
You push code to main
        ↓
GitHub detects push
        ↓
Workflow starts automatically
        ↓
Build & Test
        ↓
Deploy to GitHub Pages
        ↓
Your site is updated! 🚀
```

## Troubleshooting

### Workflow failing?

1. Check the **Actions** tab for error logs
2. Verify GitHub Pages settings (see Setup Requirements)
3. Ensure `npm run build` works locally: `npm run build`
4. Check that your `package.json` has correct `"homepage"` field

### Site not updating?

1. Check that the workflow completed successfully (green checkmark)
2. Wait 1-2 minutes for GitHub Pages to deploy
3. Clear browser cache (Cmd+Shift+Delete or Ctrl+Shift+Delete)
4. Check that you're visiting the correct URL: `https://YOUR_USERNAME.github.io/tradle`

## Quick Start Checklist

- [ ] Push code to GitHub main branch
- [ ] Enable GitHub Pages in repository settings (gh-pages branch)
- [ ] Check Actions tab to confirm workflow runs successfully
- [ ] Visit your site and verify it's live
- [ ] Make changes and push - deployment happens automatically!

That's it! Your site now deploys automatically on every push. 🎉

