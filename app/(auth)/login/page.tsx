import LoginForm from '@/app/ui/login/loginForm'
import React from 'react'

export default function Login() {
    

    return (
        <div className='h-screen w-full flex flex-col justify-center items-center gap-12'>
            <h1 className='text-6xl font-extrabold uppercase'>
                Login
            </h1>
            <LoginForm/>
        </div>
    )
}
