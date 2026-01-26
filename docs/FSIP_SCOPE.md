# FSIP Architecture & Scope

## Overview

The **Family Stabilization & Intervention Program (FSIP)** is a core program of The Father's Alliance, providing coordinated support across four integrated domains: resource navigation, crisis intervention, family relationship repair, and provider collaboration.

---

## Architecture Layers

### 1. Public Resource Hub
**Purpose**: Central directory of vetted family support resources  
**Key Features**:
- Searchable, categorized resource database
- Verification badges (Verified / Stale / Unverified)
- Coverage indicators (National / State / Local)
- Direct links to partner organizations
- Family-facing and provider-accessible

**Data Source**: Static TypeScript dataset (`src/data/resourceLinks.ts`)

---

### 2. Crisis Navigation Layer
**Purpose**: Emergency triage and pathway guidance for families in acute crisis  
**Key Features**:
- 24/7 crisis hotline integration
- Rapid assessment framework
- Immediate resource matching
- De-escalation pathways
- Safety planning template

**User**: Families and case workers in emergency situations

---

### 3. Family Repair Pathways
**Purpose**: Structured, evidence-based intervention timeline for family relationship rebuilding  
**Key Features**:
- Phase-based program structure (Crisis Stabilization → Intensive Support → Integration → Maintenance)
- Milestone tracking and outcomes measurement
- Evidence of impact with key metrics
- Customizable family repair goals

**Duration**: 6-18 months depending on family needs

---

### 4. Provider Network & Portal Architecture
**Purpose**: Coordinate care across service providers and track family progress  

#### Provider Network
- Vetted partner organizations across legal, mental health, housing, employment
- Directory of provider capabilities
- Referral coordination mechanisms
- Data-sharing agreements for HIPAA compliance

#### Provider Portal
- Secure portal for registered providers
- Case management dashboard
- Family progress tracking
- Real-time resource referral integration
- Impact reporting

#### Family Portal
- Secure access to family's case information
- Progress tracking and milestone visualization
- Direct messaging with case managers
- Resource recommendations
- Self-service family tools

---

## Scope Boundaries: What TFA Is / Is Not

### ✅ What FSIP Does Provide

- **Resource Navigation**: Curated directory of family support services
- **Crisis Triage**: Emergency assessment and stabilization pathways
- **Coordination**: Facilitating communication between service providers
- **Program Guidance**: Evidence-based intervention frameworks
- **Outcomes Tracking**: Measuring family stability and program impact
- **Referral Network**: Warm handoffs to vetted partner organizations
- **Information & Education**: Family stabilization resources and tools

### ❌ What FSIP Does NOT Provide

- **Legal Advice**: TFA staff are not attorneys; we refer to legal service providers
- **Clinical/Therapy Services**: Direct clinical services provided by licensed providers only
- **Financial Services**: Not a loan provider, financial advisor, or banking service
- **Custody/Family Law Cases**: We support families navigating legal processes but do not represent them
- **Substitute for Professional Care**: Mental health, medical, and legal services require licensed providers
- **Emergency Services**: Police, ambulance, or fire services route through 911
- **Guarantee of Outcomes**: We coordinate services but cannot guarantee family reconciliation or specific results

---

## Route Map

### FSIP Pages & Public Routes

| Route | Purpose | User | Status |
|-------|---------|------|--------|
| `/programs/fsip` | FSIP program overview (listed in Programs) | General public | Main entry point |
| `/fsip` | FSIP direct link (aliases `/programs/fsip`) | TFA staff / existing families | Direct access |
| `/fsip/resource-hub` | Resource directory & search interface | Families & providers | Public |
| `/fsip/crisis-navigation` | Crisis assessment & emergency pathways | Families in crisis, case workers | Public |
| `/fsip/family-repair` | 4-phase family repair program details & metrics | Families considering program | Public |
| `/fsip/provider-network` | Partner organization network overview | Prospective providers & partners | Public |
| `/providers` | Provider resources & partnership information | Social service providers | Public |
| `/portal` | Family portal login/access (placeholder) | Enrolled families | Secure |
| `/support-portal` | Provider portal login/access (placeholder) | Partner providers | Secure |

---

## Component Stack

### FSIP-Specific Components
- `src/pages/program-fsip.tsx` - Overview hub with 4 domain cards
- `src/pages/fsip-resource-hub.tsx` - Resource navigation & search
- `src/pages/fsip-crisis-navigation.tsx` - Emergency triage framework
- `src/pages/fsip-family-repair.tsx` - Program phases & outcomes
- `src/pages/fsip-provider-network.tsx` - Partner organizations
- `src/pages/providers.tsx` - Provider partnership details
- `src/pages/portal.tsx` - Family portal entry point
- `src/pages/support-portal.tsx` - Provider portal entry point

### Shared Components
- `src/components/Card.tsx` - Card layout for resources & sections
- `src/components/SectionSurface.tsx` - Branded section backgrounds
- `src/components/resources/ResourceCard.tsx` - Individual resource display
- `src/components/resources/VerificationBadge.tsx` - Verification status indicator

---

## Data Flow

```
src/data/resourceLinks.ts (static seed)
         ↓
src/pages/fsip-resource-hub.tsx (search & filter)
         ↓
src/components/resources/ResourceCard.tsx (individual display)
         ↓
Family or provider (visitor uses resource)
```

---

## Next Steps

1. **Portal Implementation**: `/portal` and `/support-portal` currently placeholder pages; integrate backend authentication
2. **Real-Time Updates**: Migrate resource data to dynamic source with approval workflow
3. **Analytics**: Track family journey through FSIP pages and resource selection
4. **Provider Integrations**: API for partner systems to query resource directory
5. **Mobile Optimization**: Ensure crisis navigation accessible on limited connectivity

---

**Maintained by**: The Father's Alliance Engineering Team  
**Last Updated**: January 26, 2026
