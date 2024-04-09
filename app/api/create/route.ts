import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOption } from "../auth/[...nextauth]/route"
import { connect } from "http2"

const prisma = new PrismaClient()

export async function POST(request:Request){
    const session = await getServerSession(authOption)
    if(!session?.user || session.user.email=== null){
        return NextResponse.json({message:"Not authenticated"},{status:401})
    }
    const {title,description} = await request.json()

    if(!title || !description){
        throw new Error("Please Fill in all the details")
    }
    
    

    const post = await prisma.post.create({
        data:{
            title,
            description,
            UserEmail: session.user.email
        }
    })

    return NextResponse.json({post},{status:201})
}