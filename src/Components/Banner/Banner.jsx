import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function Banner() {
    const [Banner, setBanner] = useState([]);
    const [loading, setLoading] = useState(true);
    const [titleUz, setTitleUz] = useState('');
    const [linkUz, setLinkUz] = useState('');
    const [images, setImages] = useState();
    const [selectedItem, setSelectdItem] = useState(null); // O'chirish uchun
    const [editingItem, setEditingItem] = useState(null); // Tahrirlash uchun
    const [showAddBannerModal, setShowAddBannerModal] = useState(false);
    const imgUrl = "https://api.fruteacorp.uz/images";

    // Tokenni olish
    const token = localStorage.getItem('accessToken');

    // Bannerlarni olish
    const getBanner = () => {
        setLoading(true);
        axios({
            url: 'https://api.fruteacorp.uz/banner',
            method: 'GET',
        }).then((res) => {
            setBanner(res.data.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Xatolik yuz berdi:", error);
            setLoading(false);
        });
    };

    useEffect(() => {
        getBanner();
    }, []);

    // Yangi yoki mavjud Bannerni qo'shish/tahrirlash
    const handleAddBanner = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", titleUz);
        formData.append("link", linkUz);
        formData.append("image", images);
    
        axios({
            url: editingItem ? `https://api.fruteacorp.uz/banner/${editingItem.id}` : 'https://api.fruteacorp.uz/banner',
            method: editingItem ? 'PATCH' : 'POST',  // PATCH tahrirlash uchun, POST yangi qo'shish uchun
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            toast.success(editingItem ? "Banner tahrirlandi" : "Banner qo'shildi!");
            setShowAddBannerModal(false);
            getBanner();
            setEditingItem(null);
    
            // 🔄 Inputlarni tozalash (faqat yangi Banner qo'shilganda)
            if (!editingItem) {
                setTitleUz('');
                setLinkUz('');
                setImages(null);
            }
        })
        .catch(error => {
            console.error("Xatolik:", error.response?.data || error);
            toast.error("Xatolik yuz berdi. Qayta urinib ko‘ring!");
        })
        .finally(() => {
            setLoading(false);
        });
    };
    


    // Tahrirlash uchun Banner
    const showEdit = (banner) => {
        setEditingItem(banner);
        setShowAddBannerModal(true);
        setTitleUz(banner.title);
        setLinkUz(banner.link);
        setImages(null);
    };

    // Modalni yopish
    const closeModal = () => {
        setShowAddBannerModal(false);
        setEditingItem(null);
    };

    // Bannerni o'chirish
    // Bannerni o'chirish
    const handleDelete = async (id) => {
        try {
            if (!token) {
                toast.error("Token mavjud emas");
                return;
            }
            // O'chirish
            setLoading(true);
            await axios.delete(`https://api.fruteacorp.uz/banner/${id}`, {
                headers: {
                    Authorization: `rer ${token}`,
                },
            });

            toast.success("Banner o‘chirildi");
            setSelectdItem(null);
            getBanner();
        } catch (error) {
            console.error("O‘chirishda xatolik:");
            toast.error(`Xatolik yuz berdi`);
        } finally {
            setLoading(false);
        }
    };





    return (
        <div className='p-5'>
            {loading ? (
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#000957]"></div>
                    <span className="ml-3 text-xl text-gray-700">Yuklanmoqda...</span>
                </div>
            ) : (
                <div className='w-full'>
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className='text-[#000957] font-medium text-xl'>Banner Lists</h1>
                        <button
                            onClick={() => setShowAddBannerModal(true)}
                            className="flex items-center text-[#000957] px-5 py-2 border-2 border-[#000957] rounded-lg"
                        >
                            <IoMdAdd className='text-[#000957] mr-2' />
                           Add
                        </button>

                    </div>
                    <hr className='bg-gray-100 h-0.5 mb-8' />
                    <table className="w-full border-collapse table-auto bg-white shadow-md rounded-lg">
                        <thead className="bg-[#3a6db5] text-white">
                            <tr>
                                <th className="border border-gray-300 p-3 text-left">Id</th>
                                <th className="border border-gray-300 p-3 text-left">Images</th>
                                <th className="border border-gray-300 p-3 text-left">Name</th>
                                <th className="border border-gray-300 p-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Banner.map((banner, index) => (
                                <tr key={banner.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="border border-gray-300 p-3">{index + 1}</td>
                                    <td className="border border-gray-300 p-3">
                                        <img
                                            src={`${imgUrl}/${banner.image}`}
                                            alt={banner.name}
                                            className="w-16 rounded-[50%] h-16 mx-auto"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-3">{banner.title}</td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <div className='flex items-center justify-evenly'>
                                            <button onClick={() => showEdit(banner)} className="text-[#000957] hover:text-[#000957]">
                                                <BorderColorIcon size={24} />
                                            </button>
                                            <button
                                                className="text-[#000957] hover:text-[#000957]"
                                                onClick={() => setSelectdItem(banner)}
                                            >
                                                <RiDeleteBin6Line size={24} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Yangi Banner qo‘shish va tahrirlash modali */}
            {showAddBannerModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">{editingItem ? "Bannerni tahrirlash" : "Banner qo'shish"}</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Banner nomi:</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setTitleUz(e.target.value)}
                                value={titleUz}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Banner linki:</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setLinkUz(e.target.value)}
                                value={linkUz}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Banner rasmi:</label>
                            <input
                                type="file"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setImages(e.target.files[0])}
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                disabled={loading}
                                onClick={handleAddBanner}
                                className="bg-[#000957] text-white px-5 py-2 rounded-lg"
                            >
                                {loading ? "Saqlanmoqda..." : editingItem ? "Saqlash" : "Qo‘shish"}
                            </button>
                            <button
                                onClick={closeModal}
                                className="ml-3 bg-gray-300 text-black px-5 py-2 rounded-lg"
                            >
                                Bekor qilish
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* O‘chirish tasdiqlash modali */}
            {selectedItem && (
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
                        <h2 className="text-xl font-semibold mb-4 text-center text-[#000957]">
                            Rostdan ham o‘chirmoqchimisiz?
                        </h2>
                        <div className="flex justify-between gap-4">
                            <button
                                disabled={loading}
                                onClick={() => handleDelete(selectedItem.id)}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                            >
                                {loading ? "O'chirilmoqda ..." : "Ha , o'chirish"}
                            </button>
                            <button
                                onClick={() => setSelectdItem(null)}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg transition"
                            >
                                Bekor qilish
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Banner;