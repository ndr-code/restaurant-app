# Comprehensive Restaurant App Architecture

## Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [State Management Architecture](#state-management-architecture)
4. [API Contract Documentation](#api-contract-documentation)
5. [Implementation Guidelines](#implementation-guidelines)
6. [Best Practices](#best-practices)

---

## Project Overview

This document provides a comprehensive architecture guide for the Restaurant App, covering project structure, state management patterns, and complete API integration specifications. The application is built using modern React with TypeScript, Redux Toolkit for client state, React Query for server state management, and Tailwind CSS for styling.

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Redux Toolkit + React Query
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod

---

## Project Structure

### Recommended Architecture for Scalable Restaurant App

```
src/
├── app/                    # Entry & routing (Vite/CRA: src/main.tsx + src/App.tsx)
├── pages/                  # Page-level components (Home, Cart, Checkout, Orders)
├── features/               # Feature-based organization
│   ├── auth/              # Authentication Redux slice + hooks
│   ├── cart/              # Cart Redux slice + hooks
│   ├── order/             # Order Redux slice + hooks
│   ├── restaurant/        # Restaurant Redux slice + hooks
│   └── review/            # Review Redux slice + hooks
├── components/            # UI reusable (Navbar, Footer, ProductCard, EmptyState)
├── ui/                    # shadcn/ui wrappers
├── services/              # External service integrations
│   ├── api/               # axios instance, request helpers
│   └── queries/           # React Query hooks (useMenusQuery, dst.)
├── types/                 # TypeScript types (MenuItem, Category, Order, dst.)
├── lib/                   # utils (formatCurrency, cn, etc.)
├── styles/                # global.css, tailwind.css
├── assets/                # images/icons jika perlu
└── config/                # env, constants, route paths
```

### Detailed Folder Explanation

#### 📁 app/
**Purpose**: Entry point dan routing utama aplikasi
- `main.tsx` - Entry point aplikasi dengan providers
- `App.tsx` - Root component dengan routing setup
- Setup untuk React Router, Redux Provider, React Query Client

#### 📁 pages/
**Purpose**: Page-level components yang mewakili halaman utama aplikasi
- `Home.tsx` - Landing page dengan daftar restaurant
- `Cart.tsx` - Halaman keranjang belanja
- `Checkout.tsx` - Halaman checkout dan pembayaran
- `Orders.tsx` - Halaman daftar pesanan user
- `Restaurant.tsx` - Detail page restaurant

#### 📁 features/
**Purpose**: Feature-based organization dengan Redux slices dan hooks terkait

##### features/auth/
- `authSlice.ts` - Redux slice untuk authentication management
- `useAuth.ts` - Custom hooks untuk auth operations
- `index.ts` - Barrel exports

##### features/cart/
- `cartSlice.ts` - Redux slice untuk cart management
- `useCart.ts` - Custom hooks untuk cart operations
- `index.ts` - Barrel exports

##### features/order/
- `orderSlice.ts` - Redux slice untuk order management
- `index.ts` - Barrel exports

##### features/restaurant/
- `restaurantSlice.ts` - Redux slice untuk restaurant data
- `restaurantUISlice.ts` - Redux slice untuk restaurant UI state
- `index.ts` - Barrel exports

##### features/review/
- `reviewSlice.ts` - Redux slice untuk review management
- `index.ts` - Barrel exports

#### 📁 components/
**Purpose**: Reusable UI components yang dapat digunakan di berbagai halaman
- `Navbar.tsx` - Navigation bar
- `Footer.tsx` - Footer component
- `ProductCard.tsx` - Card untuk menampilkan menu item
- `EmptyState.tsx` - Component untuk state kosong
- `LoadingSpinner.tsx` - Loading indicator
- `AllRestaurants.tsx` - Component untuk daftar restaurant
- `GetRestaurant.tsx` - Component untuk detail restaurant
- `StateDemo.tsx` - Demo component untuk state management
- `Debug.tsx` - Debug component untuk development

#### 📁 ui/
**Purpose**: shadcn/ui component wrappers dan customizations
- `button.tsx` - Button component dari shadcn/ui
- `card.tsx` - Card component dari shadcn/ui
- `input.tsx` - Input component dari shadcn/ui

#### 📁 services/
**Purpose**: External service integrations dan API management

##### services/api/
- `axios.ts` - Axios instance configuration dengan interceptors

##### services/queries/
- `useMenusQuery.ts` - React Query hook untuk menu data
- `useCategoriesQuery.ts` - React Query hook untuk categories
- `useOrdersQuery.ts` - React Query hook untuk orders
- `useRestaurantsQuery.ts` - React Query hook untuk restaurants
- `restaurant.ts` - Restaurant-specific query functions
- `index.ts` - Barrel exports

#### 📁 types/
**Purpose**: TypeScript type definitions
- `MenuItem.ts` - Type untuk menu items
- `Category.ts` - Type untuk categories
- `Order.ts` - Type untuk orders
- `User.ts` - Type untuk user data
- `Restaurant.ts` - Type untuk restaurant data
- `api.ts` - API response types
- `index.ts` - Re-exports semua types

#### 📁 lib/
**Purpose**: Utility functions dan helpers
- `utils.ts` - General utility functions
- `react-query.ts` - React Query client configuration

#### 📁 styles/
**Purpose**: Global styling files
- `index.css` - Global CSS styles dengan Tailwind imports

#### 📁 config/
**Purpose**: Configuration files dan constants
- `env.ts` - Environment variable management
- `constants.ts` - Application constants
- `routes.ts` - Route path definitions
- `api.ts` - API configuration constants
- `index.ts` - Barrel exports

#### 📁 providers/
**Purpose**: React context providers
- `ReactQueryProvider.tsx` - React Query client provider
- `queryClient.ts` - Query client configuration

#### 📁 store/
**Purpose**: Redux store configuration
- `index.ts` - Store setup dan configuration
- `hooks.ts` - Typed Redux hooks
- `ReduxProvider.tsx` - Redux provider component
- `slices/` - Redux slices (alternative organization)

---

## State Management Architecture

### Pemisahan State: Redux vs React Query

Dalam aplikasi restaurant ini, kita menggunakan pendekatan hybrid untuk mengelola state dengan memisahkan tanggung jawab antara Redux Toolkit dan React Query.

### React Query (Server State)
React Query digunakan untuk mengelola **server state** - data yang berasal dari server dan perlu disinkronisasi dengan backend:

- **Restaurants** - Daftar restaurant dan detail restaurant
- **Menu** - Daftar menu items dari restaurant
- **Categories** - Kategori makanan dan minuman
- **Orders** - Daftar pesanan yang sudah dibuat
- **Reviews** - Review dan rating restaurant

#### Keuntungan menggunakan React Query untuk Server State:
- Automatic caching dan background updates
- Built-in loading dan error states
- Optimistic updates
- Automatic retry pada network failures
- Garbage collection untuk data yang tidak terpakai

### Redux Toolkit (Client/UI State)
Redux Toolkit digunakan untuk mengelola **client state** atau **UI state** - state yang bersifat lokal dan mengontrol tampilan aplikasi:

- **Authentication** - User login state dan profile
- **Cart** - Keranjang belanja (items, quantity, total)
- **UI State** - Modal open/close, filters, search query
- **Navigation** - Current route dan navigation state

#### Keuntungan menggunakan Redux untuk Client State:
- Predictable state updates
- Time-travel debugging
- Centralized state management
- Easy state persistence
- DevTools integration

### Implementation Setup

#### React Query Setup
```typescript
// src/lib/react-query.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})
```

#### Redux Store Setup
```typescript
// src/store/index.ts
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    restaurant: restaurantSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    review: reviewSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
```

---

## API Contract Documentation

### Base Configuration
- **Base URL**: `https://be-restaurant-app-for-mentee-b6yxog5fk.vercel.app`
- **Authentication**: Bearer Token (JWT)
- **Content-Type**: `application/json`

### Standard Response Format
```json
{
  "success": boolean,
  "message": string,
  "data": object | array | null,
  "errors": object | null
}
```

### 📝 Authentication Endpoints

#### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (required)",
  "password": "string (required, min 8 chars)",
  "confirmPassword": "string (required, must match password)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "phone": "string"
    }
  }
}
```

#### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "string (JWT token)",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "phone": "string",
      "role": "customer | admin | staff"
    }
  }
}
```

