import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const prisma = new PrismaClient();

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Correo' },
                password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
            },
            async authorize(credentials, req){
                // console.log(credentials);
                
                const userFound = await prisma.users.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!userFound) throw new Error('Usuario no encontrado')

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

                if(!matchPassword) throw new Error('Contraseña incorrecta')

                

                return {
                    id: userFound.id,
                    name: userFound.fullname,
                    email: userFound.email,
                }
                
            }
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if(url.startsWith("/")) return `${baseUrl}${url}`;
            else if(new URL(url).origin === baseUrl) return url;
            return baseUrl;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }