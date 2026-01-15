import type { Category } from "../types/category.ts";
import { httpClient } from "./axios.ts";

// [사용자/공용] 카테고리 목록 조회
// 백엔드 경로: /api/categories
export const getCategories = async () => {
    // 이제 /admin/categories 가 아니라 /categories 를 호출합니다.
    // (로그인 토큰이 없어도 조회 가능)
    const response = await httpClient.get<Category[]>("/categories");
    return response.data;
};