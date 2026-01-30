# Resource Directory

**Status**: Link-based directory; database integration planned  
**Last Updated**: January 30, 2026

---

## Overview

The resource directory is a searchable, categorized collection of family support resources. It provides a public interface for families and providers to discover verified, vetted resources in the community.

**Current Architecture**: Static link-based dataset  
**Future Architecture**: Database-backed searchable registry (Supabase scaffolding in place)

---

## Data Model

### Data Source: resources.seed.ts

[src/data/resources.seed.ts](../src/data/resources.seed.ts) defines the canonical resource dataset as TypeScript objects.

Example structure:
```typescript
export const resourceSeed = [
  {
    id: 'resource-001',
    name: 'Community Food Bank',
    category: 'Food Assistance',
    description: 'Free food distribution to families in need',
    verificationStatus: 'verified', // 'verified' | 'pending' | 'unverified'
    link: 'https://example.com/foodbank',
    phone: '(555) 123-4567',
    // ... more fields
  },
  // ...
];
```

### Build Process

Run `npm run build:resources` to compile seed data to JSON:

```bash
npm run build:resources
```

This generates [src/data/resource-links.json](../src/data/resource-links.json) and updates [src/data/resourceLinks.ts](../src/data/resourceLinks.ts).

**Why?** Separates data (seed) from compiled output (JSON), making it easier to maintain and version resources.

---

## UI Components

### Resource Card

[src/components/resources/ResourceCard.tsx](../src/components/resources/ResourceCard.tsx)

Displays a single resource in the directory listing:
- **Name**: Resource organization/service name
- **Category**: Service category (e.g., "Food Assistance", "Housing Support")
- **Description**: Short description of service
- **Verification Badge**: Visual status indicator (see below)
- **Link**: Button to resource detail page or external link

```tsx
<ResourceCard resource={resource} />
```

### Resource Detail Page

[src/pages/resource-detail.tsx](../src/pages/resource-detail.tsx)

Displays full details for a single resource:
- **URL**: `/resources/directory/:slug`
- **Data**: Fetches resource by slug from directory
- **Sections**: Name, category, full description, contact info, verification status, feedback section
- **Feedback**: OutcomeButtons + AdminNoteForm (see below)

**Route Definition**:
```typescript
{
  id: 'resources-directory-detail',
  path: '/resources/directory/:slug',
  element: <ResourceDetail />,
  title: 'Resource Details',
  // ...
}
```

### Verification Badge

[src/components/resources/VerificationBadge.tsx](../src/components/resources/VerificationBadge.tsx)

Visual indicator of resource verification status:

| Status | Display | Meaning |
|--------|---------|---------|
| `verified` | Green badge | Vetted and confirmed by The Father's Alliance |
| `pending` | Yellow badge | Under review; verification in progress |
| `unverified` | Gray badge | Not yet verified; user beware |

```tsx
<VerificationBadge status={resource.verificationStatus} />
```

### Feedback Components

#### OutcomeButtons

[src/components/resources/OutcomeButtons.tsx](../src/components/resources/OutcomeButtons.tsx)

Buttons for users to report outcomes after using a resource:
- **Helpful**: Resource was useful
- **Not Helpful**: Resource did not meet needs
- **Reported Issue**: Problem with resource (data out of date, wrong service, etc.)

**Current State**: UI buttons present; state management and persistence TBD

```tsx
<OutcomeButtons resourceId={resource.id} />
```

#### AdminNoteForm

[src/components/resources/AdminNoteForm.tsx](../src/components/resources/AdminNoteForm.tsx)

Form for admins to add internal notes or updates about a resource:
- **Note text**: Admin comment about resource status, recent changes, etc.
- **Submit**: Persist note (backend integration TBD)

**Current State**: UI form present; backend persistence not implemented

```tsx
<AdminNoteForm resourceId={resource.id} />
```

---

## Directory Pages

### Resource Directory Listing

**Path**: `/resources/directory`  
**Component**: [src/pages/resources-directory.tsx](../src/pages/resources-directory.tsx)

Displays searchable, filterable list of all resources:
- **Search box**: Filter by name, description
- **Category filter**: Select one or more categories
- **Verification filter**: Show only verified, pending, or all
- **Results**: Cards arranged in grid
- **Click to detail**: Each card links to `/resources/directory/:slug`

