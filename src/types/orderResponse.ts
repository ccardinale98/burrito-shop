export interface OrderResponse {
    _id: string;
    items: OrderItemResponse[];
    totalCost: number;
}

interface OrderItemResponse {
    _id: string;
    burrito: string;
    quantity: number;
};