"use client"
import React, { useState, useEffect } from 'react'
import "../globals.css";
import Listpets from '@/components/Listpets';
import { signOut } from 'next-auth/react'
import axios from 'axios';

import { IoBackspaceSharp  } from "react-icons/io5";
import Link from 'next/link';

function page() {

const [racesCount, setRacesCount] = useState([]);

const fetchPetsAndCountByRace = async () => {
    try {
        const response = await axios.get('/api/mascota');
        const petsData = response.data;
        const raceCountMap = new Map();
        petsData.forEach(pet => {
            const raceName = pet.fk_race.name;
            if (raceCountMap.has(raceName)) {
                raceCountMap.set(raceName, raceCountMap.get(raceName) + 1);
            } else {
                raceCountMap.set(raceName, 1);
            }
        });
        const raceCountArray = Array.from(raceCountMap, ([race, count]) => ({ race, count }));
        setRacesCount(raceCountArray);
    } catch (error) {
        console.error('Error fetching pets:', error);
    }
};

useEffect(()=>{
    fetchPetsAndCountByRace();
},[])

  return (
    <div className='w-full h-screen flex justify-center items-center bg-blue-200'>
        <div className='w-[450px] h-[90%] bg-blue-800 p-6 rounded-[25px]'>
            <div className='flex flex-col items-end'>
                <div className='flex items-center w-full h-[auto] mb-5'>
                    <p className='w-full flex justify-center font-bold text-2xl text-white'>Administrar Mascotas</p>
                    <button onClick={() => signOut({ callbackUrl: "/login" })} className='hover:bg-blue-700 flex items-center justify-center h-[40px] w-[40px] rounded-full text-white text-3xl'><IoBackspaceSharp/></button>
                </div>
                <Link href="/registrarpet" className='flex justify-center items-center rounded-full h-10 w-32 bg-green-500 hover:bg-green-400 text-white gap-1'>
                    <p className='text-2xl'>+</p>
                    <p className='font-bold'>Adicionar</p>
                </Link>
                <div className='w-[100%] h-[auto] bg-white'>
                        <p className='text-bold'>Razas:</p>
                        <ul className=''>
                            {racesCount.map((race, index) => (
                                <li key={index}>{race.race}: {race.count}</li>
                            ))}
                        </ul>
                </div>
            </div>
            <Listpets />
        </div>
    </div>
  )
}

export default page