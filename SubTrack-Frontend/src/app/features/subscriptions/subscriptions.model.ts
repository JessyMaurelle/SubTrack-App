export interface Subscription {
    id: string;
    name: string;
    category: string;
    cycle: string;
    price: number;
    currency: string;
    nextChargeDate: string;
    status: string;
    lastPrice?: number;
    createdAt: string;
    updatedAt: string;
    oldPrice?: number;  
}