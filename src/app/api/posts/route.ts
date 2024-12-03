import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true, // 投稿者の情報を含む場合
      },
    });

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, error: "You must be logged in to create a post" },
        { status: 401 }
      );
    }

    const { title, content } = await req.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(session.user.id), // ログイン中のユーザー ID を設定
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
