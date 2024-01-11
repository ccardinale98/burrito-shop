export interface Order {
    items: OrderItem[];
};

export interface OrderItem {
    burrito: string;
    quantity: number;
};