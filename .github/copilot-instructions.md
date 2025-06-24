# Copilot Instructions for React Application Development

## Overview

This document provides guidelines for using Copilot to assist in the development of a React application. The focus is on creating a user-friendly interface with a consistent design system, leveraging shadcn components.

## Project Structure

- **src/**: Contains the main application code.
  - **components/**: Reusable UI components.
    - **ui/**: UI components built with shadcn for consistency.
  - **contexts/**: Context providers for state management.
  - **features/**: Feature-specific components and logic.
    - **landlord/**: Components and logic specific to landlord features.
    - **tenant/**: Components and logic specific to tenant features.
  - **hooks/**: Custom React hooks.
  - **lib/**: Utility functions and libraries.
  - **store/**: State management (Zustand).
  - **types/**: TypeScript types and interfaces.

## Development Guidelines

- **Use TypeScript**: Ensure all components and hooks are written in TypeScript for type safety.
- **Follow shadcn Design System**: Adhere to the design principles and components provided by shadcn to ensure a consistent user experience.
- **State Management**: Use Zustand for state management across the application. Create stores in the `store/` directory.
- **Respect eslint and Prettier**: Maintain code quality and consistency by following ESLint rules and using Prettier for formatting.
