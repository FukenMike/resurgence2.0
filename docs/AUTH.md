# Authentication (Demo)

**Status**: Demo authentication (localStorage-based); real auth integration planned  
**Last Updated**: January 30, 2026

---

## Demo Auth Model Overview

The current authentication system is **demo-only** and uses browser localStorage to maintain a session. It is **not secure** and should not be used for production user data.

### How It Works

1. **Login page** (`/login`): User selects a demo role (family, provider, or admin)
2. **Session storage**: Role is stored in localStorage under key `auth_session` as JSON: `{ role: "family" | "provider" | "admin" }`
3. **Route gating**: Protected routes (e.g., `/family-portal`, `/provider-portal`) use `RequireAuth` wrapper to check role
4. **Post-login redirect**: Browser redirects to `/portals` (portal entry page) or `?next=/route` if provided
5. **Logout**: Clearing localStorage session returns user to login

### Demo Roles

| Role | Access |
|------|--------|
| `family` | Can access `/family-portal` |
| `provider` | Can access `/provider-portal` |
| `admin` | Can access both portals (future: admin features) |
| (none) | Redirects to `/login` when accessing gated routes |

---

## Route Gating

### Protected (Gated) Routes

Routes requiring authentication are defined in [src/routes/routeRegistry.tsx](../src/routes/routeRegistry.tsx) with an `auth` requirement:

```typescript
{
  id: 'family-portal',
  path: '/family-portal',
  element: <FamilyPortal />,
  auth: {
    required: true,
    role: 'family'
  },
  // ...
}
```

When a user without the required role accesses a gated route:
- `RequireAuth` wrapper (in [src/routes/renderRoutes.tsx](../src/routes/renderRoutes.tsx)) checks role
- If role mismatch or not authenticated: User is redirected to `/login?next=/original-path`
- After login with correct role: User is redirected back to original path

### Public Routes

All other routes (including `/login`, `/portals`, `/resources`, etc.) are public and require no authentication.

---

## Login Flow

### Step 1: User Visits Gated Route
```
User → /family-portal (no auth)
         ↓
RequireAuth checks auth_session
         ↓
No session or wrong role → Redirect to /login?next=/family-portal
```

### Step 2: User Selects Role
```
User visits /login
       ↓
Shows demo role selector: [Family] [Provider] [Admin]
       ↓
User clicks button
       ↓
Sets localStorage: auth_session = { role: "family" }
```

### Step 3: Redirect to Portal
```
Browser redirects to /portals (or ?next=/family-portal if provided)
       ↓
User can now access /family-portal (role matches)
```

### Step 4: Logout
```
Clear localStorage: delete window.localStorage.auth_session
       ↓
User is logged out
       ↓
Next gated route access → Redirect to /login
```

---

## Code Structure

### Session Management

**Session is stored in localStorage** as JSON:
```javascript
// After login
localStorage.setItem('auth_session', JSON.stringify({ role: 'family' }))

// Retrieve session
const session = JSON.parse(localStorage.getItem('auth_session'))
// { role: 'family' }

// Logout
localStorage.removeItem('auth_session')
```

### Route Gating Component

[src/routes/renderRoutes.tsx](../src/routes/renderRoutes.tsx):
```typescript
export function renderRoutes(routes: RouteDef[]) {
  return routes.map((route) => {
    // ...
    const element = route.auth?.required ? (
      <RequireAuth requiredRole={route.auth.role}>
        {route.element}
      </RequireAuth>
    ) : (
      route.element
    );
    return <Route key={route.id} path={route.path} element={element} />;
  });
}
```

[src/auth/RequireAuth.tsx](../src/auth/RequireAuth.tsx):
```typescript
export function RequireAuth({ 
  children, 
  requiredRole 
}: { 
  children: ReactElement, 
  requiredRole?: string 
}) {
  // Check session from localStorage
  // If role matches requiredRole: render children
  // Otherwise: redirect to /login?next=...
}
```

### Login Page

[src/pages/login.tsx](../src/pages/login.tsx):
- Displays role selector buttons
- On click: sets localStorage session and redirects
- Respects `?next=` parameter for post-login redirect

---

## Gated Routes (Current)

| Path | Role Required | Purpose |
|------|---------------|---------|
| `/family-portal` | `family` | Family case management portal (placeholder) |
| `/provider-portal` | `provider` | Provider dashboard (placeholder) |

---

## Security Disclaimer

⚠️ **This demo authentication is NOT secure for production use:**

- **No encryption**: Session is stored in plaintext localStorage (visible in DevTools)
- **No validation**: Any user can edit localStorage and claim any role
- **No backend**: No server-side session verification
- **No HTTPS enforcement**: No requirement for HTTPS
- **No security audits**: This code has not undergone security review
- **Demo only**: Intended for UI/UX testing and development only

**For production**, replace with:
- Secure OAuth provider (Google, GitHub, etc.)
- Backend session management (JWT tokens, server-side validation)
- HTTPS only
- Security review and compliance audit
- Real user identity verification

---

## For Developers

### Testing Auth Locally

1. Start dev server: `npm run dev`
2. Visit `http://localhost:5173/login`
3. Select a demo role → localStorage is updated
4. Navigate to gated routes (e.g., `/family-portal`) → should be accessible with matching role
5. Open DevTools → Application → Local Storage → see `auth_session` entry
6. To logout: Delete localStorage entry or visit login and select different role

### Replacing with Real Auth

Future auth integration (e.g., Supabase):
1. Update [src/auth/auth.ts](../src/auth/auth.ts) to fetch real session from backend
2. Modify [src/auth/RequireAuth.tsx](../src/auth/RequireAuth.tsx) to check backend user data
3. Update [src/pages/login.tsx](../src/pages/login.tsx) to call auth provider
4. Deploy with HTTPS + backend

---

## See Also

- [STATUS.md](./STATUS.md) — Platform capabilities and boundaries
- [ROUTES.md](./ROUTES.md) — Route list with gating rules
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Routing strategy and auth pattern

