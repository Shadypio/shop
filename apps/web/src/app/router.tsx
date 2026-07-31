import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../features/storefront/pages/HomePage';
import { AdminLoginPage } from '../features/admin/pages/LoginPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/admin/login', element: <AdminLoginPage /> },
]);
