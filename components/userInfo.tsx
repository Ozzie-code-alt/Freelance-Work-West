"use client"
import Globaldrawer from "@/components/drawer";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const UserInfo = () => {
    const {data:session} = useSession()
  return (
    <div className="border flex border-yellow-500 w-full">
    <div className="border border-blue-500 w-full h-auto">
        <h1>Welcome Back</h1>
        <div>
            <span className="font-bold">{session?.user?.name}</span>
        </div>
    </div>
    <div className="border flex justify-end items-end border-blue-500 w-full h-auto">

      <Globaldrawer route="/" />
     
    </div>  
  </div>
  )
}

export default UserInfo