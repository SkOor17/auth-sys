"use client";
import { login } from "@/app/lib/user";
import React, { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(formData.email, formData.password);
    if (response && response.status === 200) {
      location.href = "/dashboard";
    } else {
      console.error("Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-[250px] flex flex-col gap-4'
    >
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700'
        >
          email
        </label>

        <input
          type='text'
          id='email'
          name='email'
          onChange={handleChanges}
          className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-3 py-2'
        />
      </div>

      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700'
        >
          password
        </label>

        <input
          type='text'
          id='password'
          name='password'
          onChange={handleChanges}
          className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-3 py-2'
        />
      </div>

      <button
        type='submit'
        className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
      >
        Login
      </button>
    </form>
  );
}
