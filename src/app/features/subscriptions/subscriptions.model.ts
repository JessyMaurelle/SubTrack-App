export interface Subscription {
    id: string;
    name: string;
    category: 'Streaming'|'Music'|'Internet'|'Phone'|'Cloud'|'Other';
    cycle: 'Monthly'|'Yearly';
    price: number;
    currency: 'EUR'|'USD';
    nextChargeDate: string;
    status: 'Active'|'Paused'|'Canceled';
    lastPrice?: number;
    createdAt: string;
    updatedAt: string;
}