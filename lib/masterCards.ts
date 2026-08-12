export interface MasterCard {
  id: string;
  name: string;
  set: string;
  rarity: string;
  image: string;
  description: string;
  cardValue: number;
  borderColor: string;
}

const rarities = [
  { name: 'Common', border: 'border-zinc-500 bg-zinc-950/80', maxVal: 15 },
  { name: 'Rare', border: 'border-blue-500 bg-blue-950/80', maxVal: 35 },
  { name: 'Super Rare', border: 'border-purple-500 bg-purple-950/80', maxVal: 60 },
  { name: 'Ultra Rare', border: 'border-amber-500 bg-amber-950/80', maxVal: 85 },
  { name: 'Secret Rare', border: 'border-rose-500 bg-rose-950/80', maxVal: 100 },
];

const sets = ['LOB-001', 'MRD-045', 'PSV-012', 'SDK-003', 'DB1-EN000'];

// Lista grande de nombres únicos garantizados para las 120 cartas
const uniqueCardNames = [
  'Fierce Phoenix', 'Ancient Sphinx', 'Eternal Griffin', 'Wild Chimera', 'Silent Kraken',
  'Hidden Basilisk', 'Lost Wyvern', 'Feral Pegasus', 'Vigilant Hydra', 'Wandering Kitsune',
  'Savage Leviathan', 'Immortal Sylph', 'Distant Nymph', 'Proud Banshee', 'Restless Golem',
  'Mystic Cerberus', 'Arcane Minotaur', 'Shadowed Centaur', 'Solar Wraith', 'Lunar Djinn',
  'Boundless Titan', 'Stellar Valkyrie', 'Primal Roc', 'Sacred Behemoth', 'Blind Ifrit',
  'Fierce Marid', 'Ancient Qilin', 'Eternal Garuda', 'Wild Naga', 'Silent Manticore',
  'Hidden Drake', 'Lost Basilisk', 'Feral Sphinx', 'Vigilant Griffin', 'Wandering Chimera',
  'Savage Kraken', 'Immortal Wyvern', 'Distant Pegasus', 'Proud Hydra', 'Restless Kitsune',
  'Mystic Leviathan', 'Arcane Sylph', 'Shadowed Nymph', 'Solar Banshee', 'Lunar Golem',
  'Boundless Cerberus', 'Stellar Minotaur', 'Primal Centaur', 'Sacred Wraith', 'Blind Djinn',
  'Fierce Titan', 'Ancient Valkyrie', 'Eternal Roc', 'Wild Behemoth', 'Silent Ifrit',
  'Hidden Marid', 'Lost Qilin', 'Feral Garuda', 'Vigilant Naga', 'Wandering Manticore',
  'Savage Phoenix', 'Immortal Sphinx', 'Distant Griffin', 'Proud Chimera', 'Restless Kraken',
  'Mystic Basilisk', 'Arcane Wyvern', 'Shadowed Pegasus', 'Solar Hydra', 'Lunar Kitsune',
  'Boundless Leviathan', 'Stellar Sylph', 'Primal Nymph', 'Sacred Banshee', 'Blind Golem',
  'Fierce Cerberus', 'Ancient Minotaur', 'Eternal Centaur', 'Wild Wraith', 'Silent Djinn',
  'Hidden Titan', 'Lost Valkyrie', 'Feral Roc', 'Vigilant Behemoth', 'Wandering Ifrit',
  'Savage Marid', 'Immortal Qilin', 'Distant Garuda', 'Proud Naga', 'Restless Manticore',
  'Mystic Phoenix', 'Arcane Sphinx', 'Shadowed Griffin', 'Solar Chimera', 'Lunar Kraken',
  'Boundless Basilisk', 'Stellar Wyvern', 'Primal Pegasus', 'Sacred Hydra', 'Blind Kitsune',
  'Fierce Leviathan', 'Ancient Sylph', 'Eternal Nymph', 'Wild Banshee', 'Silent Golem',
  'Hidden Cerberus', 'Lost Minotaur', 'Feral Centaur', 'Vigilant Wraith', 'Wandering Djinn',
  'Savage Titan', 'Immortal Valkyrie', 'Distant Roc', 'Proud Behemoth', 'Restless Ifrit',
  'Mystic Marid', 'Arcane Qilin', 'Shadowed Garuda', 'Solar Naga', 'Lunar Manticore', 'Ethereal Chimera', 'Primordial Griffin',
  'Astral Sphinx',  'Sovereign Phoenix'
];

export const MASTER_CARDS: MasterCard[] = Array.from({ length: 120 }, (_, index) => {
  const id = (index + 1).toString();
  const rarityData = rarities[index % rarities.length];
  
  // Asignamos un nombre único de la lista asegurando que las 120 cartas tengan identidad propia
  const name = uniqueCardNames[index] || `Mystic Entity #${id}`;

  const cardValue = Math.floor(Math.random() * rarityData.maxVal) + 1;
  const set = sets[index % sets.length];

  return {
    id,
    name,
    set,
    rarity: rarityData.name,
    image: `/cards/card${id}.jpg`,
    description: 'A powerful collectible card from the universal database. Essential for top-tier collectors and deck builders.',
    cardValue,
    borderColor: rarityData.border,
  };
});