"use client"
import Link from "next/link"
import { FormEvent, MouseEventHandler, useState } from "react"
import { useRouter } from "next/navigation"

const register = () => {
    const router = useRouter()
    const[email,setEmail] = useState('')
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[error,setError] = useState('')

    const handleSubmit = async(e: FormEvent) => {
        try{e.preventDefault()
            if(!email || !username || !password){
                alert("please fill in all the details")
            }
            const response = await fetch('/api/register',{
                method:"POST",
                headers:{
                    "Content-type": "application/json"
                },
                body:JSON.stringify({email,username,password})
            })
            if(response.ok){
                alert('user registered')
                router.push('/p/login')
            }
            if(response.status===225){
                setError("email already exist")
            }
            if(response.status===201){
                setError("")
            }}catch(error){
                console.log(`there is this error in registeration page ${error}`)
            }
        
    }
    return(
        <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-16 mb-8 rounded-lg bg-slate-300 px-8 py-8  mx-auto max-w-sm gap-2 ">
            <h1 className="text-4xl font-medium mb-8 underline decoration-2 decoration-zinc-900 hover:decoration-4 hover:decoration-zinc-950 ">Register</h1>
            <label className="text-2xl font-semibold">Email</label>
            <input className="border-2 px-2 py-2 rounded-md border-zinc-900" placeholder="Email..."
            value={email} onChange={(e) => {setEmail(e.target.value)}} />
            <label className="text-2xl font-semibold mt-2">Username</label>
            <input className="border-2 px-2 py-2 rounded-md border-zinc-900" placeholder="Username...."
            value={username} onChange={(e) => {setUsername(e.target.value)}} />
            <label className="text-2xl font-semibold mt-2">Password</label>
            <input className="border-2 border-zinc-900 px-2 py-2 rounded-md" placeholder="Password...." 
            value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            {error && <p className="bg-red-700 text-2xl mt-2 ">{error}</p>}
            <div className="flex  gap-4">
            <button className="bg-zinc-700 text-white hover:bg-zinc-900 mt-2 px-6 py-2 rounded-md max-w-max text-2xl font-semibold">Register</button>
            </div>
            <p>Already have an acoount <Link className="underline text-purple-800" href={'/p/login'}>Login</Link></p>
        </div>
        </form>
    )
}

export default register 