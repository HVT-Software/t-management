Next.js 14 Project Guidelines

### **Code Style and Structure**

- Write clean, concise **TypeScript** code using functional programming (avoid classes).
- Avoid code duplication by favoring **iteration** and **modularization**.
- Use descriptive variable names like `isLoading` or `hasError` for clarity.
- Organize files logically:
  - Main exported component
  - Subcomponents
  - Helper functions
  - Static content
  - Type definitions
- Store page-specific components in a `./_components` folder at the page level.

---

### **Naming Conventions**

- Use **lowercase with dashes** for directory names (e.g., `components/auth-wizard`).
- Prefer **named exports** for components (e.g., `export { MyComponent }`).

---

### **Project Structure**

- **`_components/`**: Components specific to a page.
- **`app/api/`**: API routes for Next.js.
- **`components/`**: Reusable shared components.
  - Includes a `ui/` subfolder for **Shadcn UI** components.
- **`hooks/`**: Custom React hooks.
- **`lib/`**: Utility files, including:
  - Configuration files
  - Constants
  - Models
  - Query utilities
  - Type definitions
  - General utilities

---

### **UI and Styling**

- Use **Shadcn UI**, **Radix**, and **Tailwind Aria** for UI components.
- Style with **Tailwind CSS**, following a **mobile-first** approach for responsive design.

---

### **Performance Optimization**

- Minimize client-side code (e.g., `use client`, `useEffect`, `setState`); prioritize **React Server Components**.
- Wrap client components in **Suspense** with fallback UIs.
- Dynamically load non-critical components to improve load times.
- Optimize images using the **Next.js Image** component with **WebP** format and **lazy loading**.

---

### **Key Conventions**

- Manage URL state with **`nuqs`** (Next.js URL Query State).
- Focus on optimizing **Web Vitals** (e.g., LCP, CLS, FID).
- Limit client-side code to **Web API access**; avoid using it for data fetching or state management.

---

### **Next.js Features**

- Leverage these Next.js features:
  - **App Router**
  - **Server Actions**
  - **Image Component**
  - **Metadata**
  - **Link Component**
  - **Head Management**
  - **Layouts**
  - **Error Pages**
  - **Loading UI**

---

### **Tech Stack**

- Core technologies:
  - **Next.js**
  - **TypeScript**
  - **Tailwind CSS**
  - **Shadcn UI**
- Additional tools:
  - **Webpack**
  - **Web Workers**
  - **Monaco Editor**
  - **Prettier** (code formatting)
  - **Zod** (schema validation)
  - **React Hook Form**
  - **React Query** / **Tanstack Query**
  - **Tanstack Table**
  - **Parallel Router** (for popup functionality)

---

### **Additional Tools**

- **ESLint** (linting)
- **Husky** (git hooks)
- **Commitlint** (commit message linting)

This summary covers the essentials of the guidelines. If you need more details on any specific section or help applying these to a project, just let me know—I’m here to assist!
