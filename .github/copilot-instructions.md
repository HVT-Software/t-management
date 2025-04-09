# T-Management Project Guidelines

## 1. Technical Stack

### Core Technologies (2024 Q2)

- **Frontend Framework**: Next.js 14.x
- **Language**: TypeScript 5.x
- **State Management**:
  - Server State: @tanstack/react-query v5
  - URL State: nuqs
  - Form State: react-hook-form
- **UI Components**:
  - Shadcn UI (Base components)
  - Radix UI (Accessibility)
  - TailwindCSS (Styling)
- **Data Display**: @tanstack/react-table
- **Validation**: Zod
- **Routing**: Next.js App Router with Parallel Routes

### Required Development Tools

- Node.js ≥ 18.17
- pnpm (for package management)
- VS Code with recommended extensions
- Git ≥ 2.40

## 2. Architecture & Design Principles

### Frontend Architecture

- Server-First Approach
  - Prefer React Server Components (RSC)
  - Minimize client-side JavaScript
  - Use Server Actions for data mutations
- Component Architecture
  - Atomic Design Principles
  - Clear separation of concerns
  - Composition over inheritance

### State Management Strategy

- Server State: React Query for all API data
- URL State: Use URL parameters for shareable state
- Form State: React Hook Form + Zod validation
- Local State: React useState (minimal usage)

### Performance Requirements

- Core Web Vitals targets:
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1
- Bundle size limits:
  - Initial JS < 150KB (compressed)
  - Initial CSS < 50KB (compressed)

## 3. Code Standards

### TypeScript Best Practices

- Strong typing with no 'any'
- Interfaces over types for object definitions
- Const assertions for literals
- Discriminated unions for complex states
- Example:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

type RequestState<T> = { status: "idle" } | { status: "loading" } | { status: "success"; data: T } | { status: "error"; error: Error };
```

### Component Standards

- Functional components only
- Props interface for every component
- Early returns for conditional rendering
- Error boundaries for error handling
- Example:

```typescript
interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const { data, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  });

  if (error) return <ErrorComponent error={error} />;
  if (!data) return <LoadingSpinner />;

  return <ProfileContent user={data} />;
}
```

### Naming Conventions

- Files/Directories: kebab-case
- Components: PascalCase
- Functions/Variables: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase

## 4. Project Structure

### Directory Organization

```plaintext
├── app/
│   ├── api/            # API routes
│   ├── (dashboard)/    # Dashboard routes group
│   └── _components/    # Page-specific components
├── components/
│   ├── ui/            # Shadcn components
│   └── shared/        # Shared components
├── lib/
│   ├── utils/         # Utility functions
│   ├── config/        # Configuration
│   └── types/         # TypeScript types
├── hooks/             # Custom React hooks
└── public/            # Static assets
```

### File Organization Rules

1. Co-locate related files
2. Keep components close to where they're used
3. Shared code goes up the tree
4. Maximum file size: 300 lines
5. Maximum function size: 50 lines

## 5. Development Workflow

### Git Workflow

- Branch naming: `type/description`
  - Types: feature, fix, refactor, docs
- Commit messages: Conventional Commits
- PR size limit: 400 lines of code

### Testing Requirements

- Unit tests for utils and hooks
- Integration tests for complex flows
- E2E tests for critical paths
- Testing coverage: minimum 80%

### Documentation

- JSDoc for public APIs
- README for each directory
- Storybook for UI components
- API documentation with OpenAPI

### Quality Checks

- ESLint for code quality
- Prettier for formatting
- TypeScript strict mode
- Husky pre-commit hooks

## 6. Performance & Security

### Performance Guidelines

- Use Image component for all images
- Dynamic imports for large components
- Route segments for code splitting
- Proper key usage in lists

### Security Practices

- Input validation with Zod
- CSRF protection
- Content Security Policy
- Regular dependency updates

## 7. Monitoring & Error Handling

### Error Handling Strategy

- Use error boundaries
- Structured error responses
- Proper error logging
- User-friendly error messages

### Monitoring Requirements

- Performance monitoring
- Error tracking
- Usage analytics
- User session recording
