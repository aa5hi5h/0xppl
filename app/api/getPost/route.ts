import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient()

export  async function GET(request:Request){
    const session = await getServerSession(authOption)
    const post = await prisma.post.findMany()

    return NextResponse.json(post,{status:201})
}