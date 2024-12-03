import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  // データベースに保存
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ success: true, user });
}
