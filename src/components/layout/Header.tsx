import { Link, useLocation } from "react-router";
import { IoSearch, IoCartOutline, IoMenu } from "react-icons/io5";
import useCartStore from "../../store/useCartStore";
import useLayoutStore from "../../store/useLayoutStore.ts";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

const GNB_MENU = [
    {
        name: "RUNNING",
        path: "/running",
        subMenus: [
            { name: "신발", path: "/running/shoes" },
            { name: "의류", path: "/running/clothing" },
            { name: "액세서리", path: "/running/accessories" },
        ],
    },
    {
        name: "SPORTS STYLE",
        path: "/sports-style",
        subMenus: [
            { name: "신발", path: "/sports-style/shoes" },
            { name: "의류", path: "/sports-style/clothing" },
            { name: "액세서리", path: "/sports-style/accessories" },
        ],
    },
    {
        name: "HERITAGE",
        path: "/heritage",
        subMenus: [
            { name: "마라톤 110 파리", path: "/heritage/110-paris" },
            { name: "마라톤 110", path: "/heritage/110" },
            { name: "마라톤 220", path: "/heritage/220" },
            { name: "그랜드 슬램 82", path: "/heritage/grand-slam" },
        ],
    },
    {
        name: "SPORTS",
        path: "/sports",
        subMenus: [
            { name: "야구", path: "/sports/baseball" },
            { name: "축구", path: "/sports/football" },
            { name: "농구", path: "/sports/basketball" },
            { name: "기타", path: "/sports/etc" },
        ],
    },
    { name: "ONE SPEC", path: "/onespec", subMenus: [] },
    {
        name: "OUR STORY",
        path: "/story",
        subMenus: [
            { name: "공식 후원", path: "/story/sponsorship" },
            { name: "브랜드 선언", path: "/story/manifesto" },
            { name: "시즌 컬렉션", path: "/story/collection" },
            { name: "브랜드 가이드", path: "/story/guide" },
            { name: "이벤트", path: "/story/event" },
        ],
    },
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

    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const isMenuOpen = hoveredMenu !== null;

    const isHome = pathname === "/";
    const isTransparent = isHome && !isScrolled;
    const isHeaderActive = isScrolled || isMenuOpen;

    return (
        <header
            onMouseLeave={() => setHoveredMenu(null)}
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
                <Link to="/" className="flex-shrink-0 w-40">
                    <span className="text-3xl font-black tracking-tighter italic">PROSPECS</span>
                </Link>

                {/* GNB (Desktop) */}
                <nav className="hidden lg:flex flex-1 justify-center gap-12 font-bold text-[15px] tracking-tight">
                    {GNB_MENU.map(menu => (
                        <div
                            key={menu.name}
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setHoveredMenu(menu.name)}>
                            <Link
                                key={menu.name}
                                to={menu.path}
                                className="relative py-7 hover:text-red-600 transition-colors">
                                {menu.name}
                                <span
                                    className={twMerge([
                                        "absolute bottom-0 left-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full",
                                        hoveredMenu === menu.name ? "w-full" : "w-0",
                                    ])}></span>
                            </Link>
                        </div>
                    ))}
                </nav>

                {/* 우측 아이콘 */}
                <div className="flex items-center gap-5 text-2xl w-60 justify-end">
                    {/* ... 검색창 및 아이콘 코드 (이전과 동일) ... */}
                    <div className="relative hidden md:block group">
                        <input
                            type="text"
                            placeholder="검색"
                            className={twMerge(
                                "w-40 border-b border-black text-sm py-1 focus:outline-none focus:w-60 transition-all",
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

            {/* [전체 펼침 메뉴 (Mega Menu)] */}
            <div
                className={twMerge(
                    "absolute top-20 left-0 w-full bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out z-10",
                    isMenuOpen ? "h-64 opacity-100 border-b shadow-sm" : "h-0 opacity-0 border-b-0"
                )}
            >
                {/* 상단 nav와 동일한 gap, 동일한 justify 구조를 가짐 */}
                <div className="container mx-auto px-4 h-full flex justify-between pt-6">
                    <div className="w-40 invisible">Logo Space</div>

                    <div className="hidden lg:flex flex-1 justify-center gap-12 h-full">
                    {GNB_MENU.map((menu) => (
                        // 상단 메뉴와 동일한 w-32 너비를 가짐 -> 수직 정렬 일치
                        <ul key={menu.name} className="w-32 flex flex-col gap-3 text-center">
                            {menu.subMenus.map((subMenu) => (
                                <li key={subMenu.name}>
                                    <Link
                                        to={subMenu.path}
                                        className="block text-sm text-gray-500 hover:text-red-600 hover:underline underline-offset-4 transition-colors font-medium"
                                    >
                                        {subMenu.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
