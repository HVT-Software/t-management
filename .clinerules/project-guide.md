# AI Understanding Guide

## Project Overview

This project is a web application built with Next.js and TypeScript. It provides a platform for managing personal finances, including tracking income and expenses, categorizing transactions, and configuring application settings. It also includes various tools for developers.

## Tech Stack

- Frontend Framework: Next.js 14.x
- Language: TypeScript 5.x
- State Management: @tanstack/react-query v5 (Server State), nuqs (URL State), react-hook-form (Form State)
- UI Components: Shadcn UI (Base components), Radix UI (Accessibility), TailwindCSS (Styling)
- Data Display: @tanstack/react-table
- Validation: Class Validator
- Form Handling: react-hook-form
- Routing: Next.js App Router with Parallel Routes

## Key Features

- Money Tracking: Allows users to track their income and expenses.
- Transaction Management: Enables users to create, read, update, and delete transactions.
- Category Management: Enables users to categorize their transactions.
- Settings Management: Allows users to configure application settings.
- Tools: Provides access to various tools.

## Code Conventions

- TypeScript for all code.
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

## Code Conversion Examples

- Formatting numbers as currency in Vietnamese format using `toCurrency` in `src/utils/format.ts`:

  ```typescript
  import { toCurrency } from "@/utils/format";

  const amount = 1000000;
  const formattedAmount = toCurrency(amount); // Output: 1.000.000 ₫
  ```

- Formatting dates to Vietnamese locale string using `formatDate` in `src/utils/format.ts`:

  ```typescript
  import { formatDate } from "@/utils/format";

  const date = new Date();
  const formattedDate = formatDate(date); // Output: [Current Date in Vietnamese format]
  ```

- Serializing values to JSON strings using `JSON.stringify` in `src/lib/parsers.ts`:

  ```typescript
  import { serialize } from "@/lib/parsers";

  const data = { name: "John", age: 30 };
  const serializedData = JSON.stringify(data); // Output: {"name":"John","age":30}
  ```

- Converting JSON to TypeScript using the tool in `src/app/(dashboard)/(tools)/json-to-typescript/page.tsx`:

  This feature provides a user interface for converting JSON data to TypeScript interfaces. Users can input JSON data and the tool will generate the corresponding TypeScript interface.

- Transforming CSS values using `CSS.Translate.toString(transform)` in `src/components/ui/sortable.tsx`:

  ```typescript
  import * as CSS from "csstype";

  const transform = { x: 10, y: 20 };
  const cssTransform = CSS.Translate.toString(transform); // Output: translate(10px, 20px)
  ```
