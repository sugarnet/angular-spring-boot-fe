import { Product } from "./product";

export class SaleItem {
    id: number;
    amount: number = 1;
    product: Product;
    amountItem: number;

    calculateTotal(): number {
        return this.amount * this.product.price;
    }
}
