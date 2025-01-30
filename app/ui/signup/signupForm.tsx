"use client"

import { signup } from '@/app/lib/user'
import React, { useState } from 'react'

export default function SignupForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      })

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
        ...formData,
        [name]: value
        })
    }

    return (
        <section className="bg-white">
        <div className="flex justify-center">
            <main
            className="lg:col-span-7 xl:col-span-6"
            >
            <div className="max-w-xl lg:max-w-3xl">

                <form 
                    action={async () => {
                        signup(formData.first_name, formData.last_name, formData.email, formData.password, formData.password_confirmation)
                    }} 
                    className="mt-8 grid grid-cols-6 gap-6"
                >
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                    First Name
                    </label>

                    <input
                    type="text"
                    id="FirstName"
                    name="first_name"
                    onChange={handleChanges}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                    </label>

                    <input
                    type="text"
                    id="LastName"
                    name="last_name"
                    onChange={handleChanges}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
                    />
                </div>

                <div className="col-span-6">
                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                    <input
                    type="email"
                    id="Email"
                    name="email"
                    onChange={handleChanges}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                    <input
                    id="Password"
                    name="password"
                    onChange={handleChanges}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                    Password Confirmation
                    </label>

                    <input
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    onChange={handleChanges}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
                    />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                    Create an account
                    </button>
                    <div className="flex flex-col w-full justify-center">
                        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                            Already have an account?
                        </p>
                        <a href="/login" className="text-gray-700 underline">Log in</a>
                    </div>
                </div>
                </form>
            </div>
            </main>
        </div>
        </section>
  )
}
