'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';

interface WishlistCard {
  id: string;
  name: string;
  set: string;
  rarity: string;
  priority: number;
}

const PRIORITY_OPTIONS = [
  { value: 3, label: 'Alta', badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30' },
  { value: 2, label: 'Media', badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  { value: 1, label: 'Baja', badge: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30' },
];

const RARITY_OPTIONS = ['Common', 'Rare', 'Super Rare'];

function priorityMeta(priority: number) {
  return (
    PRIORITY_OPTIONS.find((p) => p.value === priority) ??
    PRIORITY_OPTIONS[PRIORITY_OPTIONS.length - 1]
  );
}

const inputClass =
  'border border-zinc-800 bg-zinc-950 text-white placeholder-zinc-500 p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 w-full';

export default function WishlistPage() {
  const { user, isLoaded, isSignedIn } = useUser();

  const [wishlist, setWishlist] = useState<WishlistCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [set, setSet] = useState('');
  const [rarity, setRarity] = useState('Common');
  const [priority, setPriority] = useState(2);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    set: string;
    rarity: string;
    priority: number;
  }>({ name: '', set: '', rarity: 'Common', priority: 2 });

  const fetchWishlist = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/wishlist?userId=${user.id}`);
      const data = await res.json();
      if (res.ok) {
        setWishlist(data);
      }
    } catch (error) {
      console.error('Error al cargar la wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchWishlist();
    }
  }, [isLoaded, isSignedIn, fetchWishlist]);

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = name.trim();
    const trimmedSet = set.trim();

    if (!trimmedName || !trimmedSet) {
      setFormError('Nombre y set son obligatorios.');
      return;
    }
    if (!user?.id) return;

    try {
      setSubmitting(true);
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          set: trimmedSet,
          rarity,
          priority: Number(priority),
          userId: user.id,
        }),
      });

      if (res.ok) {
        const newCard = await res.json();
        setWishlist((prev) => [newCard, ...prev]);
        setName('');
        setSet('');
        setRarity('Common');
        setPriority(2);
      } else {
        setFormError('No se pudo agregar la carta. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al agregar la carta:', error);
      setFormError('No se pudo agregar la carta. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const startEditing = (card: WishlistCard) => {
    setEditingId(card.id);
    setEditForm({
      name: card.name,
      set: card.set,
      rarity: card.rarity,
      priority: card.priority,
    });
  };

  const handleUpdateCard = async (id: string) => {
    try {
      const res = await fetch(`/api/wishlist/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editForm,
          priority: Number(editForm.priority),
        }),
      });

      if (res.ok) {
        const updatedCard = await res.json();
        setWishlist((prev) =>
          prev.map((card) => (card.id === id ? updatedCard : card))
        );
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error al actualizar la carta:', error);
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      const res = await fetch(`/api/wishlist/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setWishlist((prev) => prev.filter((card) => card.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar la carta:', error);
    }
  };

  if (!isLoaded)
    return <div className="p-6 max-w-5xl mx-auto text-white">Cargando sesión...</div>;
  if (!isSignedIn)
    return (
      <div className="p-6 max-w-5xl mx-auto text-white">
        Iniciá sesión para ver tu wishlist.
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto text-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-white">Mi Wishlist</h1>

      <form
        onSubmit={handleAddCard}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8 bg-zinc-900 p-4 rounded-lg border border-zinc-800"
      >
        <input
          type="text"
          placeholder="Nombre de la carta"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={`${inputClass} lg:col-span-2`}
        />
        <input
          type="text"
          placeholder="Set (ej: DM-01)"
          value={set}
          onChange={(e) => setSet(e.target.value)}
          required
          className={inputClass}
        />
        <select
          value={rarity}
          onChange={(e) => setRarity(e.target.value)}
          className={inputClass}
        >
          {RARITY_OPTIONS.map((r) => (
            <option key={r} value={r} className="bg-zinc-900 text-white">
              {r}
            </option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className={inputClass}
        >
          {PRIORITY_OPTIONS.map((p) => (
            <option key={p.value} value={p.value} className="bg-zinc-900 text-white">
              Prioridad: {p.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-5 py-2.5 rounded-md transition-colors lg:col-span-5"
        >
          {submitting ? 'Agregando...' : 'Agregar a la wishlist'}
        </button>
        {formError && (
          <p className="text-rose-400 text-sm lg:col-span-5">{formError}</p>
        )}
      </form>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-lg border border-zinc-800 bg-zinc-900 animate-pulse"
            />
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <p className="text-zinc-400">Aún no tenés cartas en tu wishlist.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((card) => {
            const meta = priorityMeta(card.priority);
            return (
              <li
                key={card.id}
                className="flex flex-col justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-lg shadow-sm"
              >
                {editingId === card.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={editForm.set}
                      onChange={(e) => setEditForm({ ...editForm, set: e.target.value })}
                      className={inputClass}
                    />
                    <select
                      value={editForm.rarity}
                      onChange={(e) => setEditForm({ ...editForm, rarity: e.target.value })}
                      className={inputClass}
                    >
                      {RARITY_OPTIONS.map((r) => (
                        <option key={r} value={r} className="bg-zinc-900 text-white">
                          {r}
                        </option>
                      ))}
                    </select>
                    <select
                      value={editForm.priority}
                      onChange={(e) =>
                        setEditForm({ ...editForm, priority: Number(e.target.value) })
                      }
                      className={inputClass}
                    >
                      {PRIORITY_OPTIONS.map((p) => (
                        <option key={p.value} value={p.value} className="bg-zinc-900 text-white">
                          Prioridad: {p.label}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => handleUpdateCard(card.id)}
                        className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-md text-sm font-medium"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1.5 rounded-md text-sm font-medium"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-lg text-white">{card.name}</p>
                      <span
                        className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${meta.badge}`}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">
                      Set: <span className="text-zinc-300">{card.set}</span> — Rareza:{' '}
                      <span className="text-zinc-300">{card.rarity}</span>
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => startEditing(card)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