#### 3. Get Profile
**GET** `/api/auth/profile`

**Headers:**
- `Authorization: Bearer {jwt_token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "role": "string",
    "avatar": "string | null"
  }
}
```

### 🏪 Restaurant Endpoints

#### 1. Get All Restaurants (with filters)
**GET** `/api/resto`

**Query Parameters:**
- `location` (string, optional): Filter by location
- `priceMin` (number, optional): Minimum price filter
- `priceMax` (number, optional): Maximum price filter
- `rating` (number, optional): Minimum rating filter (1-5)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "restaurants": [
      {
        "id": "number",
        "name": "string",
        "description": "string",
        "location": "string",
        "rating": "number",
        "priceRange": "string",
        "image": "string",
        "isOpen": "boolean"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

#### 2. Get Restaurant Detail
**GET** `/api/resto/{id}`

**Path Parameters:**
- `id` (number, required): Restaurant ID

**Query Parameters:**
- `limitMenu` (number, optional): Limit number of menus returned
- `limitReview` (number, optional): Limit number of reviews returned

**Response (200):**
```json
{
  "success": true,
  "data": {
    "restaurant": {
      "id": "number",
      "name": "string",
      "description": "string",
      "location": "string",
      "rating": "number",
      "priceRange": "string",
      "image": "string",
      "isOpen": "boolean",
      "menus": [
        {
          "id": "number",
          "name": "string",
          "description": "string",
          "price": "number",
          "image": "string",
          "category": "string"
        }
      ],
      "reviews": [
        {
          "id": "number",
          "star": "number",
          "comment": "string",
          "user": {
            "name": "string"
          },
          "createdAt": "string"
        }
      ]
    }
  }
}
```

### 🛒 Cart Management Endpoints

#### 1. Add to Cart
**POST** `/api/cart`

**Headers:**
- `Authorization: Bearer {jwt_token}`

**Request Body:**
```json
{
  "restaurantId": "number (required)",
  "menuId": "number (required)",
  "quantity": "number (required, min 1)"
}
```

#### 2. Get Cart
**GET** `/api/cart`

**Headers:**
- `Authorization: Bearer {jwt_token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "cart": [
      {
        "id": "number",
        "menuId": "number",
        "quantity": "number",
        "itemTotal": "number",
        "menu": {
          "name": "string",
          "price": "number",
          "image": "string"
        },
        "restaurant": {
          "id": "number",
          "name": "string"
        }
      }
    ],
    "summary": {
      "totalItems": "number",
      "totalPrice": "number"
    }
  }
}
```

#### 3. Update Cart Item Quantity
**PUT** `/api/cart/{cartItemId}`

**Path Parameters:**
- `cartItemId` (number, required): Cart item ID

**Request Body:**
```json
{
  "quantity": "number (required, min 1)"
}
```

#### 4. Remove Cart Item
**DELETE** `/api/cart/{cartItemId}`

#### 5. Clear Entire Cart
**DELETE** `/api/cart`

### 📋 Order Endpoints

#### 1. Create Order (Checkout)
**POST** `/api/order/checkout`

**Headers:**
- `Authorization: Bearer {jwt_token}`

**Request Body:**
```json
{
  "deliveryAddress": "string (required)",
  "paymentMethod": "string (required: credit_card, debit_card, cash, e_wallet)",
  "notes": "string (optional)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "transactionId": "string",
    "orderId": "number",
    "totalAmount": "number",
    "paymentMethod": "string",
    "deliveryAddress": "string",
    "status": "preparing"
  }
}
```

#### 2. Get My Orders
**GET** `/api/order/my-order`

**Headers:**
- `Authorization: Bearer {jwt_token}`

**Query Parameters:**
- `status` (string, optional): Filter by order status
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

### ⭐ Review Endpoints

#### 1. Create Review
**POST** `/api/review`

**Request Body:**
```json
{
  "transactionId": "string (required)",
  "restaurantId": "number (required)",
  "star": "number (required, 1-5)",
  "comment": "string (required)"
}
```

#### 2. Get Restaurant Reviews
**GET** `/api/review/restaurant/{restaurantId}`

**Query Parameters:**
- `rating` (number, optional): Filter by specific rating (1-5)
- `page` (number, optional): Page number
- `limit` (number, optional): Items per page

### Order Status Flow
```
preparing → on_the_way → delivered → done
     ↓
  cancelled (can be set from any status)
```

### Payment Methods
- `credit_card`
- `debit_card`
- `cash`
- `e_wallet`

### Status Codes
| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 422 | Unprocessable Entity - Validation errors |
| 500 | Internal Server Error - Server error |

---

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

### 4. Environment Configuration
```typescript
// src/config/env.ts
export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://be-restaurant-app-for-mentee-b6yxog5fk.vercel.app',
  NODE_ENV: import.meta.env.NODE_ENV,
  DEV: import.meta.env.DEV,
}
```

---

## Best Practices

### State Management
1. **Server State → React Query**
   - Data yang berasal dari API
   - Data yang perlu disinkronisasi dengan backend
   - Data yang bisa stale dan perlu refresh

2. **Client State → Redux**
   - UI preferences dan settings
   - Form state yang kompleks
   - Data yang perlu persist di local storage
   - State yang perlu diakses dari banyak komponen

3. **Avoid Duplication**
   - Jangan simpan server data di Redux
   - Jangan gunakan React Query untuk pure UI state

### Component Organization
1. **Reusable Components** - Simpan di `components/`
2. **Page Components** - Simpan di `pages/`
3. **Feature Components** - Simpan di `features/{feature}/components/`

### Type Safety
1. **API Types** - Define semua API response types
2. **Component Props** - Type semua component props
3. **Redux State** - Type semua Redux state

### Error Handling
1. **API Errors** - Handle dengan React Query error boundaries
2. **Form Validation** - Gunakan Zod untuk validation
3. **Network Errors** - Implement retry logic

### Performance
1. **Code Splitting** - Gunakan React.lazy untuk route splitting
2. **Memoization** - Gunakan useMemo dan useCallback bila perlu
3. **Bundle Analysis** - Monitor bundle size

### Security
1. **Token Storage** - Store JWT di httpOnly cookies bila memungkinkan
2. **Input Validation** - Validate semua user input
3. **API Rate Limiting** - Implement client-side rate limiting

---

## Migration Strategy

Untuk mengadopsi arsitektur ini dari codebase yang ada:

1. **Create new folders** sesuai struktur di atas
2. **Move existing files** ke folder yang sesuai
3. **Update imports** menggunakan path aliases
4. **Refactor components** menjadi lebih modular
5. **Split large files** berdasarkan concerns
6. **Implement React Query** untuk server state
7. **Migrate Redux state** ke feature-based slices

## Conclusion

Arsitektur ini memberikan:
- **Clear organization** untuk development team
- **Scalable architecture** untuk growth aplikasi
- **Type safety** dengan TypeScript
- **Performance optimization** dengan React Query caching
- **Developer experience** yang optimal
- **Maintainable codebase** dengan clear separation of concerns

Dengan mengikuti panduan ini, aplikasi restaurant akan memiliki struktur yang solid, mudah dikembangkan, dan mudah di-maintain oleh tim development.
