import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function LoginPage() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            console.log(" Token topildi, admin sahifaga yo‘naltirilmoqda...");
            navigate('/admin');
        }
    }, [navigate]);

    const Login = async () => {
        if (!phone || !password) {
            toast.error("Telefon raqam va parolni kiriting!");
            return;
        }

        console.log("📤 Yuborilayotgan ma'lumot:", { phone, password });

        try {
            const response = await axios.post(
                'https://api.fruteacorp.uz/auth/signin',
                { phone, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log(" Server javobi:", response.data);

            // Tokenni olish
            const token = response.data?.data?.accessToken?.token;

            if (token) {
                localStorage.setItem('accessToken', token);
                toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
                navigate('/admin');
            } else {
                toast.error("Token olinmadi, tizimga kira olmaysiz.");
            }
        } catch (error) {
            console.error(" Xatolik yuz berdi:", error.response?.data || error.message);

            if (error.response?.status === 401) {
                toast.error("Login yoki parol noto‘g‘ri!");
            } else {
                toast.error("Server xatosi! Keyinroq urinib ko‘ring.");
            }
        }
    };

    return (
        <section className="antialiased bg-gray-200 text-gray-900 font-sans">
            <div className="flex items-center h-screen w-full">
                <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                    <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
                    <div className="mb-4 md:w-full">
                        <label htmlFor="tel" className="block text-xs mb-1">Phone</label>
                        <input
                            type="text"
                            size="30"
                            name="tel"
                            className="w-full border rounded p-2 outline-none focus:shadow-outline"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-6 md:w-full">
                        <label htmlFor="password" className="block text-xs mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border rounded p-2 outline-none focus:shadow-outline"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
                        onClick={Login}
                    >
                        Login
                    </button>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
