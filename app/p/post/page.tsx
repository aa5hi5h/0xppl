"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"


interface PostProp{
    id: string
    title: string
    description: string
    UserEmail: string
}
const page = () => {
    const {data: session} = useSession()
    const [post,setPost] = useState<PostProp | undefined>(undefined)
    const searchParams = useSearchParams()
    const PostID = searchParams.get('id')
    const router = useRouter()

    useEffect(() => {
        const getPost = async() => {
            const response = await fetch(`/api/post/${PostID}`,{
                method:"GET"
            })
            const data = await response.json()
            setPost(data)
        }
        getPost()
    },[PostID])

    const handleDelete =async(PostData: PostProp) => {
        const response = await fetch(`/api/post/${PostData.id}`,{
            method:"DELETE`"
        })
        if(response.ok){
            alert("Post deleted")
            router.push('/')
        }

    }
    return(
        <div className="flex flex-col mx-8 mt-16" >
            {post? 
            (
            <div>
                <h1 className="text-4xl font-bold ">{post.title}</h1>
                <div className="flex mt-2 mb-2 gap-4">{
                    post.UserEmail === session?.user?.email ? (
                        <div>
                            <Link className="text-xl text-white   rounded-md px-6 py-2 max-w-max bg-zinc-700 hover:bg-zinc-950" href={`/p/edit?id=${post.id}`}>Edit</Link>
                    <button onClick={() => handleDelete(post)} className="text-xl text-white rounded-md px-6 py-2 max-w-max bg-rose-500 hover:bg-rose-700">Delete</button>
                        </div>
                    ) : (<p></p>)
                    
                }
                </div>
                <h1 className="text-2xl font-semibold mt-6 mb-4">{post.description}</h1>           
            </div>
                ): (<p>errorororoororor</p>)}

        </div>
    )
}

export default page