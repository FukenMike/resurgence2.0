# Workflows

Development, CI/CD, and deployment workflows for The Father's Alliance website.

---

## Local Development Workflow

### 1. Clone & Install

```bash
git clone <repo-url>
cd resurgence2.0
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```

- Opens at `http://localhost:5173` (auto-configured in `vite.config.ts`)
- Hot reload on file changes
- TypeScript errors shown in browser + terminal

### 3. Code & Test Locally

#### Type Check
```bash
npm run lint
```
Runs TypeScript in no-emit mode. Fix errors before committing.

#### Theme Lint
```bash
npm run lint:theme
```
Validates that only registered color tokens are used in CSS. Catches token typos and invalid colors.

#### Route Tests
```bash
npm run test:routes
```
Validates:
- No duplicate route IDs or paths
- All routes have required metadata
- Navigation config is sensible
- Sort orders are valid

#### Combined Lint
```bash
npm run lint:all
```
Runs type check + theme lint in sequence.

#### Build Locally
```bash
npm run build
```
- Generates sitemap (via `generateSitemap.mjs`)
- Runs Vite build → `dist/`
- Outputs production bundle

**Preview build**:
```bash
npm run preview
```
Serves `dist/` on `http://localhost:4173`

### 4. Commit & Push

```bash
git add .
git commit -m "Add feature: description"
git push origin my-branch
```

CI runs automatically on push.

---

## CI/CD Pipeline

### GitHub Actions Workflow

**File**: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

**Triggers**:
- `push` to `main` branch
- All pull requests to `main`

**Steps**:

1. **Checkout Code**
   ```
   uses: actions/checkout@v4
   ```

2. **Setup Node.js 20**
   ```
   uses: actions/setup-node@v4
   node-version: 20
   cache: npm
   ```

3. **Install Dependencies**
   ```
   npm ci  (clean install—exact versions)
   ```

4. **Lint (Type Check)**
   ```
   npm run lint
   ```
   - TypeScript strict mode
   - Soft-fail: `continue-on-error: true`
   - Errors reported but don't block build

5. **Lint: Theme**
   ```
   npm run lint:theme
   ```
   - Color token validation
   - Soft-fail (optional check)

6. **Test: Routes**
   ```
   npm test
   ```
   - Route registry validation
   - Soft-fail

7. **Build**
   ```
   npm run build
   ```
   - **Hard requirement**: Must pass
   - Generates sitemap + vite bundle → `dist/`
   - Fails entire workflow if unsuccessful

### CI Status Check

Before merging to `main`, verify:
- ✓ All lint steps passed (or soft-failed without blocking)
- ✓ Build succeeded (required)
- ✓ No merge conflicts

---

## Local CI Equivalent

To verify your changes before pushing (simulate CI):

```bash
npm run lint:all      # Type check + theme lint
npm run test:routes   # Route validation
npm run build         # Full build
npm run preview       # Optional: test in browser
```

If all pass, your PR is likely to pass CI.

---

## Build Process Details

### What `npm run build` Does

1. **Run `generateSitemap.mjs`** (script/generateSitemap.mjs)
   - Reads `routeRegistry` to enumerate all routes
   - Generates `public/sitemap.xml` with lastmod timestamps
   - Used by search engines for crawling

2. **Run Vite Build**
   - Bundles React + dependencies
   - Tree-shakes unused code
   - Minifies JS, CSS
   - Outputs to `dist/`

3. **Output Artifacts**
   - `dist/index.html` — Main HTML entry point
   - `dist/assets/` — Compiled JS + CSS bundles
   - `dist/robots.txt` — Already in public/; copied
   - `dist/sitemap.xml` — Generated

### Build Output

```
dist/
├── index.html                    # Main SPA entry
├── robots.txt                    # SEO crawler rules
├── sitemap.xml                   # Generated route map
└── assets/
    ├── index-XXXXX.js           # Main bundle
    ├── index-XXXXX.css          # Global styles
    └── [chunk files]            # Code split bundles
```

**Total size**: Typically 150–250 KB (gzipped ~50–80 KB) depending on dependencies.

---

## Resource Build

### Generate Resource Links

When you update [src/data/resources.seed.ts](../src/data/resources.seed.ts):

```bash
npm run build:resources
```

Outputs: `src/data/resourceLinks.json` (generated; used by resource directory)

**When to run**: After editing seed data and before testing resource directory.

### Sitemap Generation

Standalone:
```bash
npm run build:sitemap
```

Generates `public/sitemap.xml` manually (also runs as part of `npm run build`).

---

## Deployment Workflow

### Typical Deployment Scenario

**Assumption**: Using Netlify (most common for this type of SPA)

#### Step 1: Connect Repository
1. Log in to Netlify
2. "New site from Git" → Select your repository
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 20 (Netlify will auto-detect from CI)

#### Step 2: Deploy
- Netlify automatically builds on `push` to `main`
- CI runs tests; if passing, build is deployed
- Site live at `yoursite.netlify.app` (or custom domain)

#### Step 3: Verify
```bash
# After deployment
curl https://yoursite.netlify.app/
# Check status code 200
```

### Alternative Hosts

#### Vercel
```bash
# Connect repo via Vercel Dashboard
# Auto-detects Vite project
# Deploy on push to main
```

