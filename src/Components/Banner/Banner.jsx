import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function Banner() {
    const { register, handleSubmit, watch, setValue, reset } = useForm();
    const [banner, setBanner] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const BaseUrl = "https://api.fruteacorp.uz";
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            toast.error("Avtorizatsiya talab qilinadi!");
            return;
        }
        getBanner();
    }, []);

    const getBanner = () => {
        setLoading(true);
        axios.get(`${BaseUrl}/banner`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setBanner(res.data.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Xatolik yuz berdi:", error);
            toast.error("Ma'lumotlarni yuklashda xatolik!");
            setLoading(false);
        });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setValue("image", file);
    };

    const onSubmit = (data) => {
        if (!token) {
            toast.error("Avtorizatsiya talab qilinadi!");
            return;
        }

        const file = watch("image");
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("link", data.link);
        formData.append("image", file);

        axios({
            url: selectedItem ? `${BaseUrl}/banner/${selectedItem.id}` : `${BaseUrl}/banner`,
            method: selectedItem ? 'PATCH' : 'POST',
            data: formData,
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            toast.success(selectedItem ? "Banner yangilandi!" : "Banner qo‘shildi!");
            getBanner();
            reset();
            setSelectedItem(null);
        })
        .catch(error => {
            console.error("Xatolik yuz berdi:", error);
            toast.error("Xatolik yuz berdi!");
        });
    };

    const deleteBanner = async (id) => {
        if (!token) {
            toast.error("Avtorizatsiya talab qilinadi!");
            return;
        }
    
        if (!id) {
            toast.error("ID noto‘g‘ri!");
            return;
        }
    
        if (!window.confirm("Haqiqatan ham ushbu bannerni o‘chirmoqchimisiz?")) return;
    
        try {
            console.log("Yuborilayotgan ID:", id);  // ID tekshirish
            const response = await axios.delete(`${BaseUrl}/banner/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            console.log("Javob:", response); // Serverdan kelayotgan javobni ko‘rish
            toast.success("Banner o‘chirildi!");
            getBanner();
        } catch (error) {
            console.error("Xatolik:", error?.response?.data || error);
            toast.error(`Xatolik yuz berdi: ${error?.response?.status || ''}`);
        }
    };
    

    const showBanner = (banner) => {
        setValue('title', banner.title);
        setValue('link', banner.link);
        setSelectedItem(banner);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{selectedItem ? "Bannerni tahrirlash" : "Yangi banner qo‘shish"}</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-md flex flex-col gap-2">
                <input className="border p-2" type="text" {...register("title")} placeholder="Sarlavha" required />
                <input className="border p-2" type="text" {...register("link")} placeholder="Havola" required />
                <input className="border p-2" type="file" onChange={handleFile} required={!selectedItem} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {selectedItem ? "Tahrirlash" : "Qo‘shish"}
                </button>
            </form>

            <h2 className="text-xl font-bold my-4">Bannerlar</h2>

            {loading ? <p>Yuklanmoqda...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {banner.map((item, index) => (
                        <div key={index} className="border p-4 rounded shadow">
                            <img className="w-full h-40 object-cover mb-2" src={`${BaseUrl}/images/${item.image}`} alt={item.title} />
                            <h3 className="font-semibold">{item.title}</h3>
                            <div className="flex gap-2 mt-2">
                                <button 
                                    className="bg-blue-500 text-white p-2 rounded"
                                    onClick={() => showBanner(item)}
                                >
                                    Tahrirlash
                                </button>
                                <button 
                                    className="bg-red-500 text-white p-2 rounded"
                                    onClick={() => deleteBanner(item.id)}
                                >
                                    O‘chirish
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Banner;
