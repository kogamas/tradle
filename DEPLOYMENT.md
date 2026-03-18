# Deploying Tradle to GitHub Pages

This guide walks you through deploying your Tradle React app to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your machine
- Node.js and npm installed

## Step-by-Step Deployment Instructions

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `tradle` (or any name you prefer)
3. **Important:** Do NOT initialize with README, .gitignore, or license (you have these locally)

### Step 2: Connect Your Local Repository to GitHub

In your project directory, run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/tradle.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**If you already have a remote origin, update it instead:**
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/tradle.git
git push -u origin main
```

### Step 3: Verify Your package.json is Configured

Your `package.json` should already have:

✅ **Homepage:** `"homepage": "/tradle"` (or `/YOUR_REPO_NAME`)
✅ **Deploy scripts:** `predeploy` and `deploy` scripts
✅ **gh-pages dependency:** Already installed

If not, make sure these are in your `package.json`:

```json
{
  "homepage": "/tradle",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "devDependencies": {
    "gh-pages": "^5.0.0",
    ...
  }
}
```

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Deploy to GitHub Pages

```bash
npm run deploy
```

This command will:
1. Run `npm run build` to create an optimized production build
2. Deploy the contents of the `build/` folder to the `gh-pages` branch

### Step 6: Configure GitHub Pages Settings

1. Go to your GitHub repository
2. Click **Settings** → **Pages** (on the left sidebar)
3. Under "Build and deployment":
   - **Source:** Select `Deploy from a branch`
   - **Branch:** Select `gh-pages`
   - **Folder:** Select `/ (root)`
4. Click **Save**

GitHub will display your site URL, typically: `https://YOUR_USERNAME.github.io/tradle`

### Step 7: Verify Deployment

1. Wait 1-2 minutes for GitHub Pages to build and deploy
2. Visit your site at `https://YOUR_USERNAME.github.io/tradle`
3. Your Tradle app should now be live! 🎉

## Updating Your Site

Whenever you make changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
npm run deploy
```

Or create a deployment shortcut:

```bash
npm run deploy && git push origin main
```

## Troubleshooting

### Site shows 404 error
- Wait a few minutes for deployment to complete
- Check that the `gh-pages` branch exists in your repository settings
- Verify `"homepage"` matches your repo name

### Styles not loading
- The `"homepage": "/tradle"` path must match your GitHub repo name
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### Build fails
- Run `npm install` to ensure all dependencies are installed
- Check for any build errors: `npm run build`
- Make sure TypeScript compiles without errors

## Custom Domain (Optional)

If you want to use a custom domain:

1. Go to your repository Settings → Pages
2. Under "Custom domain", enter your domain name
3. Follow GitHub's instructions for DNS configuration

## Additional Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [Create React App Deployment Guide](https://create-react-app.dev/docs/deployment/#github-pages)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)

