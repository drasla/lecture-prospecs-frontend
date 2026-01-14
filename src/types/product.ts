import type { Category } from "./category";

export interface ProductImage {
    id: number;
    url: string;
}

export interface ProductSize {
    id: number;
    size: string;
    stock: number;
}

export interface ProductColor {
    id: number;
    productCode: string;
    colorName: string;
    hexCode?: string;
    images: ProductImage[];
    sizes: ProductSize[];
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    summary?: string;
    isNew: boolean;
    isBest: boolean;
    createdAt: string;

    // 관계형 데이터
    categoryId: number;
    category: Category;
    colors: ProductColor[];
}

// 목록 조회 응답 타입
export interface ProductListResponse {
    products: Product[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
    };
}