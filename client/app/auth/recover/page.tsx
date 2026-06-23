"use client";

import { useState } from "react";
import Link from "next/link";
import Field from "@/shared/Form/Field";
import axios from "axios";

export default function RecoverPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/recover", { email });
      if (response.status === 200) {
        setSent(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al enviar correo de recuperación");
    }
  };

  return (
    <div className="bg-void flex flex-col items-center justify-center h-screen">
      <Link href="/" className="font-mono text-lg font-bold text-text no-underline mb-6">
        Kasti<span className="text-cyan">dev</span>
      </Link>

      {sent ? (
        <div className="w-full max-w-sm text-center">
          <p className="text-text text-lg mb-4">Correo enviado</p>
          <p className="text-muted text-sm mb-6">
            Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.
          </p>
          <Link
            href="/auth"
            className="text-cyan text-sm no-underline hover:underline"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-sm text-primary bg-glass-surface backdrop-blur-lg border border-border-glass rounded-lg p-6">
          <p className="text-muted text-sm mb-4">
            Ingresa tu correo registrado y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          <Field
            labelField="email"
            labelText="Email"
            type="text"
            placeholder="correo@registrado.com"
            fieldControlMethod={(e: any) => setEmail(e.target.value)}
            fieldValue={email}
          />

          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full mt-4 hover:cursor-pointer bg-cyan text-[#0f1117] font-medium py-2 px-4 rounded hover:opacity-85 transition duration-200"
          >
            Enviar enlace
          </button>

          <div className="mt-4 text-center">
            <Link href="/auth" className="text-cyan text-sm no-underline hover:underline">
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
