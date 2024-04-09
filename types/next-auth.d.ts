import NextAuth from "next-auth"

declare module "next-auth"{
    interface User{
        username: string
    }
    interface session{
        username: User,
        
        token:{
            ussername: string
        }
    }
}