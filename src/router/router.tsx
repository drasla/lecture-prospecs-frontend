import { createBrowserRouter, redirect } from "react-router";
import Layout from "../layouts/Layout.tsx";
import Home from "../pages/Home.tsx";
import Register from "../pages/Register.tsx";
import Login from "../pages/Login.tsx";
import useAuthStore from "../store/useAuthStore.ts";

const guestOnlyLoader = () => {
    // useAuthStore는 훅이라 리액트 컴포넌트에서만 사용 가능함.
    // 이외의 장소에서 사용하기 위해서는 getState()를 통해 사용 해야 함.
    const isLoggedIn = useAuthStore.getState().isLoggedIn;
    if (isLoggedIn) {
        return redirect("/");
    }

    return null;
};

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login />, loader: guestOnlyLoader },
            { path: "register", element: <Register />, loader: guestOnlyLoader },
            { path: "cart", element: <div className="pt-20 text-center">장바구니 페이지</div> },
        ],
    },
]);

export default router;
