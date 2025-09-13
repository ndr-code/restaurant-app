import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { queryClient } from '@/lib/react-query';
import { ROUTES } from '@/config/routes';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Cart from '@/pages/Cart';
import Orders from '@/pages/Orders';
import Restaurants from '@/pages/Restaurants';
import Restaurant from '@/pages/Restaurant';
import Search from '@/pages/Search';
import Contact from '@/pages/Contact';
import Help from '@/pages/Help';
import Checkout from '@/pages/Checkout';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.RESTAURANTS} element={<Restaurants />} />
          <Route path={ROUTES.RESTAURANT_DETAIL} element={<Restaurant />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.HELP} element={<Help />} />

          {/* Auth Routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />

          {/* Cart & Checkout */}
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.CHECKOUT} element={<Checkout />} />

          {/* Protected Routes */}
          <Route path={ROUTES.ORDERS} element={<Orders />} />

          {/* 404 - Catch all unmatched routes */}
          <Route path='*' element={<div>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
