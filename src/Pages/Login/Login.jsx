import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const onSubmit = (data) => {
        axios({
            url: "https://api.fruteacorp.uz/auth/signin",
            method: 'POST',
            data: data,
        }).then((res) => {
            localStorage.setItem('token', res.data.data.accessToken.token)
            navigate('/admin')
        })
    }
    return (
        <>
            <div className="antialiased bg-gray-200 text-gray-900 font-sans">
                <div className="flex items-center h-screen w-full">
                    <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                        <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
                        <form className="mb-4"  method="post">
                            <div className="mb-4 md:w-full">
                                <label htmlFor="phone" className="block text-xs mb-1">Phone number</label>
                                <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="text" name="phone" id="phone" placeholder="Phone Number" {...register("phone")} />
                            </div>
                            <div className="mb-6 md:w-full">
                                <label htmlFor="password" className="block text-xs mb-1">Password</label>
                                <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="text" name="password" id="password" placeholder="Password" {...register("password")} />
                            </div>
                            <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" onClick={handleSubmit(onSubmit)}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login