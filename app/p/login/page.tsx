"use client"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"


const login =() => {

    const router = useRouter()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(!email || !password){
            alert("please fill in all the details")
        }
        const loginData = await signIn('credentials',{
            email,
            password,
            redirect: false
        })
        if(loginData?.error){
            console.log(loginData.error)
        }else(
            router.refresh(),
            router.push('/p/create')
        )
    }



    return(
        <form onSubmit={handleSubmit}>
        <div>
            <div className="flex flex-col mt-16 mb-8 rounded-lg bg-slate-300 px-8 py-8  mx-auto max-w-sm gap-2 ">
            <h1 className="text-4xl font-medium mb-8 underline decoration-2 decoration-zinc-900 hover:decoration-4 hover:decoration-zinc-950 ">Login</h1>
            <label className="text-2xl font-medium">Email</label>
            <input className="border-2 px-2 py-2 rounded-md border-zinc-900" value={email}
            onChange={(e) => {setEmail(e.target.value)}} placeholder="Email..." />
            <label className="text-2xl font-medium mt-2">Password</label>
            <input className="border-2 border-zinc-900 px-2 py-2 rounded-md" placeholder="Password...."
            value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <div className="flex  gap-4">
            <button className="bg-zinc-700 text-white hover:bg-zinc-900 mt-2 px-6 py-2 rounded-md max-w-max text-2xl font-semibold">Login</button>
            </div>
            <p>Dont have an account <Link className="underline text-purple-800" href={'/p/register'}>Register</Link></p>
        </div>
        </div>
        </form>
    )
}

export default login;