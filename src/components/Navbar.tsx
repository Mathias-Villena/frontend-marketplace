// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href="/" className="text-xl font-semibold text-gray-900 flex items-center">
            ProductStore
          </Link>
          
          <div className="flex gap-4">
            <Link 
              href="/admin" 
              className="flex items-center hover:text-gray-600 transition-colors"
            >
              Admin
            </Link>
            <Link 
              href="/" 
              className="text-gray-600 flex items-center hover:text-gray-900 transition-colors"
            >
              Productos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}