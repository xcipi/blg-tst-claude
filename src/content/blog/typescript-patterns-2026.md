---
title: 'TypeScript Patterns pre rok 2026'
excerpt: 'Osvedčené TypeScript patterny, ktoré používam v každodennej práci. Discriminated unions, branded types a ďalšie.'
date: '2026-01-15'
readTime: '6 min'
tags: ['typescript', 'frontend', 'patterns']
---

## Discriminated Unions

Jeden z najužitočnejších patternov pre type-safe state management.

```typescript
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string };

function renderUsers(state: LoadingState) {
  switch (state.status) {
    case 'idle':
      return 'Click to load';
    case 'loading':
      return 'Loading...';
    case 'success':
      return state.data.map(u => u.name); // TypeScript vie že máš data
    case 'error':
      return `Error: ${state.error}`;
  }
}
```

## Branded Types

Pre silnejšiu type safety pri primitívnych typoch.

```typescript
type UserId = string & { readonly __brand: 'UserId' };
type Email = string & { readonly __brand: 'Email' };

function getUserById(id: UserId) { /* ... */ }
function sendEmail(email: Email) { /* ... */ }

const id = 'abc123' as UserId;
const email = 'user@example.com' as Email;

getUserById(id); // OK
getUserById(email); // Error!
```

## Const Assertions

Pre readonly objekty a presné typy.

```typescript
const config = {
  api: 'https://api.example.com',
  timeout: 5000,
  retries: 3
} as const;

// config.api = 'new'; // Error! readonly
type Config = typeof config; // presné typy, nie string
```

## Template Literal Types

Pre type-safe string manipuláciu.

```typescript
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = `/api/${string}`;
type Route = `${HTTPMethod} ${Endpoint}`;

const route: Route = 'GET /api/users'; // OK
const invalid: Route = 'PATCH /users'; // Error!
```

## Utility Types

Kombinácia utility typov pre DRY kód.

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, 'password'>;
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>;
type UserCreate = Omit<User, 'id'>;
```
