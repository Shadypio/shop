import { createBrowserRouter } from 'react-router-dom';
import { StorefrontLayout } from '../features/storefront/components/StorefrontLayout';
import { HomePage } from '../features/storefront/pages/HomePage';
import { CategoryPage } from '../features/storefront/pages/CategoryPage';
import { ProductPage } from '../features/storefront/pages/ProductPage';
import { CartPage } from '../features/storefront/pages/CartPage';
import { CheckoutPage } from '../features/storefront/pages/CheckoutPage';
import { OrderConfirmationPage } from '../features/storefront/pages/OrderConfirmationPage';
import { AdminLoginPage } from '../features/admin/pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StorefrontLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'categoria/:slug', element: <CategoryPage /> },
      { path: 'prodotto/:slug', element: <ProductPage /> },
      { path: 'carrello', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'ordine-confermato', element: <OrderConfirmationPage /> },
    ],
  },
  { path: '/admin/login', element: <AdminLoginPage /> },
]);
