# API Usage Examples

## Quick Start

### 1. Environment Setup

Make sure you have `.env.local` file with:
```env
NEXT_PUBLIC_API_BASE_URL=http://brandlocus.foodflow.africa/api/v1
```

### 2. Using Authentication Hooks

```tsx
"use client";

import { useLogin, useCurrentUser, useLogout } from "@/lib/api";

export default function AuthExample() {
  const login = useLogin();
  const { data: user, isLoading } = useCurrentUser();
  const logout = useLogout();

  const handleLogin = async () => {
    try {
      await login.mutateAsync({
        email: "user@example.com",
        password: "password123",
      });
      alert("Login successful!");
    } catch (error: any) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={() => logout.mutate()}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} disabled={login.isPending}>
          {login.isPending ? "Logging in..." : "Login"}
        </button>
      )}
    </div>
  );
}
```

### 3. Using Generic Query Hook

```tsx
"use client";

import { useApiQuery } from "@/lib/api";

export default function BlogPosts() {
  const { data: posts, isLoading, error } = useApiQuery({
    endpoint: "/blog/posts",
    queryKey: ["blog", "posts"],
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {posts?.map((post: any) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

### 4. Using Generic Mutation Hook

```tsx
"use client";

import { useApiMutation } from "@/lib/api";
import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = useApiMutation({
    endpoint: "/blog/posts",
    method: "POST",
    invalidateQueries: [["blog", "posts"]], // Refetch posts after creation
    onSuccess: () => {
      alert("Post created successfully!");
      setTitle("");
      setContent("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost.mutate({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post content"
      />
      <button type="submit" disabled={createPost.isPending}>
        {createPost.isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
```

### 5. Direct API Client Usage

```tsx
"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function DirectApiExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.get("/endpoint");
        setData(result);
      } catch (error: any) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

### 6. Error Handling

```tsx
"use client";

import { useApiMutation } from "@/lib/api";

export default function FormWithErrorHandling() {
  const mutation = useApiMutation({
    endpoint: "/submit",
    method: "POST",
    onError: (error) => {
      // Handle validation errors
      if (error.status === 422 && error.errors) {
        // Display field-specific errors
        Object.entries(error.errors).forEach(([field, messages]) => {
          console.error(`${field}: ${messages.join(", ")}`);
        });
      } else {
        // Display general error
        alert(error.message);
      }
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      mutation.mutate({ /* form data */ });
    }}>
      {mutation.isError && (
        <div className="error">
          {mutation.error?.message}
        </div>
      )}
      <button type="submit" disabled={mutation.isPending}>
        Submit
      </button>
    </form>
  );
}
```

### 7. Conditional Queries

```tsx
"use client";

import { useApiQuery } from "@/lib/api";
import { tokenStorage } from "@/lib/api";

export default function ConditionalQuery() {
  const isAuthenticated = tokenStorage.isAuthenticated();

  const { data } = useApiQuery({
    endpoint: "/protected-endpoint",
    queryKey: ["protected"],
    enabled: isAuthenticated, // Only fetch if authenticated
  });

  if (!isAuthenticated) {
    return <div>Please login to view this content</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
```

## Best Practices

1. **Always use React Query hooks** for data fetching - they provide caching, refetching, and error handling automatically.

2. **Use query keys consistently** - Group related queries:
   ```tsx
   ["blog", "posts"]
   ["blog", "post", id]
   ["user", "profile"]
   ```

3. **Invalidate queries after mutations** to keep data fresh:
   ```tsx
   invalidateQueries: [["blog", "posts"]]
   ```

4. **Handle loading and error states** in your components.

5. **Use TypeScript types** for better type safety:
   ```tsx
   interface Post {
     id: string;
     title: string;
     content: string;
   }
   
   const { data } = useApiQuery<Post[]>({
     endpoint: "/posts",
     queryKey: ["posts"],
   });
   ```

