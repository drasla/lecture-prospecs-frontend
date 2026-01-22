import { httpClient } from "./axios";
import type { ConfirmOrderRequest, CreateOrderRequest, Order } from "../types/order";

// 1. 주문 생성 (결제 준비)
export const createOrder = async (data: CreateOrderRequest) => {
    // 응답으로 Order 객체(안에 orderNumber 포함)가 옴
    const response = await httpClient.post<Order>("/orders", data);
    return response.data;
};

// 2. 내 주문 목록 조회
export const getOrders = async () => {
    const response = await httpClient.get<Order[]>("/orders");
    return response.data;
};

// 3. 주문 상세 조회
export const getOrderDetail = async (orderId: number) => {
    const response = await httpClient.get<Order>(`/orders/${orderId}`);
    return response.data;
};

export const confirmOrder = async (data: ConfirmOrderRequest) => {
    const response = await httpClient.post<Order>("/orders/confirm", data);
    return response.data;
};
