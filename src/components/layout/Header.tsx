import { Link, useLocation } from "react-router";
import { IoSearch, IoCartOutline, IoMenu } from "react-icons/io5";
import useCartStore from "../../store/useCartStore";
import useLayoutStore from "../../store/useLayoutStore.ts";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

const GNB_MENU = [
    { name: "RUNNING", path: "/running" },
    { name: "SPORTS STYLE", path: "/sports-style" },
    { name: "HERITAGE", path: "/heritage" },
    { name: "SPORTS", path: "/sports" },
    { name: "ONE SPEC", path: "/onespec" },
    { name: "OUR STORY", path: "/story" },
];

const Header = () => {
    const { pathname } = useLocation(); // 현재 경로 확인

    const cartCount = useCartStore(state => state.cartCount);
    const { isTopBannerVisible, topBannerHeight } = useLayoutStore();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // 스크롤이 0보다 크면 true (내려감), 아니면 false (맨 위)
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHome = pathname === "/";
    const isTransparent = isHome && !isScrolled;

    return (
        <header
            className={twMerge(
                "fixed left-0 right-0 z-50 transition-all duration-300 border-b",
                isTransparent
                    ? "bg-transparent border-transparent text-white"
                    : "bg-white border-gray-100",
            )}
            // [핵심 로직] TopBanner 상태에 따라 sticky 위치 조정
            style={{ top: isTopBannerVisible ? `${topBannerHeight}px` : 0 }}>
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* 모바일 메뉴 */}
                <button className="lg:hidden text-2xl">
                    <IoMenu />
                </button>

                {/* 로고 */}
                <Link to="/" className="flex-shrink-0">
                    <span className="text-3xl font-black tracking-tighter italic">PROSPECS</span>
                </Link>

                {/* GNB (Desktop) */}
                <nav className="hidden lg:flex flex-1 justify-center gap-10 font-bold text-[15px] tracking-tight">
                    {GNB_MENU.map(menu => (
                        <Link
                            key={menu.name}
                            to={menu.path}
                            className="relative group py-7 hover:text-red-600 transition-colors">
                            {menu.name}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* 우측 아이콘 */}
                <div className="flex items-center gap-5 text-2xl">
                    {/* ... 검색창 및 아이콘 코드 (이전과 동일) ... */}
                    <div className="relative hidden md:block group">
                        <input
                            type="text"
                            placeholder="검색"
                            className={twMerge("w-40 border-b border-black text-sm py-1 focus:outline-none focus:w-60 transition-all",
                                isTransparent
                                ? "bg-transparent border-white text-white placeholder:text-white"
                                : "border-gray-100",
                            )}
                        />
                        <button className="absolute right-0 top-1 text-xl">
                            <IoSearch />
                        </button>
                    </div>
                    <Link to="/login" className="text-sm font-bold hidden md:block">
                        LOGIN
                    </Link>
                    <Link to="/cart" className="relative flex items-center gap-1">
                        <span className="text-sm font-bold hidden md:block">CART</span>
                        <IoCartOutline className="text-2xl" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
