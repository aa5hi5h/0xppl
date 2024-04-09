import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import nextAuth, { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export const authOption: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session:{
        strategy: 'jwt'
    },
    pages:{
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers:[
        CredentialsProvider({
            name :'credentials',
            credentials:{
                email: {label:"email", type:"email"},
                username:{label:"username",type:"text"},
                password:{label:"password",type:"password"},
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials.password){
                    return null
                }
                const ExistedUser = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })
                if(!ExistedUser){
                    return null
                }
                const validPass = await bcrypt.compare(credentials.password,ExistedUser.password)
                if(!validPass){
                    return null
                }
                return {
                    id : ExistedUser.id,
                    email: ExistedUser.email,
                    username: ExistedUser.username,
                }
            },
        })
    ],
    callbacks: {
        async jwt({token,user}){
            if(user){
                return{
                    ...token,
                    username: user.username
                }
            }return token
        },

        async session({session,token}){
            return{
                ...session,
                user:{
                    ...session.user,
                    username: token.username
                }
            }
        }
    }

    
    
}

const handler = NextAuth(authOption)

export {handler as GET,handler as POST}