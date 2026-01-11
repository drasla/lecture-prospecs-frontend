import { create } from "zustand";

interface CartState {
    cartCount: number;
    increaseCart: () => void;
    // 추후 실제 장바구니 배열이 들어온다면 여기에 CartItem[] 타입 추가
}

const useCartStore = create<CartState>(set => ({
    cartCount: 0,
    increaseCart: () => set(state => ({ cartCount: state.cartCount + 1 })),
}));

export default useCartStore;
