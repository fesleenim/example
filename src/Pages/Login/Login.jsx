import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Login() {
     const { register, handleSubmit} = useForm();
     const navigate = useNavigate()
     const onSubmit = (data) => {
        axios({
            url:"https://api.fruteacorp.uz/auth/signin",
            method:'POST',
            data:data,
        }).then((res)=>{
            localStorage.setItem('token' , res.data.data.accessToken.token)
            navigate('/admin')
        })
     }
  return (
    <div>
         <input className='border-amber-400' type="text" {...register("phone")} placeholder='njk' />
            <input className='border-amber-400' type="text" {...register("password")}  placeholder='hgbh'/>
            <button onClick={handleSubmit(onSubmit)}>login</button>
    </div>
  )
}

export default Login