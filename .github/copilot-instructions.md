Code Style and Structure:

- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Structure files: exported component, subcomponents, helpers, static content, types
- Create components used in the page in the ./\_components directory at the same level as the initialized page.js

Naming Conventions:

- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Favor named exports for components

TypeScript Usage:

- Use TypeScript for all code; prefer interfaces over types
- Avoid enums; use maps instead
- Use functional components with TypeScript interfaces
- Use React.FC for functional components
- Use next.config.ts for Next.js configuration

Syntax and Formatting:

- Use the "function" keyword for pure functions
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements
- Use declarative JSX

Error Handling and Validation:

- Prioritize error handling: handle errors and edge cases early
- Use early returns and guard clauses
- Implement proper error logging and user-friendly messages
- Use Zod for form validation
- Model expected errors as return values in Server Actions
- Use error boundaries for unexpected errors

UI and Styling:

- Use Shadcn UI, Radix, and Tailwind Aria for components and styling
- Implement responsive design with Tailwind CSS; use a mobile-first approach

Performance Optimization:

- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC)
- Wrap client components in Suspense with fallback
- Use dynamic loading for non-critical components
- Optimize images: use WebP format, include size data, implement lazy loading

Key Conventions:

- Use 'nuqs' for URL search parameter state management
- Optimize Web Vitals (LCP, CLS, FID)
- Limit 'use client':
  - Favor server components and Next.js SSR
  - Use only for Web API access in small components
  - Avoid for data fetching or state management

Follow Next.js docs for Data Fetching, Rendering, and App Router

- Use Next.js App Router
- Use Next.js Server Actions
- Use Next.js Image Component
- Use Next.js Metadata
- Use Next.js Link Component
- Use Next.js Head Component
- Use Next.js Layouts
- Use Next.js Error Pages
- Use Next.js Loading UI

Follow Tech Stack:

- Next.js
- Use TypeScript for all code
- Use Tailwind CSS for styling
- Use Shadcn UI for all components
- Use Zod for validation
- Use React Hook Form for forms
- Use @tanstack/react-query for data fetching and caching
- Use @tanstack/react-table for tables

## Project Structure Guidelines

### Directory Purposes

- **\_components/** - Components that are only used within a specific page
- **components/** - Components shared across the entire project
  - **ui/** - Reusable UI components built with Shadcn
- **hooks/** - Custom React hooks
- **lib/** - Utility libraries and modules
  - **configs/** - Configuration files
  - **constants/** - Application constants and static values
  - **models/** - Data models and schemas
  - **query/** - Query-related files (React Query configuration)
  - **types/** - TypeScript type definitions
  - **utils/** - Helper functions and utilities

### Component Organization

Components should be organized based on their scope:

- Place page-specific components in `_components` directory at the page level
- Place shared/global components in the root `components` directory
- Follow the directory structure outlined in the project structure above

Structure rules:
└──📁components // Component shared
└── 📁ui // UI using for project (Shadcn)
└── hooks // Custom hooks
└── 📁lib
└── 📁configs
└── 📁constants
└── 📁models
└── 📁query
└── client-instance.ts // QueryClient instance
└── getSession.ts // Get session
└── providers.tsx // QueryClientProvider
└── query-client.ts // QueryClient
└── server-instance.ts // Server instance
└── 📁types
└── 📁utils
📁app
└── 📁(dashboard)
└── 📁(money-tracking)
└── 📁categories
└── 📁transactions
└── 📁_components
└── page.tsx
└── 📁(tools)
└── 📁_components
└── editor-pannel.tsx
└── monaco.tsx
└── 📁json-formatter
└── page.tsx
└── 📁json-to-typescript
└── 📁_components
└── conversion-panel.tsx
└── page.tsx
└── layout.tsx
└── 📁dashboard
└── page.tsx
└── layout.tsx
└── loading.tsx
└── 📁api
└── 📁auth
└── 📁[...nextauth]
└── route.ts
└── 📁login
└── 📁_components
└── login-form.tsx
└── 📁models
└── login-response.ts
└── page.tsx
