import { Cliente } from "src/app/clientes/cliente";
import { SaleItem } from "./sale-item";

export class Sale {
    id: number;
    description: string;
    comment: string;
    createAt: Date;
    cliente: Cliente;
    saleItems: Array<SaleItem> = [];
    total: number;

    calculateTotal(): number {
        let total = 0;

        this.saleItems.forEach((item: SaleItem) => {
            total += item.calculateTotal();
        });

        return total;
    }
}
