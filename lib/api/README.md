# API Setup Documentation

This directory contains the complete API integration setup for BrandLocus.

## Structure

```
lib/api/
├── apiClient.ts          # Axios instance with interceptors
├── auth.ts               # Authentication utilities (token storage)
├── types.ts              # TypeScript types and interfaces
├── queryClient.ts        # TanStack Query client configuration
├── hooks/                # React Query hooks
│   ├── useAuth.ts       # Authentication hooks
│   └── index.ts         # Hooks exports
├── services/             # API service functions
│   └── authService.ts   # Authentication service
└── index.ts             # Main exports
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://brandlocus.foodflow.africa/api/v1
NEXT_PUBLIC_ENV=development
```

## Usage Examples

### Using React Query Hooks (Recommended)

```tsx
import { useLogin, useCurrentUser } from "@/lib/api";

function LoginComponent() {
  const login = useLogin();
  const { data: user, isLoading } = useCurrentUser();

  const handleLogin = async () => {
    try {
      await login.mutateAsync({
        email: "user@example.com",
        password: "password123",
      });
      // Success - token is automatically stored
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {user && <p>Welcome, {user.email}!</p>}
      <button onClick={handleLogin} disabled={login.isPending}>
        {login.isPending ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
```

### Using API Client Directly

```tsx
import { api } from "@/lib/api";

async function fetchData() {
  try {
    const data = await api.get("/endpoint");
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
```

### Using Services Directly

```tsx
import { authService } from "@/lib/api";

async function loginUser() {
  try {
    const response = await authService.login({
      email: "user@example.com",
      password: "password123",
    });
    // Token is automatically stored
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
```

## Features

### ✅ Automatic Token Management
- Tokens are automatically added to request headers
- Tokens are stored securely in localStorage
- Automatic token refresh (when implemented)

### ✅ Error Handling
- Global error interceptor
- Automatic 401 handling (clears auth and redirects)
- Validation error handling (422)
- Network error handling

### ✅ React Query Integration
- Automatic caching
- Background refetching
- Optimistic updates
- Loading and error states

### ✅ Type Safety
- Full TypeScript support
- Typed API responses
- Typed request payloads

## Available Hooks

- `useLogin()` - Login mutation
- `useRegister()` - Registration mutation
- `useLogout()` - Logout mutation
- `useCurrentUser()` - Get current user query
- `useForgotPassword()` - Forgot password mutation
- `useResetPassword()` - Reset password mutation
- `useChangePassword()` - Change password mutation
- `useRefreshToken()` - Refresh token mutation

## Adding New API Endpoints

1. Add types to `types.ts`
2. Add service function to `services/yourService.ts`
3. Create hooks in `hooks/useYourService.ts`
4. Export from `index.ts`

Example:

```tsx
// services/blogService.ts
import { api } from "../apiClient";

export const blogService = {
  getPosts: () => api.get("/blog/posts"),
  getPost: (id: string) => api.get(`/blog/posts/${id}`),
};

// hooks/useBlog.ts
import { useQuery } from "@tanstack/react-query";
import { blogService } from "../services/blogService";

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blog", "posts"],
    queryFn: () => blogService.getPosts(),
  });
};
```

