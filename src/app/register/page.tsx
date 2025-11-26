"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "No se pudo registrar");
        return;
      }

      alert("Usuario registrado correctamente");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-5">Crear una cuenta</h1>

      <form onSubmit={handleRegister} className="space-y-3">
        <input
          type="email"
          placeholder="Correo"
          className="border p-2 w-full rounded"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 w-full rounded"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="border p-2 w-full rounded"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-blue-600 underline">
          Iniciar sesión
        </a>
      </p>
    </div>
  );
}
