"use client"
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { FaPencilAlt } from "react-icons/fa";
import {useRouter} from 'next/navigation'
import axios from 'axios';

function Listpets() {

const [pets, setPets] = useState([])
const router = useRouter();

const infoMascota = (pet) =>{
    router.push(`/mascotainfo/${pet.id}`)
}

const deleteMascota = async(id)=>{
    const response = await axios.delete(`/api/mascota/${id}`)
    if(response.status === 200){
        alert('Mascota eliminada')
        listarPets();
    }
}

const updateMascota = (pet) => {
    router.push(`/actualizarpet/${pet.id}`)
}

const listarPets = async () => {
    const response = await axios.get('/api/mascota');
    setPets(response.data)
  };

useEffect(()=>{
    listarPets();
}, [])

  return (
    <div className='overflow-auto mt-3 h-[80%] pr-4'>
        {pets.map(pet => (
            <div key={pet.id} className='flex justify-between items-center bg-gray-200 hover:bg-gray-300 p-4 my-3 rounded-xl'>
                <div className='flex items-center gap-4'>
                    <img className='h-[65px] w-[65px] bg-white rounded-full' src={pet.photo}  alt={`${pet.name}`}  />
                    <div>
                        <p className='font-bold'>{pet.name}</p>
                        <p className='text-[0.8em]'>{pet.fk_race.name}</p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={()=>{infoMascota(pet)}} className='h-[35px] w-[35px] flex justify-center items-center rounded-full bg-blue-700 hover:bg-blue-600 text-white text-xl' ><ImSearch/></button>
                    <button onClick={()=>{updateMascota(pet)}} className='h-[35px] w-[35px] flex justify-center items-center rounded-full bg-blue-700 hover:bg-blue-600 text-white text-xl' ><FaPencilAlt/></button>
                    <button onClick={()=>{deleteMascota(pet.id)}} className='h-[35px] w-[35px] flex justify-center items-center rounded-full bg-red-600 hover:bg-red-500 text-white text-xl' ><AiFillDelete/></button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Listpets