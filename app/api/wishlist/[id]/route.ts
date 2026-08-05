import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'

// PUT: Actualizar una carta existente de la wishlist
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, set, rarity, priority } = body;

    const updatedCard = await prisma.wishlistCard.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(set && { set }),
        ...(rarity && { rarity }),
        ...(priority !== undefined && { priority }),
      },
    });

    return NextResponse.json(updatedCard, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar la carta de la wishlist' }, { status: 500 });
  }
}

// DELETE: Eliminar una carta de la wishlist
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.wishlistCard.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Carta eliminada correctamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar la carta' }, { status: 500 });
  }
}