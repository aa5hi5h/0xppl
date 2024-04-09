"use client"
import { SessionProvider } from "next-auth/react"
import { FC, ReactNode } from "react"


interface ProviderProp{
    children: ReactNode
}


const Provider: FC<ProviderProp>  = ({children}) =>{
    return  <SessionProvider>{children}</SessionProvider>
    
}

export default Provider;