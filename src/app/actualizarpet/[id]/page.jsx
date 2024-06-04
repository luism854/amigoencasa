"use client"
import React, { useState, useEffect } from 'react'
import { IoBackspaceSharp  } from "react-icons/io5";
import axios from 'axios';

function page({params}) {

  const [pet, setPet] = useState({})
  const { id } = params;

const consultarPet = async() =>{
  try {
    await axios.get(`/api/mascota/${id}`)
    .then(response=>{
        setPet(response.data)
    })
  } catch (error) {
    return console.log(error)
  }
}

  const [race, setRace] = useState([]);
  const [category, setCategory] = useState([]);
  const [gender, setGender] = useState([]);
  const [file, setFile] = useState(null)
  
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

  const getGenders = async() =>{
    await axios.get('/api/gender')
    .then(response => {
      setGender(response.data)
    })
    console.log(gender)
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
  
          const res = await axios.put(`/api/mascota/${id}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          if(res.status === 200){
              alert('Mascota actualizada');
          }
        } catch (error) {
          console.error('EL error es', error);
        }
  }

useEffect(()=>{
  consultarPet();
  getRaces();
  getCategories();
  getGenders();
}, [])

  return (
    <div className='w-full h-screen flex justify-center items-center bg-blue-200'>
      <div className='bg-blue-800 w-[360px] h-[640px] flex flex-col justify-between rounded-3xl px-5'>
          <div className='w-full flex items-center pt-8'>
            <h1 className='text-white text-[1.2em] w-full'>Modificar Mascota</h1>
            <button onClick={getGenders} className='hover:bg-blue-700 flex items-center justify-center h-[40px] w-[40px] rounded-full text-white text-3xl'><IoBackspaceSharp/></button>
          </div>
          <div className='w-full flex justify-center mb-[15%]'>
              {pet.photo ? 
                  <img className='h-[110px] w-[110px] rounded-full border-4 border-blue-400' src={`/img/${pet.photo}`} alt={`${pet.name}`}/>
                  :
                  <div className='bg-white h-[110px] w-[110px] flex justify-center items-center text-[60px] rounded-full border-4 text-blue-400 border-blue-400'>
                      img
                  </div>
              }
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <input type="text" placeholder='Nombre' name='name' value={pet.name} onChange={handleChange} className='px-4 py-[12px] rounded-[50px] bg-white bg-opacity-60 placeholder-gray-500 outline-none'/>
              <select  className='px-4 py-[14px] rounded-[50px] bg-white bg-opacity-60 outline-none' name='race_id' value={pet.fk_race && pet.fk_race.id} onChange={handleChange} >
                <option value="" disabled className='text-gray-500 p-2'>Seleccione Raza...</option>
                {race.map(rac=>(
                    <option value={rac.id} key={rac.id} className='text-black p-2'>{rac.name}</option>
                ))}
              </select>
              <select name='category_id' value={pet.fk_category && pet.fk_category.id} onChange={handleChange} className='px-4 py-[14px] rounded-[50px] bg-white bg-opacity-60 outline-none' >
                  {category.map(categor =>(
                    <option value={categor.id} key={categor.id} className='text-gray-500 p-2'>{categor.name}</option>
                  ))}
              </select>
              <div className='relative'>
                <input type="file" className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' name='photo' onChange={(e) => setFile(e.target.files[0])} />
                <button type="button" className='w-full flex justify-between px-4 py-[12px] rounded-[50px] bg-white bg-opacity-60 placeholder-gray-500 outline-none'>
                  {pet.photo ? pet.photo : 'Subir Foto'}
                  <p>icon</p>
                </button>
              </div>
              <select name="gender_id" value={pet.fk_gender && pet.fk_gender.id} onChange={handleChange} className='px-4 py-[14px] rounded-[50px] bg-white bg-opacity-60 outline-none'>
                  {gender.map(gend =>(
                    <option value={gend.id} key={gend.id} className='text-gray-500 p-2'>{gend.name}</option>
                  ))}
              </select>
              <button className='bg-green-600 hover:bg-green-700 py-[10px] rounded-full text-white text-[1em] mb-4'>Actualizar</button>
          </form>
      </div>
    </div>
  )
}

export default page