"use client"
import axios from 'axios';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import { IoBackspaceSharp  } from "react-icons/io5";

function page({params}) {

const [pet, setPet] = useState({});

const consultarPet = async() =>{
    const { id } = params;
    await axios.get(`/api/mascota/${id}`)
    .then(response=>{
        setPet(response.data)
    })
}

useEffect(()=>{
    consultarPet();
}, [])

  return (
    <div className='w-full h-screen flex justify-center items-center bg-blue-200'>
        <div className='bg-blue-800 w-[360px] h-[640px] flex flex-col rounded-3xl px-5'>
            <div className='w-full flex items-center pt-8'>
                <h1 className='text-white text-[1.2em] w-full'>Información Mascota</h1>
                <Link href="/mascotas" className='hover:bg-blue-700 flex items-center justify-center h-[40px] w-[40px] rounded-full text-white text-3xl'><IoBackspaceSharp/></Link>
            </div>
            <div className='w-full flex justify-center my-20'>
                {pet.photo && (
                    <img
                    className='bg-white h-[110px] w-[110px] flex justify-center items-center text-[20px] rounded-full border-4 text-blue-400 border-blue-400' src={pet.photo} alt={`${pet.name}`}
                    />
                )}
            </div>
            <div className='flex flex-col gap-2 mb-6'>
                <div className='flex' >
                    <p className='h-[40px] p-2 bg-blue-500 text-white w-[150px] rounded-tl-lg rounded-bl-lg' >Nombre</p>
                    <p className='h-[40px] p-2 bg-blue-200 w-[100%] rounded-tr-lg rounded-br-lg' >{pet.name}</p>
                </div>
                <div className='flex' >
                    <p className='h-[40px] p-2 bg-blue-500 text-white w-[150px] rounded-tl-lg rounded-bl-lg'>Raza</p>
                    <p className='h-[40px] p-2 bg-blue-200 w-[100%] rounded-tr-lg rounded-br-lg'>{pet.fk_race && pet.fk_race.name}</p>
                </div>
                <div className='flex' >
                    <p className='h-[40px] p-2 bg-blue-500 text-white w-[150px] rounded-tl-lg rounded-bl-lg'>Perro</p>
                    <p className='h-[40px] p-2 bg-blue-200 w-[100%] rounded-tr-lg rounded-br-lg'>{pet.fk_category && pet.fk_category.name}</p>
                </div>
                <div className='flex' >
                    <p className='h-[40px] p-2 bg-blue-500 text-white w-[150px] rounded-tl-lg rounded-bl-lg'>Genero</p>
                    <p className='h-[40px] p-2 bg-blue-200 w-[100%] rounded-tr-lg rounded-br-lg'>{pet.fk_category && pet.fk_gender.name}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page