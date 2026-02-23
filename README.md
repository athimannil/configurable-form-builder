# Configurable Form Builder

An interactive React component that allows users to construct forms, configure fields, manage nested groups, preview the final form live, and export/import configurations as JSON.

## Features

- **Three Field Types**: `text`, `number`, and `group` (recursive nesting)
- **Field Configuration**: Label, required toggle, min/max for numbers
- **Live Preview**: Real-time form rendering with validation, auto-syncs when fields change
- **Reorder Fields**: Move up/down within the same group level
- **Export/Import**: JSON configuration with deep structural validation
- **Accessible**: ARIA labels, live regions for validation errors, keyboard navigable
- **No External Dependencies**: No state management or form libraries

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- Vitest + React Testing Library (testing)
- Context API + `useReducer` (state management)
- Custom CSS with BEM methodology (no UI frameworks)

## Architecture

```
src/
├── components/
│   ├── FieldCard/       # Individual field editor card (memo)
│   ├── FieldList/       # Recursive list of field cards (memo, depth-limited)
│   ├── FormBuilder/     # Root layout component
│   ├── Header/          # App header with field count
│   ├── JsonPanel/       # Export/Import JSON panel with validation
│   ├── PreviewField/    # Single field in preview mode (memo)
│   └── PreviewPanel/    # Live form preview panel (memo)
├── context/
│   └── FormBuilderContext.tsx  # Global state via useReducer
├── hooks/
│   └── useFormPreview.ts      # Form preview logic with stale value cleanup
├── types/
│   └── fields.ts              # Discriminated union type definitions
└── utils/
    ├── fieldFactory.ts        # Field creation factory (exhaustive switch)
    ├── fieldOperations.ts     # CRUD + move + assignNewIds (recursive)
    ├── idGenerator.ts         # UUID generation
    ├── validateConfig.ts      # Deep import validation with depth guard
    └── validateFields.ts      # Form submission validation
```

### Design Decisions

| Decision                     | Rationale                                                    |
| ---------------------------- | ------------------------------------------------------------ |
| `useReducer` + Context       | Centralised, predictable state for complex nested operations |
| Recursive field operations   | Natural fit for arbitrarily nested group structures          |
| `React.memo` + `useCallback` | Prevent unnecessary re-renders in deeply nested field trees  |
| BEM CSS                      | Predictable, scoped styling without CSS-in-JS overhead       |
| Deep import validation       | Prevent runtime errors from malformed JSON configurations    |
| Discriminated unions         | Type-safe field handling with exhaustive checks              |
| `aria-live` regions          | Screen readers announce validation errors dynamically        |

### Data Flow

```
User Action → dispatch(action) → formBuilderReducer → new state → re-render
                                                                    ↓
                                              PreviewPanel ← useFormPreview(fields)
```

## Getting Started

```bash
npm install
npm run dev
```

## Testing

```bash
npm test              # Run all tests
npm run test:coverage # Run with coverage report
```

## Scripts

| Script                  | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start development server |
| `npm run build`         | Production build         |
| `npm run preview`       | Preview production build |
| `npm test`              | Run tests in watch mode  |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint`          | Run ESLint               |
