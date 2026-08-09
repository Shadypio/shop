import { createBrowserRouter, Navigate } from 'react-router-dom';
import { StorefrontLayout } from '../features/storefront/components/StorefrontLayout';
import { HomePage } from '../features/storefront/pages/HomePage';
import { CategoryPage } from '../features/storefront/pages/CategoryPage';
import { ProductPage } from '../features/storefront/pages/ProductPage';
import { CartPage } from '../features/storefront/pages/CartPage';
import { CheckoutPage } from '../features/storefront/pages/CheckoutPage';
import { OrderConfirmationPage } from '../features/storefront/pages/OrderConfirmationPage';
import { AdminLoginPage } from '../features/admin/pages/LoginPage';
import { ProtectedRoute } from '../features/admin/components/ProtectedRoute';
import { AdminLayout } from '../features/admin/components/AdminLayout';
import { CategoriesPage } from '../features/admin/pages/CategoriesPage';
import { ProductsPage } from '../features/admin/pages/ProductsPage';

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
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/prodotti" replace /> },
          { path: 'prodotti', element: <ProductsPage /> },
          { path: 'categorie', element: <CategoriesPage /> },
        ],
      },
    ],
  },
]);
