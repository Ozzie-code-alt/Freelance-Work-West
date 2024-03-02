import { connectMongo } from "@/lib/connection";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"


export const authOptions = {
    providers: [
        CredentialsProvider({
            name:"credentials",
            credentials:{},
            async authorize(credentials){
                const {email, password} = credentials
                try {
                    const res = await connectMongo()
                    const user = await User.findOne({email}) 

                    if(!user){
                        return null
                    }
                    
                  const passwordMatch =  await bcrypt.compare(password, user.password)
                  if(!passwordMatch){
                    return null
                  }


                  return user
                } catch (error) {
                    console.log("Error:", error)
                }
            }
        }) 
    ],


    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/",
    },
} 


const handler = NextAuth(authOptions)


export {handler as GET, handler as POST}