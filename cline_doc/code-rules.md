# Code Rules

Code Style and Structure:

- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Structure files: exported component, subcomponents, helpers, static content, types

Naming Conventions:

- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Favor named exports for components

TypeScript Usage:

- Use TypeScript for all code; prefer interfaces over types
- Avoid enums; use maps instead
- Use functional components with TypeScript interfaces

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

Tech Stack:

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Webpack
- Web Workers
- Monaco Editor
- Prettier
- Zod
- React Hook Form
- React Query
- Tanstack Query
- Tanstack Table

- Project struct

````structure
└── 📁app
   └── 📁(dashboard)
       └── 📁(tools) // Page tools
           └── 📁_components // Components of root page using
               └── editor-pannel.tsx
               └── monaco.tsx
           └── 📁json-formatter
               └── page.tsx
           └── 📁json-to-typescript // Page json-to-typescript
               └── 📁_components // Components only page using
                   └── conversion-panel.tsx
               └── page.tsx
           └── layout.tsx
       └── 📁dashboard // Page dashboard
           └── page.tsx
       └── layout.tsx
       └── loading.tsx
   └── 📁login // Page login
       └── page.tsx
   └── favicon.ico
   └── globals.css
   └── layout.tsx
   └── page.tsx
``` stucture
````
