// 주문 상태 Enum
export type OrderStatus =
    | "PENDING"
    | "PAID"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELED"
    | "RETURN_REQUESTED"
    | "RETURN_COMPLETED";

// 1. [요청] 주문 생성 데이터 (Checkout 화면에서 보낼 데이터)
export interface OrderItemInput {
    productSizeId: number;
    quantity: number;
}

export interface CreateOrderRequest {
    items: OrderItemInput[];
    recipientName: string;
    recipientPhone: string;
    zipCode: string;
    address1: string;
    address2: string;
    gatePassword?: string; // 선택
    deliveryRequest?: string; // 선택
    paymentMethod: string;
}

// 2. [응답] 주문 상세 데이터 (목록/상세 조회 시 사용)
export interface OrderProductImage {
    url: string;
}

export interface OrderProductInfo {
    id: number;
    name: string;
    price: number;
    style: string;
}

export interface OrderProductColor {
    colorName: string;
    hexCode: string;
    product: OrderProductInfo;
    images: OrderProductImage[];
}

export interface OrderProductSize {
    id: number;
    size: string;
    productColor: OrderProductColor;
}

export interface OrderItemDetail {
    id: number;
    quantity: number;
    price: number; // 구매 당시 가격
    productSize: OrderProductSize;
}

export interface OrderPayment {
    status: string;
    method: string;
    amount: number;
}

export interface Order {
    id: number;
    orderNumber: string; // Toss 결제용 UUID
    status: OrderStatus;
    totalAmount: number;

    // 배송 정보
    recipientName: string;
    recipientPhone: string;
    zipCode: string;
    address1: string;
    address2: string;
    gatePassword?: string;
    deliveryRequest?: string;

    // 결제 정보
    payment?: OrderPayment;

    createdAt: string;
    items: OrderItemDetail[];
}

export interface ConfirmOrderRequest {
    paymentKey: string;
    orderId: string;
    amount: number;
}