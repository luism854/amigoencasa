import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    const response = await prisma.categories.findMany();
    if(response.length>0){
        return new Response(JSON.stringify(response),
        {headers:{'Content-type': 'application/json'},
        status: 200
    })
    }else{
        return NextResponse.json(
            {
                message: 'No se encontraron categorias'
            },
            {
                status: 404
            }
        )
    }
}

export async function POST(request){
    const { name } = await request.json();
    const newCategory = await prisma.categories.create({
        data:{
            name
        }
    })
    return NextResponse.json(
        {
            message: 'Categoria registrada con exito', newCategory
        },
        {
            status: 200
        }
    )
}