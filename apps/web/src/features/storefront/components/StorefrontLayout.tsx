import { Outlet, Link } from 'react-router-dom';

export function StorefrontLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center px-4 py-3">
          <Link to="/" className="text-lg font-semibold text-gray-900">
            Detersivi Rossi
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
