import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export async function POST(request){
    try {
        const { fullname, email, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.users.create({
            data: {
                fullname,
                email,
                password: hashedPassword
            }
        })
        // const {password: _, ...user} = newUser
        return NextResponse.json(
            {
                message: 'Usuario registrado con exito', newUser
            },
            {
                status: 200
            }
        )
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message
            },
            {
                status: 500
            }
        )
    }
}