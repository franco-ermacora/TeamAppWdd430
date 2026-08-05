import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

async function getOrCreateUser(clerkId: string, email: string) {
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (user) return user;
  return prisma.user.create({ data: { clerkId, email } });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    return NextResponse.json({ cards: [] });
  }

  const cards = await prisma.collectionCard.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ cards });
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const { name, set, rarity, quantity, email } = body;

  if (!name || !set || !rarity) {
    return NextResponse.json(
      { error: "Faltan campos requeridos: name, set, rarity" },
      { status: 400 }
    );
  }

  const user = await getOrCreateUser(userId, email ?? "");

  const card = await prisma.collectionCard.create({
    data: {
      name,
      set,
      rarity,
      quantity: quantity ?? 1,
      userId: user.id,
    },
  });

  return NextResponse.json({ card }, { status: 201 });
}