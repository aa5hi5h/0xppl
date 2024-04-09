import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request: Request){
    try{
        const { email,username,password } = await request.json()
    if(!email || !username || !password){
        throw new Error('please fill in all the details')
    }
    const ExistedEmail = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(ExistedEmail){
        return NextResponse.json({message:"user with this email already exists"},{status:409})
    }
    const existedUsername = await prisma.user.findUnique({
        where:{
            username
        }
    })
    if(existedUsername){
        return NextResponse.json({message:"user with this username already exists"},{status:409})
    }
    const hashedPass = await bcrypt.hash(password,10)

    const newUser = await prisma.user.create({
        data:{
            email,
            username,
            password: hashedPass
        }
    })
    return NextResponse.json({user:newUser,message:"user Created"},{status:201})

    }catch(error){
        console.log(`there is this error in the backend of register page : ${error}`)
    }
    
}