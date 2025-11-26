"use client";

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

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imageUrl: "",
    categoryId: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_URL}/products/${editingId}`
      : `${API_URL}/products`;

    const body = {
      nombre: formData.nombre,
      precio: Number(formData.precio),
      descripcion: formData.descripcion,
      imageUrl: formData.imageUrl,
      categoryId: Number(formData.categoryId),
    };

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setFormData({
        nombre: "",
        precio: "",
        descripcion: "",
        imageUrl: "",
        categoryId: "",
      });

      setEditingId(null);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (p: Product) => {
    setFormData({
      nombre: p.nombre,
      precio: p.precio.toString(),
      descripcion: p.descripcion,
      imageUrl: p.imageUrl || "",
      categoryId: p.categoryId.toString(),
    });

    setEditingId(p.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro?")) return;

    await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Productos</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 mb-10 bg-white p-5 rounded border">
        <input
          type="text"
          placeholder="Nombre"
          required
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Precio"
          required
          value={formData.precio}
          onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="URL de Imagen"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
          className="border p-2 rounded"
        />

        <select
          required
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({ ...formData, categoryId: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">Seleccione categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Descripción"
          required
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button className="bg-black text-white p-2 rounded">
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* LISTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded">
            <h3 className="font-bold">{p.nombre}</h3>
            <p>S/. {p.precio}</p>
            <p className="text-sm text-gray-600">{p.descripcion}</p>

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleEdit(p)}
                className="text-blue-600 underline"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-600 underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
