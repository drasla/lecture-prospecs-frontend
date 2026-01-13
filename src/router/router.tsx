import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout.tsx";
import Home from "../pages/Home.tsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <div className="pt-20 text-center">로그인 페이지</div> },
            { path: "cart", element: <div className="pt-20 text-center">장바구니 페이지</div> },
        ],
    },
]);

export default router;
