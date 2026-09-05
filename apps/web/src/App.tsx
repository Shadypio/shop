import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './app/providers';
import { router } from './app/router';
import { Analytics } from '@vercel/analytics/react';
function App() {
  return (
    <>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
      <Analytics />
    </>
  );
}

export default App;
