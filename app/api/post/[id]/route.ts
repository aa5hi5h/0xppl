import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient()

export async function GET(request:Request,{params}:{params:{id:string}}){
    const session = await getServerSession(authOption)
    const {id} = params
    const post = await prisma.post.findUnique({
        where:{
            id,
        }
    })
    return NextResponse.json(post,{status:201})

}

export async function PATCH(request:Request,{params}:{params:{id:string}}){
    const session = await getServerSession(authOption)
    if(!session?.user){
        return NextResponse.json({message:"Not authenticated"},{status:409})
    }
    const{id} = params
    const {title,description} = await request.json()
    const post = await prisma.post.update({
        where:{
            id,
            UserEmail: session.user.email
        },data:{
            title,
            description
        }
    })
    return NextResponse.json(post,{status:201})
}

export async function DELETE(request:Request,{params}:{params:{id:string}}){
    const session = await getServerSession(authOption)
    const{id} = params
    const post = await prisma.post.delete({
        where:{
            id,
            UserEmail: session?.user?.email
        }
    })
    return NextResponse.json(post,{status:201})
}