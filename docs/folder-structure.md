# Project Folder Structure

## Recommended Architecture for Restaurant App

Berikut adalah struktur folder yang direkomendasikan untuk aplikasi restaurant yang scalable dan maintainable:

```
src/
├── app/                    # Entry & routing (Vite/CRA: src/main.tsx + src/App.tsx)
├── pages/                  # Page-level components (Home, Cart, Checkout, Orders)
├── features/               # Feature-based organization
│   ├── cart/              # Redux slice cart + hooks
│   └── filters/           # Redux slice filter/sort/search
├── components/            # UI reusable (Navbar, Footer, ProductCard, EmptyState)
├── ui/                    # shadcn/ui wrappers jika perlu
├── services/              # External service integrations
│   ├── api/               # axios instance, request helpers
│   └── queries/           # React Query hooks (useMenusQuery, dst.)
├── types/                 # TypeScript types (MenuItem, Category, Order, dst.)
├── lib/                   # utils (formatCurrency, cn, etc.)
├── styles/                # global.css, tailwind.css
├── assets/                # images/icons jika perlu
└── config/                # env, constants, route paths
```

## Penjelasan Detail

### 📁 app/
**Purpose**: Entry point dan routing utama aplikasi
- `main.tsx` - Entry point aplikasi dengan providers
- `App.tsx` - Root component dengan routing setup
- Setup untuk React Router, Redux Provider, React Query Client

### 📁 pages/
**Purpose**: Page-level components yang mewakili halaman utama aplikasi
- `Home.tsx` - Landing page dengan daftar restaurant
- `Cart.tsx` - Halaman keranjang belanja
- `Checkout.tsx` - Halaman checkout dan pembayaran
- `Orders.tsx` - Halaman daftar pesanan user

### 📁 features/
**Purpose**: Feature-based organization dengan Redux slices dan hooks terkait

#### features/cart/
- `cartSlice.ts` - Redux slice untuk cart management
- `useCart.ts` - Custom hooks untuk cart operations
- `cartTypes.ts` - TypeScript types khusus cart

#### features/filters/
- `filtersSlice.ts` - Redux slice untuk filter/sort/search
- `useFilters.ts` - Custom hooks untuk filtering
- `filtersTypes.ts` - TypeScript types untuk filters

### 📁 components/
**Purpose**: Reusable UI components yang dapat digunakan di berbagai halaman
- `Navbar.tsx` - Navigation bar
- `Footer.tsx` - Footer component
- `ProductCard.tsx` - Card untuk menampilkan menu item
- `EmptyState.tsx` - Component untuk state kosong
- `LoadingSpinner.tsx` - Loading indicator

### 📁 ui/
**Purpose**: shadcn/ui component wrappers dan customizations
- Wrapper components dari shadcn/ui library
- Custom styling dan modifications
- Re-exports untuk easier imports

### 📁 services/
**Purpose**: External service integrations dan API management

#### services/api/
- `axios.ts` - Axios instance configuration
- `auth.ts` - Authentication API calls
- `restaurants.ts` - Restaurant-related API calls
- `orders.ts` - Order management API calls

#### services/queries/
- `useMenusQuery.ts` - React Query hook untuk menu data
- `useCategoriesQuery.ts` - React Query hook untuk categories
- `useOrdersQuery.ts` - React Query hook untuk orders
- `useRestaurantsQuery.ts` - React Query hook untuk restaurants

### 📁 types/
**Purpose**: TypeScript type definitions
- `MenuItem.ts` - Type untuk menu items
- `Category.ts` - Type untuk categories
- `Order.ts` - Type untuk orders
- `User.ts` - Type untuk user data
- `Restaurant.ts` - Type untuk restaurant data
- `index.ts` - Re-exports semua types

### 📁 lib/
**Purpose**: Utility functions dan helpers
- `utils.ts` - General utility functions
- `formatCurrency.ts` - Currency formatting
- `cn.ts` - Class name utility (dari shadcn/ui)
- `validations.ts` - Form validation schemas
- `constants.ts` - Application constants

### 📁 styles/
**Purpose**: Global styling files
- `globals.css` - Global CSS styles
- `tailwind.css` - Tailwind CSS imports
- `components.css` - Component-specific styles

### 📁 assets/
**Purpose**: Static assets (optional, bisa juga di public/)
- `images/` - Image files
- `icons/` - Icon files
- `logos/` - Logo variations

### 📁 config/
**Purpose**: Configuration files dan constants
- `env.ts` - Environment variable management
- `constants.ts` - Application constants
- `routes.ts` - Route path definitions
- `api.ts` - API configuration constants

## Benefits of This Structure

### 1. **Scalability**
- Feature-based organization memudahkan penambahan fitur baru
- Clear separation of concerns
- Easy to locate dan modify code

### 2. **Maintainability**
- Consistent naming conventions
- Logical grouping of related files
- Easy onboarding untuk developer baru

### 3. **Developer Experience**
- Clear import paths
- Type safety dengan TypeScript
- Reusable components dan hooks

### 4. **Team Collaboration**
- Multiple developers dapat bekerja pada features berbeda
- Minimal merge conflicts
- Clear ownership of code sections

## Implementation Guidelines

### 1. Import Organization
```typescript
// External libraries
import React from 'react'
import { useQuery } from '@tanstack/react-query'

// Internal utilities
import { cn, formatCurrency } from '@/lib/utils'

// Types
import type { MenuItem } from '@/types'

// Components
import { Button } from '@/ui/button'
import { ProductCard } from '@/components/ProductCard'

// Features
import { useCart } from '@/features/cart/useCart'
```

### 2. Barrel Exports
Gunakan `index.ts` files untuk clean exports:
```typescript
// src/types/index.ts
export type { MenuItem } from './MenuItem'
export type { Category } from './Category'
export type { Order } from './Order'
```

### 3. Path Aliases
Setup path aliases di `vite.config.ts`:
```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/features': path.resolve(__dirname, './src/features'),
    },
  },
})
```

## Migration from Current Structure

Untuk mengadopsi struktur ini dari codebase yang ada:

1. **Create new folders** sesuai struktur di atas
2. **Move existing files** ke folder yang sesuai
3. **Update imports** menggunakan path aliases
4. **Refactor components** menjadi lebih modular
5. **Split large files** berdasarkan concerns

## Conclusion

Struktur folder ini memberikan:
- **Clear organization** untuk development team
- **Scalable architecture** untuk growth aplikasi
- **Better developer experience** dengan tooling yang tepat
- **Easier maintenance** dengan separation of concerns yang jelas
