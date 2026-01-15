import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductDetail } from "../../api/product.api";
import type { Product } from "../../types/product";
import Button from "../../components/common/Button.tsx";
import Accordion from "../../components/common/Accordion.tsx";
import { twMerge } from "tailwind-merge";

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    // 상태 관리
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // 선택 옵션
    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>("");

    // 메인 이미지 (색상 변경 시 변경됨)
    const [mainImage, setMainImage] = useState<string>("");

    // 데이터 로드
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const data = await getProductDetail(Number(id));
                setProduct(data);

                // 초기값: 첫 번째 색상 선택
                if (data.colors && data.colors.length > 0) {
                    const firstColor = data.colors[0];
                    setSelectedColorId(firstColor.id);
                    if (firstColor.images.length > 0) {
                        setMainImage(firstColor.images[0].url);
                    }
                }
            } catch (error) {
                console.error("상품 로드 실패", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="py-40 text-center">Loading...</div>;
    if (!product) return <div className="py-40 text-center">상품 정보가 없습니다.</div>;

    // 현재 선택된 색상 데이터
    const currentColor = product.colors.find(c => c.id === selectedColorId);

    // 장바구니/구매 핸들러
    const handleBuy = () => {
        if (!selectedSize) {
            alert("사이즈를 선택해주세요.");
            return;
        }
        alert(
            `[구매예정]\n상품: ${product.name}\n옵션: ${currentColor?.colorName} / ${selectedSize}`,
        );
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-0 py-40 text-gray-900">
            {/* [상단 영역] 이미지(좌) vs 정보(우) */}
            <div className="flex flex-col md:flex-row gap-10 lg:gap-14">
                {/* 1. 왼쪽: 이미지 갤러리 */}
                <div className="w-full md:w-[65%] space-y-3">
                    {/* 메인 이미지 */}
                    <div className="aspect-[4/5] w-full bg-gray-50 overflow-hidden relative">
                        {mainImage ? (
                            <img
                                src={mainImage}
                                alt="Main"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                No Image
                            </div>
                        )}
                        {/* 배지 표시 */}
                        <div className="absolute top-4 left-4 flex gap-1">
                            {product.isNew && (
                                <span className="bg-white text-xs font-bold px-2 py-1 shadow-sm">
                                    NEW
                                </span>
                            )}
                            {product.isBest && (
                                <span className="bg-black text-white text-xs font-bold px-2 py-1 shadow-sm">
                                    BEST
                                </span>
                            )}
                        </div>
                    </div>

                    {/* 썸네일 리스트 (현재 색상의 추가 이미지들) */}
                    {currentColor && currentColor.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {currentColor.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onMouseEnter={() => setMainImage(img.url)}
                                    onClick={() => setMainImage(img.url)}
                                    className={`w-20 h-24 flex-shrink-0 bg-gray-50 overflow-hidden border ${
                                        mainImage === img.url
                                            ? "border-black"
                                            : "border-transparent"
                                    }`}>
                                    <img
                                        src={img.url}
                                        alt="thumb"
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 2. 오른쪽: 상품 정보 및 옵션 */}
                <div className="w-full md:w-[35%] flex flex-col pt-2">
                    {/* 헤더 정보 */}
                    <div className="border-b border-gray-200 pb-6">
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                                {product.name}
                            </h1>
                            {/* 공유하기 아이콘 등 위치 */}
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="text-xs text-gray-500">{currentColor?.productCode}</div>
                        </div>
                        <div className="mt-6">
                            <span className="text-2xl font-bold text-gray-900">
                                {product.price.toLocaleString()}
                            </span>
                            <span className="text-lg font-medium ml-1">원</span>
                        </div>
                    </div>

                    {/* 옵션 선택 영역 */}
                    <div className="py-6 space-y-6">
                        {/* (1) 색상 선택 (이미지로 보여주기) */}
                        <div>
                            <p className="text-sm font-bold mb-3">
                                색상{" "}
                                <span className="text-gray-500 font-normal ml-2">
                                    {currentColor?.colorName}
                                </span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map(color => {
                                    const thumb = color.images[0]?.url;
                                    const isSelected = selectedColorId === color.id;
                                    return (
                                        <button
                                            key={color.id}
                                            onClick={() => {
                                                setSelectedColorId(color.id);
                                                setSelectedSize(""); // 색상 변경 시 사이즈 리셋
                                                if (thumb) setMainImage(thumb);
                                            }}
                                            className={`w-16 h-16 border overflow-hidden relative ${
                                                isSelected
                                                    ? "border-black border-2"
                                                    : "border-gray-200 hover:border-gray-400"
                                            }`}
                                            title={color.colorName}>
                                            {thumb ? (
                                                <img
                                                    src={thumb}
                                                    alt={color.colorName}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div
                                                    className="w-full h-full bg-gray-200"
                                                    style={{ backgroundColor: color.hexCode }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* (2) 사이즈 선택 */}
                        <div>
                            <div className="flex justify-between items-center mb-3 text-sm font-bold">
                                사이즈
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {currentColor?.sizes.map(s => {
                                    const isSoldOut = s.stock <= 0;
                                    const isSelected = selectedSize === s.size;
                                    return (
                                        <button
                                            key={s.id}
                                            disabled={isSoldOut}
                                            onClick={() => setSelectedSize(s.size)}
                                            // [수정] flex 사용 시 버튼 크기 확보를 위해 min-w-[3rem]과 px-3 추가
                                            className={`h-10 min-w-[3rem] px-3 text-sm border transition-colors ${
                                                isSelected
                                                    ? "border-black bg-black text-white"
                                                    : isSoldOut
                                                      ? "bg-gray-100 text-gray-300 cursor-not-allowed line-through decoration-gray-300"
                                                      : "border-gray-300 text-gray-700 hover:border-black"
                                            }`}>
                                            {s.size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 구매 버튼 */}
                        <div className="flex flex-col gap-3">
                            <Button size={"md"} onClick={handleBuy}>
                                바로구매
                            </Button>
                            <Button variant={"secondary"} size={"md"}>
                                장바구니
                            </Button>
                        </div>

                        <div className={twMerge(["flex", "flex-col"])}>
                            {/* 상품 설명 */}
                            <Accordion title={"상품 설명"}>
                                {product.summary}
                            </Accordion>

                            {/* 상품 정보 고시 (테이블) */}
                            <Accordion title={"상품 정보 고시"}>
                                <table className="w-full text-xs text-left">
                                    <colgroup>
                                        <col className="w-32 sm:w-40" /> {/* th 너비 고정 */}
                                        <col />
                                    </colgroup>
                                    <tbody>
                                    {/* 각 행: 배경색 없이 텍스트와 하단 라인만 유지 */}
                                    <tr>
                                        <th className="py-3 font-medium text-gray-900">소재</th>
                                        <td className="py-3 text-gray-600">
                                            {product.material || "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="py-3 font-medium text-gray-900">제조사</th>
                                        <td className="py-3 text-gray-600">
                                            {product.manufacturer || "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="py-3 font-medium text-gray-900">제조국</th>
                                        <td className="py-3 text-gray-600">
                                            {product.originCountry || "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="py-3 font-medium text-gray-900">제조년월</th>
                                        <td className="py-3 text-gray-600">
                                            {product.manufactureDate || "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="py-3 font-medium text-gray-900">
                                            취급시 주의사항
                                        </th>
                                        <td className="py-3 text-gray-600 leading-relaxed">
                                            {product.careInstructions || "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="py-3 font-medium text-gray-900">
                                            품질보증기준
                                        </th>
                                        <td className="py-3 text-gray-600">
                                            {product.qualityAssurance || "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="py-3 font-medium text-gray-900">
                                            A/S 책임자/전화번호
                                        </th>
                                        <td className="py-3 text-gray-600">
                                            {product.asPhone || "-"}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>

            {/* 상세 이미지/설명 영역 */}
            <div id="detail" className="max-w-[860px] mx-auto mt-24">
                {/* 에디터로 작성된 HTML 내용 */}
                <div
                    className="prose max-w-none mb-20 text-center"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />
            </div>
        </div>
    );
};

export default ProductDetailPage;
