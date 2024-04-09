"use client"

import { signOut } from "next-auth/react"

const SignOut = () => {
    return (
                    <div>
                        <button className="bg-rose-400 text-white hover:bg-rose-700 mt-2 px-6 py-2 rounded-md max-w-max text-2xl font-semibold"
                        onClick={() => signOut()}>Logout</button>
                        </div>
    )
}

export default SignOut