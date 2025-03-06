import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Banner from "../Components/Banner/Banner";
import LoginPage from "../Pages/Login/Login";
import Layout from "../Components/Layout";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>Bunday sahifa mavjud emas!</div>,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/admin",
                element: <Layout />,
            },
            {
                path: "/",
                element: <Banner />,
            }
        ]
    }
]);
