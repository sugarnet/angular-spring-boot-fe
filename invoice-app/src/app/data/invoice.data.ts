import { Invoice } from "../models/invoice";

export const invoiceData: Invoice = {
    id: 1,
    name: 'Compra mensual',
    client: {
        name: 'Diego',
        lastname: 'Scifo',
        address: {
            country: 'Argentina',
            city: 'Mendoza',
            street: 'Remedios Escalada',
            number: 370
        }
    },
    company: {
        name: 'DSS',
        fiscalNumber: 20300297561
    },
    items: [
        {
            id: 1,
            product: 'Arroz',
            price: 999,
            quantity: 2
        },
        {
            id: 2,
            product: 'Azúcar',
            price: 1100,
            quantity: 3
        },
        {
            id: 3,
            product: 'Harina',
            price: 899,
            quantity: 1
        },
    ]
};