#### AWS S3 + CloudFront (Manual)
```bash
npm run build

# Upload to S3
aws s3 sync dist/ s3://my-bucket/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id XXXXX \
  --paths "/*"
```

#### Cloudflare Pages
```bash
# Connect repo via Cloudflare Pages dashboard
# Build command: npm run build
# Publish directory: dist
# Auto-deploys on push
```

---

## Code Review & Merge Workflow

### Branch Strategy

- **Main branch** (`main`) is always deployable
- Feature branches: `feature/`, `fix/`, `docs/`
- Branch naming: `feature/add-crisis-nav`, `fix/theme-toggle`

### PR Checklist (Reviewer)

- [ ] CI passes (green checkmark on PR)
- [ ] Code changes match description
- [ ] No breaking changes to routes/types
- [ ] Copy changes follow [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)
- [ ] New pages have route registry entry
- [ ] SEO title + description are set
- [ ] No hardcoded styling (use semantic tokens)

### Merging

1. **Squash & merge** (preferred for cleaner history)
   ```
   Merge pull request #123: Add crisis navigation page
   ```

2. **Create release notes** (optional; if major changes)
   - Link to relevant docs (ROUTES.md, etc.)
   - Highlight breaking changes (if any)

3. **Deploy** (automatic on Netlify/Vercel)

---

## Debugging & Troubleshooting

### Build Fails Locally

```bash
# Clear dependencies
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### Type Errors in IDE

```bash
# Ensure TypeScript is in sync
npm run lint
```

If IDE shows errors but `npm run lint` passes, restart your TypeScript server (VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server").

### Theme Lint Errors

```bash
npm run lint:theme
```

Check output for:
- Invalid token names (e.g., `text-ocean-dark` instead of `text-ocean`)
- Hardcoded colors (should use tokens)
- Typos in color variable names

**Fix**: Edit CSS classes to use only registered tokens from `tailwind.config.ts`.

### Route Tests Fail

```bash
npm run test:routes
```

Common issues:
- Duplicate route IDs (check all `id:` in routeRegistry)
- Duplicate paths (check all `path:` values)
- Missing nav config (all routes need `nav: { header, mobile, footer, label, order }`)

### Dev Server Not Starting

```bash
# Check if port 5173 is in use
lsof -i :5173

# Kill process if needed
kill -9 <PID>

# Restart
npm run dev
```

Or configure different port in `vite.config.ts`.

---

## Common Tasks

### Add a New Page

1. **Create page component**:
   ```tsx
   // src/pages/my-page.tsx
   export default function MyPage() {
     useEffect(() => {
       updatePageMeta({
         title: 'My Page',
         description: '...',
         path: '/my-page',
       });
     }, []);
     return <div>...</div>;
   }
   ```

2. **Add to route registry** (`src/routes/routeRegistry.tsx`):
   ```tsx
   {
     id: 'my-page',
     path: '/my-page',
     element: <MyPage />,
     title: 'My Page',
     description: '...',
     group: 'core',
     nav: { header: true, mobile: true, footer: false, label: 'My Page', order: 50 },
   }
   ```

3. **Test**:
   ```bash
   npm run test:routes
   npm run dev
   # Visit http://localhost:5173/my-page
   ```

### Update Copy

1. Edit `src/content/siteCopy.ts`:
   ```typescript
   export const myPageCopy = {
     headline: 'New headline',
     body: 'New body...',
   };
   ```

2. Page auto-updates in dev server (hot reload)
3. No rebuild needed

### Update Styling

1. Edit component CSS classes in JSX or add Tailwind utilities
2. Use only semantic tokens (ink, ocean, forest, etc.)
3. If adding new token, edit `tailwind.config.ts` and define CSS variable in theme file
4. Run `npm run lint:theme` to validate
5. Test locally: `npm run dev`

### Deploy Changes

After merging to `main`:
1. GitHub Actions CI runs automatically
2. If build passes, Netlify/Vercel auto-deploys
3. Site updates within 1–5 minutes
4. Verify at live URL

---

## Performance & Analytics

### Monitoring Deploys

**Netlify**:
- Deploy logs: Netlify dashboard → Deploys → latest
- Live URL is shown immediately after build

**Vercel**:
- Deployment logs: Vercel dashboard → Project → Deployments
- Preview URLs available during build

### GA4 Events

Custom page_view events are sent on route change:
- Filter: `event_name = "page_view"`
- Dimensions: `page_path`, `page_location`, `page_title`

Verify in GA4 Real-time report after deployment.

### Build Size Monitoring

After each build, note bundle size:
```bash
npm run build
# Check dist/ size: du -sh dist/
```

If size increases significantly (>20%), investigate:
- New dependency added?
- Unused code not tree-shaken?
- Large asset committed?

---

## Release Workflow (Optional)

For version tagging (if using semantic versioning):

```bash
# On main branch after merge
git tag -a v1.0.1 -m "Release v1.0.1: Add crisis nav page"
git push origin v1.0.1

# CI can auto-deploy tagged releases
```

---

## See Also

- [README.md](../README.md) — Scripts reference, quick start
- [ARCHITECTURE.md](./ARCHITECTURE.md) — App structure, routing
- [ROUTES.md](./ROUTES.md) — Route registry details

---

**Last Updated**: January 2026
