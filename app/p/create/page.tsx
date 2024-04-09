"use client"
import ReactTextareaAutosize from "react-textarea-autosize"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOption } from "@/app/api/auth/[...nextauth]/route"
import { useSession } from "next-auth/react"
import Link from "next/link"
const create = () => {

    const {data: session} = useSession()

    const router = useRouter()
    const[title,setTitle] = useState('')
    const[description,setDescription] = useState('')
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!title || !description ){
            alert("Please fill in  all the details")
        }
        const response = await fetch('/api/create',{
            method:"POST",
            headers:{
                "content-type": "Application/json"
            },
            body:JSON.stringify({title,description})
        }
    )
    const data = await response.json()
        if(response.ok){
            setTitle("")
            setDescription('')
            alert('post created')
            router.push(`/p/post?id=${data.post.id}`)
        }
    }
    if(session?.user){
        return(
            <div>
                <form className="flex flex-col gap-2 max-w-lg mt-16 mx-8 " onSubmit={handleSubmit}>
                    <label className="text-3xl font-semibold">Title</label>
                    <input className="text-2xl outline-none  outline-zinc-950 px-2 py-2 rounded-md border-2 " placeholder="Title...." 
                    value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <label className="text-3xl font-semibold mt-4">Description</label>
                    <ReactTextareaAutosize className="text-2xl outline-none px-2 py-2 outline-zinc-800 rounded-md hover:outline-zinc-950" minRows={5} placeholder='Description....'
                    value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button className="text-2xl text-white rounded-md px-4 py-2 max-w-max bg-zinc-800 hover:bg-zinc-950 mt-2 mb-4">Create Post</button>
                </form>
    
    
            </div>
        )
    }else{
        return(
            <h1 className="text-4xl mt-12 mx-auto font-medium">please <Link className="underline text-purple-900" href={'/p/login'}>login</Link> to view this page </h1>
        )
    }
    
}

export default create