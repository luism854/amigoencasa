"use client"
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import "../globals.css";

function page() {
const { register, handleSubmit, formState: {errors} } = useForm();
const router = useRouter();

const onSubmit = handleSubmit(async (data)=>{
  // console.log(data);
  const res = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false
  })

  if(res.error){
    alert(res.error);
  }else{
    router.push('/mascotas')
  }
})

  return (
    <div className='w-full h-screen flex justify-center items-center bg-blue-200'>
        <div className='container-login w-[360px] h-[640px] flex flex-col justify-end rounded-[30px] p-3'>
            <form onSubmit={onSubmit} className='flex flex-col gap-3'>
              <div className='flex flex-col'>
                  <input
                      type="email"
                      placeholder='Correo electronico'
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email es requerido"
                        }
                      })}
                      className='px-4 py-[10px] rounded-[50px] bg-white bg-opacity-60 placeholder-blue-400 outline-none'
                    />
                    {errors.email && (
                      <span className='text-red-500 text-xs pl-4'>
                        {errors.email.message}
                      </span>
                    )}
                </div>
                <div className='flex flex-col'>
                    <input
                      type="password"
                      placeholder='Contraseña'
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Contraseña es requerida"
                        }
                      })}
                      className='px-4 py-[10px] rounded-[50px] bg-white bg-opacity-60 placeholder-blue-400 outline-none'
                    />
                    {errors.password && (
                      <span className='text-red-500 text-xs pl-4'>
                        {errors.password.message}
                      </span>
                    )}
                </div>
                <button className='bg-blue-800 hover:bg-blue-700 py-[10px] rounded-full text-white text-[1em]'>Ingresar</button>
            </form>
        </div>
    </div>
  )
}

export default page