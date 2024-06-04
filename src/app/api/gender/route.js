import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    const response = await prisma.genders.findMany();
    if(response.length > 0){
        return new Response(JSON.stringify(response),
        {headers:{'Content-type': 'application/json'},
        status: 200
    })
    }else{
        return NextResponse.json(
            {
                message: 'El genero se ha registrado con exio', response
            },
            {
                status: 404
            }
        )
    }
}

export async function POST(request){
    const { name } = await request.json();
    const newGender = await prisma.genders.create({
        data:{
            name
        }
    })
    return NextResponse.json(
        {
            message: 'El genero se registró con exito', newGender
        },
        {
            status: 200
        }
    )
}