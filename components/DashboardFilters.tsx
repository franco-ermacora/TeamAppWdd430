'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function DashboardFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilterChange(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reiniciar a página 1 al filtrar
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Buscador por Nombre */}
      <input
        type="text"
        placeholder="Buscar cartas..."
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleFilterChange('query', e.target.value)}
        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
      />

      {/* Filtro por Rareza */}
      <select
        defaultValue={searchParams.get('rarity')?.toString() || ''}
        onChange={(e) => handleFilterChange('rarity', e.target.value)}
        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-violet-500"
      >
        <option value="">Todas las Rarezas</option>
        <option value="Common">Common</option>
        <option value="Uncommon">Uncommon</option>
        <option value="Rare">Rare</option>
        <option value="Super Rare">Super Rare</option>
        <option value="Secret Rare">Secret Rare</option>
      </select>

      {/* Filtro por Set */}
      <select
        defaultValue={searchParams.get('set')?.toString() || ''}
        onChange={(e) => handleFilterChange('set', e.target.value)}
        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-violet-500"
      >
        <option value="">Todos los Sets</option>
        <option value="Base Set">Base Set</option>
        <option value="Expansion 1">Expansion 1</option>
      </select>
    </div>
  );
}