// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto p-4 lg:px-8 py-8">
        <p className="text-center text-sm text-gray-500">
          {new Date().getFullYear()} ProductStore. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}