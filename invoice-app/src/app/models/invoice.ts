import { Client } from "./client";
import { Company } from "./company";
import { InvoiceItem } from "./invoice-item";

export class Invoice {
    id!: number;
    name!: string;
    client!: Client;
    company!: Company;
    items!: InvoiceItem[];
}