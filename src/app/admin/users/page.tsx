"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash, faEdit, faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import HeaderContent from "@/admin/shared/components/HeaderContent";
import Field from "@/shared/Form/Field";
import userService from "~/services/user";
import { validateNewUserData } from "~/utils/validations";
import type { User } from "@/types/user";

type FormState = {
  username: string;
  email: string;
  password: string;
  phone: string;
};

const EMPTY_FORM: FormState = { username: "", email: "", password: "", phone: "" };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [ownEmail, setOwnEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const service = useMemo(() => userService(), []);

  useEffect(() => {
    Promise.all([
      service.getAllUsers(),
      axios.get<{ email: string | null }>("/api/admin/users/me").then((r) => r.data.email).catch(() => null),
    ])
      .then(([list, email]) => {
        setUsers(list);
        setOwnEmail(email);
      })
      .catch(() => setError("No se pudieron cargar los usuarios."))
      .finally(() => setIsLoading(false));
  }, [service]);

  const setField = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (user: User) => {
    setEditing(user);
    setForm({ username: user.username, email: user.email, password: "", phone: user.phone ?? "" });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (editing) {
      setSaving(true);
      try {
        const updated = await service.updateUser(editing.id, {
          username: form.username,
          email: form.email,
          phone: form.phone === "" ? null : form.phone,
        });
        setUsers((list) => list.map((u) => (u.id === updated.id ? updated : u)));
        setModalOpen(false);
      } catch {
        setFormError("No se pudo actualizar el usuario.");
      } finally {
        setSaving(false);
      }
      return;
    }

    const validation = validateNewUserData(form);
    if (typeof validation === "string") {
      setFormError(validation);
      return;
    }
    setSaving(true);
    try {
      const created = await service.createUser({
        username: form.username,
        email: form.email,
        password: form.password,
        phone: form.phone === "" ? undefined : form.phone,
      });
      setUsers((list) => [...list, created]);
      setModalOpen(false);
    } catch (err: any) {
      setFormError(err.response?.data?.error || "No se pudo crear el usuario.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (user: User) => {
    try {
      const updated = await service.toggleActive(user.id, !user.isActive);
      setUsers((list) => list.map((u) => (u.id === updated.id ? updated : u)));
    } catch {
      setError("No se pudo cambiar el estado del usuario.");
    }
  };

  const handleDelete = async (user: User) => {
    if (user.email === ownEmail) return;
    if (!confirm(`Eliminar al usuario ${user.username}?`)) return;
    try {
      await service.deleteUser(user.id);
      setUsers((list) => list.filter((u) => u.id !== user.id));
    } catch (err: any) {
      setError(err.response?.data?.error || "No se pudo eliminar el usuario.");
    }
  };

  return (
    <section>
      <HeaderContent>
        <h2 className="font-display font-bold text-2xl text-white tracking-tight">USERS</h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary hover:bg-cyan-400 text-void px-5 py-2 rounded-lg font-mono font-bold text-sm tracking-wide transition-all hover:shadow-neon transform active:scale-95 hover:cursor-pointer"
        >
          <FontAwesomeIcon icon={faAdd} className="text-lg font-bold" />
          <span>NEW USER</span>
        </button>
      </HeaderContent>
      <div className="p-8">
        {error && (
          <p role="alert" className="mb-4 text-sm font-mono text-red-400">
            {error}
          </p>
        )}
        {isLoading ? (
          <p className="text-text-muted font-mono text-sm">Loading users...</p>
        ) : users.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted font-mono text-sm">No users yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((user) => {
              const isOwn = user.email === ownEmail;
              return (
                <div
                  key={user.id}
                  className="glass-panel rounded-xl p-5 flex items-center justify-between group hover:border-primary/30 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display font-bold text-white">
                        {user.username}
                        {isOwn && <span className="ml-2 text-xs font-mono text-primary">(tú)</span>}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          user.isActive ? "bg-success/10 text-success" : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {user.isActive ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted font-mono">
                      {user.email}
                      {user.phone ? ` · ${user.phone}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      title="Editar"
                      onClick={() => openEdit(user)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-primary/50 transition-all hover:cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-sm" />
                    </button>
                    <button
                      title={user.isActive ? "Desactivar" : "Activar"}
                      onClick={() => handleToggle(user)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-primary/50 transition-all hover:cursor-pointer"
                    >
                      <FontAwesomeIcon icon={user.isActive ? faBan : faCheck} className="text-sm" />
                    </button>
                    <button
                      title={isOwn ? "No puedes eliminarte a ti mismo" : "Eliminar"}
                      onClick={() => handleDelete(user)}
                      disabled={isOwn}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-red-400 hover:border-red-400/50 transition-all hover:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-text-muted disabled:hover:border-white/10"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-sm" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/70 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="w-full max-w-md text-primary bg-glass-surface backdrop-blur-lg border border-border-glass rounded-lg p-6"
          >
            <h3 className="font-display font-bold text-xl text-white mb-2">
              {editing ? "EDIT USER" : "NEW USER"}
            </h3>
            <Field
              labelField="username"
              labelText="Username"
              type="text"
              placeholder="nombre de usuario"
              fieldControlMethod={setField("username")}
              fieldValue={form.username}
            />
            <Field
              labelField="email"
              labelText="Email"
              type="text"
              placeholder="correo@ejemplo.com"
              fieldControlMethod={setField("email")}
              fieldValue={form.email}
            />
            {!editing && (
              <Field
                labelField="password"
                labelText="Password (min 6)"
                type="password"
                placeholder="contraseña"
                fieldControlMethod={setField("password")}
                fieldValue={form.password}
              />
            )}
            <Field
              labelField="phone"
              labelText="Phone (opcional)"
              type="text"
              placeholder="+1234567890"
              fieldControlMethod={setField("phone")}
              fieldValue={form.phone}
            />
            {formError && (
              <p role="alert" className="mt-3 text-sm text-red-400">
                {formError}
              </p>
            )}
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 disabled:opacity-50 hover:cursor-pointer"
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-white/5 border border-white/10 text-text-muted py-2 px-4 rounded hover:text-white transition duration-200 hover:cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
