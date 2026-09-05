import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './app/providers';
import { router } from './app/router';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
      <SpeedInsights />
    </>
  );
}

export default App;
