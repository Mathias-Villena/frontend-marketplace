"use client";

import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await login(email, password);

      if (!res || !res.token) {
        alert("Credenciales incorrectas");
        return;
      }

      // Guardar en cookies
      document.cookie = `token=${res.token}`;
      document.cookie = `role=${res.user.role}`;

      // Guardar en localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.user.role);

      // Redirección según rol
      if (res.user.role === "ADMIN") router.push("/admin");
      else router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl mb-5 font-bold">Iniciar Sesión</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="border p-2 w-full mb-2"
          placeholder="Correo"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2 rounded w-full">
          Entrar
        </button>
      </form>
    </div>
  );
}
