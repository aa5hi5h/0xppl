"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface POST{
  id: string
  title: string
  description: string
}
export default function Home() {

  const [post,setPost] = useState<POST[]>([])

  useEffect(() => {
    const getPost = async() => {
      const response = await fetch('/api/getPost',{
        method:"GET"
      })
      const data = await response.json()
      setPost(data)
    }
    getPost()
  },[])
  return (
    <div className="mt-16 mx-8">
      { post.length === 0 && <p>Loading....</p>}
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
}
