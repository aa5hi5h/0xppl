"use client"
import { useSession } from "next-auth/react";
import { M_PLUS_Code_Latin } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface POST{
  id: string
  title: string
  description: string
}
export default function Home() {

    const {data:session} = useSession()

  const [post,setPost] = useState<POST[]>([])

  useEffect(() => {
    const getPost = async() => {
      const response = await fetch('/api/getUserPost',{
        method:"GET"
      })
      const data = await response.json()
      setPost(data)
    }
    getPost()
  },[])
  if(session?.user){
    return (
        <div className="mt-16 mx-8">
          { post.length === 0 && <p className="text-xl font-medium ">there are no post please <Link className="underline text-purple-800" href={'/p/create'}>Create</Link> post</p>}
          <ul className="flex max-w-xl flex-col gap-4">
          {post?
           post.map((data:POST) => (
            <div className="bg-sky-500 px-2 rounded-lg hover:bg-cyan-600" key={data.id}>
              <Link href={`/p/post?id=${data.id}`}>
              <li className="text-4xl py-1 font-semibold">{data.title}</li>
              <li className="text-2xl py-1 font-semibold">{data.description}</li>
              </Link>
            </div>
          )):(<p>No Post found</p>)}
          </ul>
        </div>
      );
  }else{
    return(
    <p className="text-xl font-medium mt-16 mx-auto">this place is empty please <Link className="underline text-purple-800" href={'/p/login'}>Login</Link> to start adding to the list</p>
    )
}
}
