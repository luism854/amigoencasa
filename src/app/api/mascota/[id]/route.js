import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises'
import path from "path";

const prisma = new PrismaClient();

export async function DELETE(request, {params}){
    try {
        let idPet = Number(params.id);
        const response = await prisma.pets.delete({ where: {id:idPet} })
        return new Response(JSON.stringify({ message: 'Mascota eliminada', response }),
        {headers:{'Ccontent-Type': 'application/json'},
        status:200
        })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'No se registró el producto' }),
        {headers:{'Content-Type': 'application/json'},
        status: 500
        })
    }
}

export async function PUT(request, {params}){
    try {
        let idPet = Number(params.id);
        const data = await request.formData();
        const photofile = data.get("photo")

        if(photofile.name){
            const bytes = await photofile.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const filePath = path.join(process.cwd(), 'public/uploads', photofile.name)
            await writeFile(filePath, buffer)
        }

        const newPet = await prisma.pets.update({
            where: {
                id: idPet
            },
            data: {
                name: data.get("name"),
                race_id: parseInt(data.get("race_id")),
                category_id: parseInt(data.get("category_id")),
                photo: photofile.name ? `/uploads/${photofile.name}` : photofile,
                gender_id: parseInt(data.get("gender_id"))
            }
        })
        return NextResponse.json(
            {
                message: 'Mascota actualizada', newPet
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error.message,
        },
        {
            status: 500,
        })
    }
}

export async function GET(request, {params}){
    let idPet = Number(params.id);
    const response = await prisma.pets.findUnique({
        where: {id:idPet},
        include: {
            fk_race: true,
            fk_category: true,
            fk_gender: true
        }
    })
    if(response){
        return new Response(JSON.stringify(response),
        {headers:{'Content-Type': 'application/json'},
        status: 200
        });
    }else{
        return new Response(JSON.stringify({ message: 'No hay mascotas' }),
        {headers:{'Content-Type': 'application/json'},
        status: 404
        })
    }
}