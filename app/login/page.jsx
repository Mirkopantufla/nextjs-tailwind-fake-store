"use client"
import React, { useContext } from 'react'
import { GlobalContext } from '@/context/GlobalContext';
import { baseURL } from '@/utils/paths';
import Link from 'next/link'
import IsAuth from '@/components/IsAuth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

//LOGIN PAGE
const LoginPage = () => {

    const { actions } = useContext(GlobalContext)
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault()

        const email = e.target.email.value;
        const password = e.target.password.value;

        const options = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const respJson = await fetch(`${baseURL}/login`, options)
        const data = await respJson.json();

        if (data?.status === 200) {
            toast.success("Logeado correctamente", { autoClose: 3000 })

            // AQUI DEBO PONER LA INSERSION DE DATOS EN EL GLOBAL CONTEXT
            actions.saveLoginFetchData(data.data.access_token, data.data.user);
            console.log(data)

            router.push('/products')
        } else if (data?.status === 400) {
            toast.warning(data.warning)
        } else if (data?.status === 401) {
            toast.error(data.error)
        }
    }


    return (
        <div className='flex justify-center items-center min-h-[80vh]'>
            <form
                className='form-control border-2 rounded-lg border-neutral items-center p-10 gap-4 min-w-[30vw]'
                onSubmit={onSubmit}>
                <h1 className='text-4xl text-center'>Iniciar Sesión</h1>
                <div className='divider border-white before:bg-neutral after:bg-neutral' />
                <label placeholder='Your User' className='label'>Username</label>
                <input
                    className='input input-bordered w-full max-w-xs text-center'
                    placeholder='correo@correo.cl'
                    type="email"
                    name="email"
                    id="email"
                />
                <label className='label'>Constraseña</label>
                <input
                    className='input input-bordered w-full max-w-xs text-center'
                    placeholder='********'
                    type="password"
                    name="password"
                    id="password"
                />
                <label className='flex justify-between' htmlFor="">
                    No tienes cuenta?
                    <Link className='link link-accent ms-10' href={'/login/register'}>
                        Registrate!
                    </Link>
                </label>
                <button className='btn btn-primary'>Login</button>
            </form>
        </div>
    )
}

export default IsAuth(LoginPage)