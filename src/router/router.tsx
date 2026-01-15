import { createBrowserRouter, redirect } from "react-router";
import Layout from "../layouts/Layout.tsx";
import Home from "../pages/Home.tsx";
import Register from "../pages/Register.tsx";
import Login from "../pages/Login.tsx";
import useAuthStore from "../store/useAuthStore.ts";
import AdminLayout from "../layouts/AdminLayout.tsx";
import AdminCategoryList from "../pages/(admin)/categories/AdminCategoryList.tsx";
import AdminProductList from "../pages/(admin)/products/AdminProductList.tsx";
import AdminProductNew from "../pages/(admin)/products/AdminProductNew.tsx";
import AdminProductEdit from "../pages/(admin)/products/adminProductEdit.tsx";
import ProductListPage from "../pages/shop/ProductListPage.tsx";
import ProductDetailPage from "../pages/shop/ProductDetailPage.tsx";

const guestOnlyLoader = () => {
    // useAuthStore는 훅이라 리액트 컴포넌트에서만 사용 가능함.
    // 이외의 장소에서 사용하기 위해서는 getState()를 통해 사용 해야 함.
    const isLoggedIn = useAuthStore.getState().isLoggedIn;
    if (isLoggedIn) {
        return redirect("/");
    }

    return null;
};

const adminOnlyLoader = () => {
    const { isLoggedIn, user } = useAuthStore.getState();

    // 1단계: 로그인이 안 되어 있으면 로그인 페이지로 보냄
    if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        return redirect("/login");
    }

    // 2단계: 로그인은 됐는데 ADMIN이 아니면 홈으로 튕겨냄
    if (user?.role !== "ADMIN") {
        alert("관리자 접근 권한이 없습니다.");
        return redirect("/");
    }

    // 통과
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
            { path: "category/:id", element: <ProductListPage /> },
            { path: "product/:id", element: <ProductDetailPage /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        loader: adminOnlyLoader,
        children: [
            { index: true, element: <div></div> },
            { path: "categories", element: <AdminCategoryList /> },
            { path: "products", element: <AdminProductList /> },
            { path: "products/new", element: <AdminProductNew /> },
            { path: "products/:id", element: <AdminProductEdit /> },
        ],
    },
]);

export default router;
