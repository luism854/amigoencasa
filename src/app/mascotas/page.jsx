"use client"
import React from 'react'
import "../globals.css";
import Listpets from '@/components/Listpets';
import { signOut } from 'next-auth/react'

import { IoBackspaceSharp  } from "react-icons/io5";
import Link from 'next/link';

function page() {

  return (
    <div className='w-full h-screen flex justify-center items-center bg-blue-200'>
        <div className='w-[98%] h-[90%] bg-blue-800 p-6 rounded-[25px]'>
            <div className='flex flex-col items-end'>
                <div className='flex items-center w-full h-[auto] mb-5'>
                    <p className='w-full flex justify-center font-bold text-2xl text-white'>Administrar Mascotas</p>
                    <button onClick={() => signOut({ callbackUrl: "/login" })} className='hover:bg-blue-700 flex items-center justify-center h-[40px] w-[40px] rounded-full text-white text-3xl'><IoBackspaceSharp/></button>
                </div>
                <Link href="/registrarpet" className='flex justify-center items-center rounded-full h-10 w-32 bg-green-500 hover:bg-green-400 text-white gap-1'>
                    <p className='text-2xl'>+</p>
                    <p className='font-bold'>Adicionar</p>
                </Link>
            </div>
            <Listpets />
        </div>
    </div>
  )
}

export default page