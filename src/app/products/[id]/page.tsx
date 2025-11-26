"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imageUrl?: string;
  categoryId: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState<number>(0);

  const loadProducts = useCallback(async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data.data || []);
  }, []);

  const loadCategories = useCallback(async () => {
    const res = await fetch(`${API_URL}/categories`);
    const data = await res.json();
    setCategories(data.data || []);
  }, []);

  useEffect(() => {
    (async () => {
      await loadProducts();
      await loadCategories();
    })();
  }, [loadProducts, loadCategories]);

  const filteredProducts =
    filter === 0 ? products : products.filter((p) => p.categoryId === filter);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>

      {/* FILTRO */}
      <select
        className="border p-2 rounded mb-6"
        onChange={(e) => setFilter(Number(e.target.value))}
      >
        <option value={0}>Todas las Categorías</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* LISTA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="border rounded p-4">
            <Image
              src={p.imageUrl || "https://via.placeholder.com/200"}
              alt={p.nombre}
              width={200}
              height={160}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h3 className="font-bold text-lg">{p.nombre}</h3>
            <p className="text-gray-700">S/. {p.precio}</p>
            <p className="text-sm text-gray-500">{p.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
