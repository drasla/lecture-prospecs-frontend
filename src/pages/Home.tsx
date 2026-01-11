import MainVisual from "../components/home/MainVisual";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <main className="flex-1 w-full min-w-0 overflow-x-hidden">
                {/* 1. 메인 비주얼 (Swiper 적용됨) */}
                <MainVisual />

                {/* 2. 서브 배너 (.sec1) - MEN / WOMEN */}
                <section className="w-full">
                    <div className="grid grid-cols-2 h-50 md:h-100">
                        <div className="relative group overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 bg-gray-200 bg-[url('https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl md:text-5xl font-black text-white italic tracking-tighter border-b-2 border-transparent group-hover:border-white transition-all pb-1">
                                    MEN
                                </span>
                            </div>
                        </div>
                        <div className="relative group overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 bg-gray-300 bg-[url('https://images.unsplash.com/photo-1584539696499-5288730dd394?q=80&w=2070')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl md:text-5xl font-black text-white italic tracking-tighter border-b-2 border-transparent group-hover:border-white transition-all pb-1">
                                    WOMEN
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. 상품 큐레이션 (소스의 .sec2 부분 - 추후 개발 영역) */}
                <section className="container mx-auto px-4 py-20">
                    <h3 className="text-3xl font-black italic mb-6">SHOES</h3>
                    <div className="border border-dashed border-gray-300 h-60 flex items-center justify-center text-gray-400">
                        상품 리스트 Swiper 영역 (개발 예정)
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm">
                <p>&copy; 2026 PROSPECS Clone. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
