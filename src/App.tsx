import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import Layout from "./layouts/Layout.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    {/* 다른 페이지들도 여기에 추가하면 Layout이 자동 적용됨 */}
                    <Route
                        path="/login"
                        element={<div className="pt-20 text-center">로그인 페이지</div>}
                    />
                    <Route
                        path="/cart"
                        element={<div className="pt-20 text-center">장바구니 페이지</div>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
