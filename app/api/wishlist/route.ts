import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Obtener todas las cartas de la wishlist del usuario
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId es requerido' }, { status: 400 });
    }

    const wishlist = await prisma.wishlistCard.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    console.error('Error al obtener la wishlist:', error);
    return NextResponse.json({ error: 'Error al obtener la wishlist' }, { status: 500 });
  }
}

// POST: Agregar una carta a la wishlist
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, set, rarity, priority, userId } = body;

    if (!name || !set || !rarity || !userId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // 1. Verificar si el usuario ya existe en la base de datos
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ id: userId }, { clerkId: userId }],
      },
    });

    // 2. Si no existe, crearlo automáticamente para no romper la clave foránea
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          clerkId: userId,
          email: `${userId}@placeholder.com`,
        },
      });
    }

    // 3. Crear la carta en la wishlist asociándola al ID real del usuario
    const newWishlistCard = await prisma.wishlistCard.create({
      data: {
        name,
        set,
        rarity,
        priority: priority ?? 1,
        userId: user.id,
      },
    });

    return NextResponse.json(newWishlistCard, { status: 201 });
  } catch (error) {
    console.error('Error al crear la carta:', error);
    return NextResponse.json({ error: 'Error al crear el item en la wishlist' }, { status: 500 });
  }
}