### Resource Detail Page

**Path**: `/resources/directory/:slug`  
**Component**: [src/pages/resource-detail.tsx](../src/pages/resource-detail.tsx)

Full details for a single resource:
- **Title**: Resource name
- **Category**: Type of service
- **Description**: Full description
- **Contact**: Phone, email, website
- **Verification**: Status + last verified date
- **Feedback**: OutcomeButtons + AdminNoteForm
- **Related**: Links to similar resources (future)

---

## Data Flow

```
resources.seed.ts (canonical data)
        ↓
npm run build:resources
        ↓
resource-links.json (compiled export)
resourceLinks.ts (TypeScript index)
        ↓
resources-directory.tsx (fetch list)
        ↓
ResourceCard (render item)
        ↓
Click card → resource-detail.tsx (fetch by slug)
        ↓
VerificationBadge (show status)
OutcomeButtons (collect feedback)
AdminNoteForm (admin notes)
```

---

## Adding a New Resource

### 1. Update Seed Data

Edit [src/data/resources.seed.ts](../src/data/resources.seed.ts):

```typescript
export const resourceSeed = [
  // ... existing resources
  {
    id: 'resource-new',
    name: 'New Resource Name',
    category: 'Category Name',
    description: 'Description of the service',
    verificationStatus: 'unverified', // or 'verified', 'pending'
    link: 'https://example.com',
    phone: '(555) 000-0000',
    // add any additional fields as needed
  },
];
```

### 2. Compile to JSON

```bash
npm run build:resources
```

This updates resource-links.json and resourceLinks.ts automatically.

### 3. Verify

Visit `/resources/directory` and search for new resource by name.

---

## Verification Status

| Status | Meaning | When to Use |
|--------|---------|------------|
| `verified` | Resource has been vetted by The Father's Alliance | When resource has been contacted, service confirmed, and data validated |
| `pending` | Resource is under review | When resource has been identified but not yet verified |
| `unverified` | Resource has not been vetted | User-submitted or aggregated resources not yet reviewed |

**Note**: Verification status is informational only and does not guarantee service availability or quality. Always verify current contact info and services before referring.

---

## Future Enhancements

### Database Integration
- Replace static seed with live database (Supabase)
- Add CRUD endpoints for resource management
- Enable real-time updates without rebuild/deploy

### Feedback Persistence
- Connect OutcomeButtons to backend
- Store feedback for analytics and quality improvement
- Admin dashboard to review feedback

### Admin Portal
- Interface to add/edit/verify resources
- Dashboard to review pending resources
- View feedback summary

### Search & Filters
- Full-text search across all fields
- Advanced filters (distance, hours, demographics served)
- Saved searches and favorites

### Integration
- Google Maps embed for location/directions
- Calendar integration for hours of operation
- API for third-party integrations

---

## Code References

| File | Purpose |
|------|---------|
| [src/data/resources.seed.ts](../src/data/resources.seed.ts) | Canonical resource data (TypeScript) |
| [src/data/resource-links.json](../src/data/resource-links.json) | Compiled resource data (JSON export) |
| [src/data/resourceLinks.ts](../src/data/resourceLinks.ts) | TypeScript index for compiled data |
| [src/pages/resources-directory.tsx](../src/pages/resources-directory.tsx) | Directory listing page |
| [src/pages/resource-detail.tsx](../src/pages/resource-detail.tsx) | Detail page for single resource |
| [src/components/resources/ResourceCard.tsx](../src/components/resources/ResourceCard.tsx) | Card component for listing |
| [src/components/resources/VerificationBadge.tsx](../src/components/resources/VerificationBadge.tsx) | Verification status badge |
| [src/components/resources/OutcomeButtons.tsx](../src/components/resources/OutcomeButtons.tsx) | User feedback buttons |
| [src/components/resources/AdminNoteForm.tsx](../src/components/resources/AdminNoteForm.tsx) | Admin notes form |

---

## See Also

- [ROUTES.md](./ROUTES.md) — Routes for resource pages
- [STATUS.md](./STATUS.md) — Platform capabilities and roadmap
- [ARCHITECTURE.md](./ARCHITECTURE.md) — App structure and data model

