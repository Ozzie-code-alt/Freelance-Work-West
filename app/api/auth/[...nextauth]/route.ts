import { connectMongo } from '@/lib/connection';
import User from '@/models/user';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        try {
          await connectMongo();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }

          // Include the role in the returned user object
          return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role 
          };
        } catch (error) {
          console.log('Error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
    updateAge: 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/Errorpage'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Include role in the JWT token
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Include role in the session
        session.user.role = token.role;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
