import { createBrowserRouter } from 'react-router-dom';
import { StorefrontLayout } from '../features/storefront/components/StorefrontLayout';
import { HomePage } from '../features/storefront/pages/HomePage';
import { CategoryPage } from '../features/storefront/pages/CategoryPage';
import { ProductPage } from '../features/storefront/pages/ProductPage';
import { AdminLoginPage } from '../features/admin/pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StorefrontLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'categoria/:slug', element: <CategoryPage /> },
      { path: 'prodotto/:slug', element: <ProductPage /> },
    ],
  },
  { path: '/admin/login', element: <AdminLoginPage /> },
]);
