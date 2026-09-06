import { createBrowserRouter, Navigate } from 'react-router-dom';
import { StorefrontLayout } from '../features/storefront/components/StorefrontLayout';
import { HomePage } from '../features/storefront/pages/HomePage';
import { CategoryPage } from '../features/storefront/pages/CategoryPage';
import { ProductPage } from '../features/storefront/pages/ProductPage';
import { SearchResultsPage } from '../features/storefront/pages/SearchResultsPage';
import { CartPage } from '../features/storefront/pages/CartPage';
import { CheckoutPage } from '../features/storefront/pages/CheckoutPage';
import { OrderConfirmationPage } from '../features/storefront/pages/OrderConfirmationPage';
import { PrivacyPolicyPage } from '../features/legal/pages/PrivacyPolicyPage';
import { CookiePolicyPage } from '../features/legal/pages/CookiePolicyPage';
import { TermsOfSalePage } from '../features/legal/pages/TermsOfSalePage';
import { ReturnsPolicyPage } from '../features/legal/pages/ReturnsPolicyPage';
import { ShippingPolicyPage } from '../features/legal/pages/ShippingPolicyPage';
import { AdminLoginPage } from '../features/admin/pages/LoginPage';
import { ProtectedRoute } from '../features/admin/components/ProtectedRoute';
import { AdminLayout } from '../features/admin/components/AdminLayout';
import { CategoriesPage } from '../features/admin/pages/CategoriesPage';
import { ProductsPage } from '../features/admin/pages/ProductsPage';
import { DashboardPage } from '../features/admin/pages/DashboardPage';
import { OrdersPage } from '../features/admin/pages/OrdersPage';
import { OrderDetailPage } from '../features/admin/pages/OrderDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StorefrontLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'categoria/:slug', element: <CategoryPage /> },
      { path: 'prodotto/:slug', element: <ProductPage /> },
      { path: 'cerca', element: <SearchResultsPage /> },
      { path: 'carrello', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'ordine-confermato', element: <OrderConfirmationPage /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'cookie-policy', element: <CookiePolicyPage /> },
      { path: 'termini-vendita', element: <TermsOfSalePage /> },
      { path: 'recesso-resi', element: <ReturnsPolicyPage /> },
      { path: 'spedizioni-e-consegne', element: <ShippingPolicyPage /> },
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
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'ordini', element: <OrdersPage /> },
          { path: 'ordini/:id', element: <OrderDetailPage /> },
          { path: 'prodotti', element: <ProductsPage /> },
          { path: 'categorie', element: <CategoriesPage /> },
        ],
      },
    ],
  },
]);
