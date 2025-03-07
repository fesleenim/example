import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Drawer, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { IoExitOutline } from "react-icons/io5";
import { BiCategoryAlt } from 'react-icons/bi';


function Layout() {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar (Drawer) */}
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        backgroundColor: '#f4f6f8',
                        padding: '20px',
                    },
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: 3, fontWeight: 'bold' }}>Admin Panel</Typography>
                <NavLink
                    to="/"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <BiCategoryAlt className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Banner
                        </button>
                    )}
                </NavLink>
            </Drawer>


            {/* Main content area */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100vh' }}>
                {/* AppBar */}
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Admin Panel
                        </Typography>
                        <button className=" text-white px-5 py-2 rounded-lg  " onClick={Logout}>
                        <IoExitOutline className='text-3xl'/>
                        </button>
                    </Toolbar>
                </AppBar>

                {/* Content Area */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', padding: 3, marginTop: '64px', bgcolor: '#0u9u4' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;
