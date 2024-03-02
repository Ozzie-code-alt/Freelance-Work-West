import { connectMongo } from "@/lib/connection";
import User from "@/models/user";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // It's safe to assert credentials here because we know what fields our form submits
                const email = credentials?.email ?? '';
                const password = credentials?.password ?? '';
                
                try {
                    await connectMongo();
                    const user = await User.findOne({ email });

                    if (!user) {
                        throw new Error('No user found with the email');
                    }
                    
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        throw new Error('Password does not match');
                    }

                    // The object returned here is passed as the user object to the JWT creation step and session callbacks
                    return user;
                } catch (error) {
                    console.error("Error in credentials authorize:", error);
                    return null;
                }
            }
        }) 
    ],

    session: {
        strategy: "jwt" // Explicitly set to "jwt", matching the SessionStrategy type
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/", // Your custom sign-in page
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
