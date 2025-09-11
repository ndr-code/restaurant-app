# State Management Architecture

## Pemisahan State: Redux vs React Query

Dalam aplikasi restaurant ini, kita menggunakan pendekatan hybrid untuk mengelola state dengan memisahkan tanggung jawab antara Redux Toolkit dan React Query.

### React Query (Server State)
React Query digunakan untuk mengelola **server state** - data yang berasal dari server dan perlu disinkronisasi dengan backend:

- **Menu** - Daftar menu items dari restaurant
- **Kategori** - Kategori makanan dan minuman
- **Detail Item** - Informasi detail dari setiap menu item
- **Order List** - Daftar pesanan yang sudah dibuat

#### Keuntungan menggunakan React Query untuk Server State:
- Automatic caching dan background updates
- Built-in loading dan error states
- Optimistic updates
- Automatic retry pada network failures
- Garbage collection untuk data yang tidak terpakai

### Redux Toolkit (Client/UI State)
Redux Toolkit digunakan untuk mengelola **client state** atau **UI state** - state yang bersifat lokal dan mengontrol tampilan aplikasi:

- **Filters** - Filter yang diterapkan user (harga, rating, dll)
- **Sort** - Pengurutan data (alfabetis, harga, rating)
- **Search Query** - Input pencarian dari user
- **Cart** - Keranjang belanja (items, quantity, total)
- **Modal Open/Close** - State untuk mengontrol modal dialogs

#### Keuntungan menggunakan Redux untuk Client State:
- Predictable state updates
- Time-travel debugging
- Centralized state management
- Easy state persistence
- DevTools integration

## Implementasi dalam Codebase

### React Query Setup
```typescript
// src/lib/react-query.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
})
```

### Redux Store Setup
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
})
```

## Best Practices

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

## Migration Strategy

Jika ada data yang saat ini disimpan di Redux tetapi seharusnya menggunakan React Query:

1. Identifikasi data yang berasal dari server
2. Buat custom hooks dengan React Query
3. Replace Redux selectors dengan React Query hooks
4. Remove unnecessary Redux actions dan reducers
5. Update components untuk menggunakan React Query hooks

## Conclusion

Dengan memisahkan tanggung jawab antara Redux dan React Query, kita mendapatkan:
- **Better Performance** - Caching otomatis untuk server data
- **Better Developer Experience** - Built-in loading states
- **Better Code Organization** - Clear separation of concerns
- **Better Maintainability** - Easier debugging dan testing
