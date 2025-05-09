## Brief overview

This Cline rule file outlines the coding conventions, naming conventions, folder structure, code styles, tech stack, and tools used in the current project.

## Code Conventions

- Use TypeScript for all code.
- Strong typing with no 'any'.
- Interfaces over types for object definitions.
- Const assertions for literals.
- Discriminated unions for complex states.
- Functional components only.
- Props interface for every component.
- Early returns for conditional rendering.
- Error boundaries for error handling.

## Naming Conventions

- Files/Directories: kebab-case
- Components: PascalCase
- Functions/Variables: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase

## Folder Structure

- Follow the defined directory organization:
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
- Co-locate related files.
- Keep components close to where they're used.
- Shared code goes up the tree.

## Code Styles

- ESLint for code quality.
- Prettier for formatting.
- TypeScript strict mode.
- Husky pre-commit hooks.
- Maximum file size: 300 lines.
- Maximum function size: 50 lines.

## Tech Stack

- Frontend Framework: Next.js 14.x
- Language: TypeScript 5.x
- State Management:
  - Server State: @tanstack/react-query v5
  - URL State: nuqs
  - Form State: react-hook-form
- UI Components:
  - Shadcn UI (Base components)
  - Radix UI (Accessibility)
  - TailwindCSS (Styling)
- Data Display: @tanstack/react-table
- Validation: Zod
- Routing: Next.js App Router with Parallel Routes

## Tools

- Node.js ≥ 18.17
- pnpm (for package management)
- VS Code with recommended extensions
- Git ≥ 2.40

## AI Code Guidelines

- AI-generated code should adhere to all existing project conventions and standards.
- Review and refactor AI-generated code for clarity, efficiency, and maintainability.
- Ensure AI-generated code includes appropriate comments and documentation.
- Verify AI-generated code against project requirements and test cases.
