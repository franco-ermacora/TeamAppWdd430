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

export default function WishlistPage() {
  const { user, isLoaded, isSignedIn } = useUser();

  const [wishlist, setWishlist] = useState<WishlistCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Campos del formulario de creación
  const [name, setName] = useState('');
  const [set, setSet] = useState('');
  const [rarity, setRarity] = useState('Common');
  const [priority, setPriority] = useState(1);

  // Estado para controlar edición
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    set: string;
    rarity: string;
    priority: number;
  }>({ name: '', set: '', rarity: 'Common', priority: 1 });

  // 1. GET: Cargar wishlist
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

  // 2. POST: Crear nueva carta
  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          set,
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
        setPriority(1);
      }
    } catch (error) {
      console.error('Error al agregar la carta:', error);
    }
  };

  // 3. PUT: Guardar cambios
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

  // 4. DELETE: Borrar carta
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

  if (!isLoaded) return <div className="p-6 max-w-4xl mx-auto text-white">Cargando sesión...</div>;
  if (!isSignedIn) return <div className="p-6 max-w-4xl mx-auto text-white">Iniciá sesión para ver tu wishlist.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-white">Mi Wishlist</h1>

      {/* Formulario de creación con clases de visibilidad en modo oscuro */}
      <form onSubmit={handleAddCard} className="flex gap-3 mb-8 flex-wrap items-center bg-slate-900 p-4 rounded-lg border border-slate-800">
        <input
          type="text"
          placeholder="Nombre de la carta"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-slate-700 bg-slate-950 text-white placeholder-slate-400 p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Set (ej: DM-01)"
          value={set}
          onChange={(e) => setSet(e.target.value)}
          required
          className="border border-slate-700 bg-slate-950 text-white placeholder-slate-400 p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={rarity}
          onChange={(e) => setRarity(e.target.value)}
          className="border border-slate-700 bg-slate-950 text-white p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Common" className="bg-slate-900 text-white">Common</option>
          <option value="Rare" className="bg-slate-900 text-white">Rare</option>
          <option value="Super Rare" className="bg-slate-900 text-white">Super Rare</option>
        </select>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md transition-colors">
          Agregar
        </button>
      </form>

      {/* Lista de cartas */}
      {loading ? (
        <p className="text-slate-400">Cargando cartas...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-slate-400">No tenés cartas en tu wishlist todavía.</p>
      ) : (
        <ul className="space-y-3">
          {wishlist.map((card) => (
            <li
              key={card.id}
              className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-sm"
            >
              {editingId === card.id ? (
                /* Formulario Inline en modo oscuro */
                <div className="flex gap-2 items-center flex-wrap w-full">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="border border-slate-700 bg-slate-950 text-white p-2 rounded-md"
                  />
                  <input
                    type="text"
                    value={editForm.set}
                    onChange={(e) => setEditForm({ ...editForm, set: e.target.value })}
                    className="border border-slate-700 bg-slate-950 text-white p-2 rounded-md"
                  />
                  <select
                    value={editForm.rarity}
                    onChange={(e) => setEditForm({ ...editForm, rarity: e.target.value })}
                    className="border border-slate-700 bg-slate-950 text-white p-2 rounded-md"
                  >
                    <option value="Common" className="bg-slate-900 text-white">Common</option>
                    <option value="Rare" className="bg-slate-900 text-white">Rare</option>
                    <option value="Super Rare" className="bg-slate-900 text-white">Super Rare</option>
                  </select>
                  <input
                    type="number"
                    value={editForm.priority}
                    min="1"
                    onChange={(e) => setEditForm({ ...editForm, priority: Number(e.target.value) })}
                    className="border border-slate-700 bg-slate-950 text-white p-2 rounded-md w-20"
                  />
                  <button
                    onClick={() => handleUpdateCard(card.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md text-sm font-medium"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md text-sm font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                /* Vista Normal en modo oscuro */
                <>
                  <div>
                    <p className="font-semibold text-lg text-white">{card.name}</p>
                    <p className="text-sm text-slate-400">
                      Set: <span className="text-slate-300">{card.set}</span> — Rareza: <span className="text-slate-300">{card.rarity}</span> (Prioridad: {card.priority})
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(card)}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
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
          ))}
        </ul>
      )}
    </div>
  );
}