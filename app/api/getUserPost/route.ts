import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient()

export async function GET(request: Request){
    const session = await getServerSession(authOption)
    if(!session?.user){
        return NextResponse.json({message:"login to create post"},{status:409})
    }
    const posts = await prisma.post.findMany({
        where: {
            UserEmail: session?.user?.email
        }
    })
    return NextResponse.json(posts,{status:201})
}