export interface Category {
    id: number;
    name: string;
    path: string;
    parentId: number | null;
    createdAt: string;
    updatedAt: string;
}

// 프론트엔드 표시용 (부모 안에 자식이 포함된 구조)
export interface CategoryTree extends Category {
    children: Category[];
}
