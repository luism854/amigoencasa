"use client"
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { FaCamera } from "react-icons/fa";

function Petsform() {

const [race, setRace] = useState([]);
const [category, setCategory] = useState([]);
const [file, setFile] = useState(null)
const [pet, setPet] = useState({
    name: "",
    race_id: "",
    category_id: "",
    photo: "",
    gender_id: "",
})

const limpPet = () =>{
    setPet({
        name: "",
        race_id: "",
        category_id: "",
        photo: "",
        gender_id: "",
    })
}

const handleChange = (e) => {
  setPet({
      ...pet,
      [e.target.name]: e.target.value,
  })
}

const getRaces = async() =>{
    await axios.get('/api/raza')
    .then(response=>{
        setRace(response.data)
    })
}

const getCategories = async() =>{
    await axios.get('/api/category')
    .then(response => {
        setCategory(response.data)
    })
}

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const formData = new FormData();
        formData.append('name', pet.name)
        formData.append('race_id', pet.race_id)
        formData.append('category_id', pet.category_id)
        formData.append('photo', file)
        formData.append('gender_id', pet.gender_id)

        const res = await axios.post('/api/mascota', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if(res.status === 200){
            alert('Mascota registrada');
            limpPet();
            setFile(null);
        }
      } catch (error) {
        console.error('EL error es', error);
      }
}

useEffect(()=>{
    getRaces();
    getCategories();
}, [])
  return (
    <div>
        <div className='w-full flex justify-center mb-[15%]'>
            {file ? 
                <img className='h-[110px] w-[110px] rounded-full border-4 border-blue-400' src={URL.createObjectURL(file)} />
                :
                <div className='bg-white h-[110px] w-[110px] flex justify-center items-center text-[60px] rounded-full border-4 text-blue-400 border-blue-400'>
                    <FaCamera />
                </div>
            }
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <input type="text" placeholder='Nombre' className='px-4 py-[12px] rounded-[50px] bg-white bg-opacity-60 placeholder-gray-500 outline-none' name='name' value={pet.name} onChange={handleChange} />
            <select  className='px-4 py-[14px] rounded-[50px] bg-white bg-opacity-60 outline-none' name='race_id' value={pet.race_id} onChange={handleChange} >
              <option value="" disabled className='text-gray-500 p-2'>Seleccione Raza...</option>
              {race.map(rac=>(
                  <option value={rac.id} key={rac.id} className='text-black p-2'>{rac.name}</option>
              ))}
            </select>
            <select  className='px-4 py-[14px] rounded-[50px] bg-white bg-opacity-60 outline-none' name='category_id' value={pet.category_id} onChange={handleChange} >
              <option value="" className='text-gray-500 p-2'>Seleccione Categoria...</option>
              {category.map(categor =>(
                  <option value={categor.id} key={categor.id} className='text-black p-2'>{categor.name}</option>
              ))}
            </select>
            <div className='relative'>
                <input type="file" className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' name='photo' value={pet.photo} 
                onChange={(e)=>{
                    setFile(e.target.files[0])
                }}
                />
                <button type="button" className='w-full flex justify-between px-4 py-[12px] rounded-[50px] bg-white bg-opacity-60 placeholder-gray-500 outline-none'>
                  {pet.photo ? pet.photo : 'Subir Foto'}
                  <p>icon</p>
                </button>
            </div>
            <select  className='px-4 py-[14px] rounded-[50px] bg-white bg-opacity-60 outline-none' name='gender_id' value={pet.gender_id} onChange={handleChange} >
              <option value="" className='text-gray-500 p-2'>Seleccione Genero...</option>
              <option value="1" className='text-black p-2'>Masculino</option>
              <option value="2" className='text-black p-2'>Femenino</option>
            </select>
            <button className='bg-green-600 hover:bg-green-700 py-[10px] rounded-full text-white text-[1em] mb-4'>Guardar</button>
        </form>
    </div>
  )
}

export default Petsform