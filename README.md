# React Vite ShadCN Admin Template

A modern, full-featured admin panel template built with the latest React ecosystem technologies. Get up and running with a production-ready admin dashboard in seconds.

[![npm version](https://badge.fury.io/js/create-react-vite-shadcn-template.svg)](https://badge.fury.io/js/create-react-vite-shadcn-template)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start

```bash
npx create-react-vite-shadcn-template my-app
cd my-app
npm install
npm run dev
```

## ✨ Features

- **⚡ Lightning Fast**: Built on Vite for instant hot module replacement and optimized builds
- **🎨 Modern UI**: Beautiful, accessible components with ShadCN/UI
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🔒 Type Safety**: Full TypeScript support for robust development
- **🚀 Custom API Hooks**: Four powerful hooks (GET, POST, PATCH, DELETE) for seamless API integration
- **📊 Smart Data Management**: TanStack Query with automatic refetching and caching
- **📋 Form Handling**: React Hook Form with Zod validation
- **🔐 Authentication Ready**: Built-in auth hooks and token management
- **🍞 Toast Notifications**: Integrated Sonner for user feedback
- **🎯 Developer Experience**: ESLint, Prettier, and pre-configured tooling
- **📦 Production Ready**: Optimized build configuration and best practices

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | ^18.0.0 |
| **TypeScript** | Type Safety | ^5.0.0 |
| **Vite** | Build Tool | ^5.0.0 |
| **ShadCN/UI** | Component Library | Latest |
| **Tailwind CSS** | Styling | ^3.0.0 |
| **TanStack Query** | Data Fetching | ^5.0.0 |
| **React Hook Form** | Form Management | ^7.0.0 |
| **Zod** | Schema Validation | ^3.0.0 |
| **Sonner** | Toast Notifications | ^1.0.0 |
| **Axios** | HTTP Client | ^1.0.0 |
| **js-cookie** | Cookie Management | ^3.0.0 |

## 📁 Project Structure

```
my-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── ui/           # ShadCN/UI components
│   ├── config/
│   │   ├── api/          # API endpoints configuration
│   │   └── instance/     # Axios instance setup
│   ├── hooks/            # Custom React hooks (API hooks)
│   ├── lib/              # Utilities and configurations
│   ├── pages/            # Page components
│   ├── services/         # Business logic services
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper utilities
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Create a new project**
   ```bash
   npx create-react-vite-shadcn-template my-admin-panel
   ```

2. **Navigate to the project**
   ```bash
   cd my-admin-panel
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |

## 🎨 Customization

### Adding New Components

The template uses ShadCN/UI components. Add new components using:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add form
npx shadcn-ui@latest add table
```

### Form Validation Example

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

type FormData = z.infer<typeof schema>

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Custom API Hooks System

This template includes a powerful, type-safe API hooks system that simplifies data fetching and mutations. The system consists of four main hooks that handle all common API operations:

#### API Configuration

First, define your API endpoints in a centralized configuration:

```tsx
// config/api/api.ts
const API = {
  auth: {
    login: 'auth/login',
    register: 'auth/register',
    logout: 'auth/logout',
    profile: 'auth/profile',
  },
  users: {
    list: 'users',
    create: 'users',
    update: 'users',
    delete: 'users',
  }
};

Object.freeze(API);
export default API;
```

#### Available Hooks

| Hook | Purpose | Use Case |
|------|---------|----------|
| `useFetchData` | GET requests | Fetching data |
| `usePostData` | POST requests | Creating resources |
| `usePatchData` | PATCH requests | Updating resources |
| `useDeleteData` | DELETE requests | Deleting resources |

#### Usage Examples

**Fetching Data**
```tsx
import { useFetchData } from '@/hooks/use-fetch-data';
import API from '@/config/api/api';

function UserList() {
  const { data, isLoading, error } = useFetchData({
    url: API.users.list,
    queryKey: ['users']
  });

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred</div>

  return (
    <div>
      {data?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

**Creating Data**
```tsx
import { usePostData } from '@/hooks/use-post-data';
import API from '@/config/api/api';

function CreateUser() {
  const createUser = usePostData({
    url: API.users.create,
    refetchQueries: ['users'], // Automatically refetch users list
    onSuccess: (data) => {
      console.log('User created:', data);
    }
  });

  const handleSubmit = (userData) => {
    createUser.mutate(userData);
  };

  return (
    <button 
      onClick={() => handleSubmit({ name: 'John Doe' })}
      disabled={createUser.isPending}
    >
      {createUser.isPending ? 'Creating...' : 'Create User'}
    </button>
  );
}
```

**Updating Data**
```tsx
import { usePatchData } from '@/hooks/use-patch-data';
import API from '@/config/api/api';

function UpdateUser({ userId }) {
  const updateUser = usePatchData({
    url: `${API.users.update}/${userId}`,
    refetchQueries: ['users', 'user-profile']
  });

  const handleUpdate = (updates) => {
    updateUser.mutate(updates);
  };

  return (
    <button onClick={() => handleUpdate({ name: 'Jane Doe' })}>
      Update User
    </button>
  );
}
```

#### Authentication Example

```tsx
// hooks/auth-hooks.ts
import API from "@/config/api/api";
import useFetchData from "@/hooks/use-fetch-data";
import usePostData from "@/hooks/use-post-data";

export const useLogin = () => {
  return usePostData({
    url: API.auth.login,
    refetchQueries: [API.auth.profile],
  });
};

export const useGetProfile = () => {
  return useFetchData({
    url: API.auth.profile,
    queryKey: ['profile']
  });
};

// In your component
function LoginForm() {
  const login = useLogin();
  const { data: profile } = useGetProfile();

  const handleLogin = (credentials) => {
    login.mutate(credentials);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      {/* Your form fields */}
    </form>
  );
}
```

#### Advanced Features

**Custom Headers**
```tsx
const uploadFile = usePostData({
  url: API.files.upload,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

**Error Handling**
```tsx
const createUser = usePostData({
  url: API.users.create,
  onError: (error) => {
    if (error.statusCode === 400) {
      // Handle validation errors
    }
  }
});
```

**Conditional Refetching**
```tsx
const updateUser = usePatchData({
  url: API.users.update,
  refetchQueries: ['users'],
  mutationOptions: {
    onSuccess: (data) => {
      // Custom success logic
      queryClient.setQueryData(['user', data.id], data);
    }
  }
});
```
```

## 🌈 Theming

The template supports both light and dark themes out of the box. Customize colors in `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Your custom colors
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

## 📱 Responsive Design

All components are built mobile-first with Tailwind CSS responsive utilities:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=My Admin Panel
```

### TypeScript Configuration

The template includes strict TypeScript settings in `tsconfig.json` for better type safety.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ShadCN/UI](https://ui.shadcn.com/) for the beautiful component library
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [TanStack Query](https://tanstack.com/query) for excellent data fetching
- [React Hook Form](https://react-hook-form.com/) for form management
- [Zod](https://zod.dev/) for schema validation

## 📞 Support

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/create-react-vite-shadcn-template/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/create-react-vite-shadcn-template/discussions)

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/create-react-vite-shadcn-template)
![GitHub forks](https://img.shields.io/github/forks/yourusername/create-react-vite-shadcn-template)
![GitHub issues](https://img.shields.io/github/issues/yourusername/create-react-vite-shadcn-template)

---

**Built with ❤️ by [Your Name](https://github.com/yourusername)**