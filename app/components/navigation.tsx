
import { getServerSession } from "next-auth"
import Link from "next/link"
import { authOption } from "../api/auth/[...nextauth]/route"
import { signOut } from "next-auth/react"
import SignOut from "./Signout"


const Navbar = async() => {
    const session  = await getServerSession(authOption)

    return(
        <div>
            <ul className="flex justify-between mt-4 ">
                <div><Link className="flex text-4xl font-bold" href={'/'}>0xppl</Link></div>
                <div className="flex text-2xl font-semibold mt-1 gap-4">
                    <Link href={'/p/blog'}>Blog</Link>
                    <Link href={'/p/create'}>Create</Link>
                    <Link href={'/p/edit'}>Edit</Link>
                    <Link href={'/p/features'}>Features</Link>
                    <Link href={'/p/about'}>About</Link>
                    {session?.user ? (
                        <SignOut />
                    ) : (<Link href={'/p/login'}>Login</Link>)}
                    
                </div>
            </ul>
        </div>
    )
}

export default Navbar