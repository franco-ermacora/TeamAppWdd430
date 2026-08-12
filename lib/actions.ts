'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ==========================================
// 🃏 ACCIONES DE COLECCIÓN (CollectionCard)
// ==========================================

export async function addCollectionCard(formData: FormData) {
  const name = formData.get('name')?.toString() || '';
  const set = formData.get('set')?.toString() || '';
  const rarity = formData.get('rarity')?.toString() || '';
  const quantity = Number(formData.get('quantity')) || 1;

  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: { clerkId: 'temp_user', email: 'demo@cardvault.com' },
    });
  }

  await prisma.collectionCard.create({
    data: {
      name,
      set,
      rarity,
      quantity,
      userId: user.id,
    },
  });

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateQuantity(cardId: string, newQuantity: number) {
  if (newQuantity <= 0) {
    await prisma.collectionCard.deleteMany({ where: { id: cardId } });
  } else {
    await prisma.collectionCard.update({
      where: { id: cardId },
      data: { quantity: newQuantity },
    });
  }
  revalidatePath('/dashboard');
}

export async function deleteCollectionCard(cardId: string) {
  await prisma.collectionCard.deleteMany({ where: { id: cardId } });
  revalidatePath('/dashboard');
}


// ==========================================
// 🌟 ACCIONES DE WISHLIST (WishlistCard)
// ==========================================

export async function addWishlistCard(formData: FormData) {
  const name = formData.get('name')?.toString() || '';
  const set = formData.get('set')?.toString() || '';
  const rarity = formData.get('rarity')?.toString() || '';
  const priority = Number(formData.get('priority')) || 1;

  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: { clerkId: 'temp_user', email: 'demo@cardvault.com' },
    });
  }

  await prisma.wishlistCard.create({
    data: {
      name,
      set,
      rarity,
      priority,
      userId: user.id,
    },
  });

  revalidatePath('/wishlist');
  redirect('/wishlist');
}

export async function updateWishlistCard(cardId: string, formData: FormData) {
  const name = formData.get('name')?.toString() || '';
  const set = formData.get('set')?.toString() || '';
  const rarity = formData.get('rarity')?.toString() || '';
  const priority = Number(formData.get('priority')) || 1;

  await prisma.wishlistCard.update({
    where: { id: cardId },
    data: {
      name,
      set,
      rarity,
      priority,
    },
  });

  revalidatePath('/wishlist');
}

export async function deleteWishlistCard(cardId: string) {
  await prisma.wishlistCard.deleteMany({ where: { id: cardId } });
  revalidatePath('/wishlist');
}