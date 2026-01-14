import type { Product, ProductListResponse } from "../types/product";
import { httpClient } from "./axios.ts";

// [Type] 상품 생성/수정 시 서버로 보낼 데이터 타입
// (프론트 form state와 달리 images가 string[] 형태임)
export interface CreateProductRequest {
    name: string;
    description: string;
    summary?: string;
    price: number;
    categoryId: number;

    material?: string;          // 소재
    manufacturer?: string;      // 제조사
    originCountry?: string;     // 제조국
    careInstructions?: string;  // [New] 세탁방법 및 취급시 주의사항
    manufactureDate?: string;   // [New] 제조년월
    qualityAssurance?: string;  // [New] 품질보증기준
    asPhone?: string;           // [New] A/S 책임자와 전화번호

    isNew?: boolean;
    isBest?: boolean;

    colors: {
        productCode: string;
        colorName: string;
        hexCode?: string;
        colorInfo?: string;       // [New] 색상 상세 설명
        images: string[];
        sizes: {
            size: string;
            stock: number;
        }[];
    }[];
}

// 상품 목록 조회
export const getProducts = async (page: number = 1, limit: number = 10, categoryId?: number) => {
    const params = { page, limit, categoryId };
    const response = await httpClient.get<ProductListResponse>("/admin/products", { params });
    return response.data;
};

// 2. 상품 상세 조회 (수정 페이지용)
export const getProductDetail = async (id: number) => {
    const response = await httpClient.get<Product>(`/admin/products/${id}`);
    return response.data;
};

// 3. [New] 상품 등록
export const createProduct = async (data: CreateProductRequest) => {
    const response = await httpClient.post<{ message: string; product: Product }>(
        "/admin/products",
        data
    );
    return response.data;
};

// 4. 상품 수정
export const updateProduct = async (id: number, data: CreateProductRequest) => {
    const response = await httpClient.put<{ message: string; product: Product }>(
        `/admin/products/${id}`,
        data
    );
    return response.data;
};

// 상품 삭제
export const deleteProduct = async (id: number) => {
    const response = await httpClient.delete<{ message: string }>(`/admin/products/${id}`);
    return response.data;
};