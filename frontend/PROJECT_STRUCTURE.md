# Frontend Project Structure

## 📁 Directory Organization

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Route group for marketing pages
│   │   ├── page.tsx            # Homepage
│   │   ├── life-school/        # Life School page
│   │   ├── beichen-life/       # AI Tools page
│   │   └── past-activities/    # Past Activities page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
│
├── components/                  # React components
│   ├── ui/                     # Base UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── sections/               # Page section components
│   │   ├── Hero.tsx
│   │   ├── ActivitiesSection.tsx
│   │   └── ...
│   ├── layout/                 # Layout components
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── features/               # Feature-specific components
│       ├── ActivityCard.tsx
│       └── ...
│
├── lib/                        # Utility functions and configs
│   ├── strapi.ts              # Strapi API client
│   ├── utils.ts               # General utilities
│   └── constants.ts           # Application constants
│
├── types/                      # TypeScript type definitions
│   └── index.ts               # Shared types
│
└── styles/                     # Additional styles
    └── ...
```

## 🎯 Design Principles

### 1. Modularity
- Each component is self-contained and reusable
- Clear separation of concerns (UI, business logic, data fetching)
- Components can be tested in isolation

### 2. Extensibility
- Easy to add new pages and features
- Strapi integration allows content management without code changes
- Type-safe API layer for future extensions

### 3. Readability
- Clear naming conventions (PascalCase for components, camelCase for functions)
- Comprehensive TypeScript types
- JSDoc comments for complex functions

### 4. Maintainability
- Consistent file structure across the project
- Shared utilities prevent code duplication
- Constants centralized for easy configuration

## 📝 Naming Conventions

### Files
- **Components**: `PascalCase.tsx` (e.g., `ActivityCard.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `utils.ts`)
- **Types**: `index.ts` or `camelCase.ts`

### Components
- **Page Components**: `[Name]Page` (e.g., `HomePage`)
- **Section Components**: `[Name]Section` (e.g., `HeroSection`)
- **Feature Components**: Descriptive names (e.g., `ActivityCard`)

### Functions
- **Utilities**: `camelCase` (e.g., `formatDate`)
- **API functions**: `camelCase` with verb prefix (e.g., `fetchActivities`)
- **Event handlers**: `handle[Event]` (e.g., `handleSubmit`)

## 🔧 Path Aliases

Use the `@/` alias to import from `src/`:

```typescript
// ✅ Good
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

// ❌ Avoid
import { Button } from '../../../components/ui/button';
```

## 🧪 Testing Strategy

- **Unit Tests**: Test individual components and utilities
- **Integration Tests**: Test component interactions and API calls
- **E2E Tests**: Test complete user flows

## 📦 Key Dependencies

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React features
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first styling
- **lucide-react**: Icon library
- **clsx + tailwind-merge**: Conditional class utilities

## 🔗 Related Documentation

- [Design Guidelines](../../README.md)
- [Strapi API Documentation](../../cms/README.md)
- [Deployment Guide](../../README.md#deployment)
