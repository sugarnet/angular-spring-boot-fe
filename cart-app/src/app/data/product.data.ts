import { Product } from "../models/product";

// generate constant data for 6 distinct random roducts using Product class with id, name, description, and price. For example: phone XL, phone Mini, phone Standard, laptop XL, laptop Mini, laptop Standard. Give me a description for all products.
export const PRODUCTS: Product[] = [
    { id: 1, name: 'Phone XL', description: 'A large phone with one of the best screens', price: 799 },
    { id: 2, name: 'Phone Mini', description: 'A great phone with one of the best cameras', price: 699 },
    { id: 3, name: 'Phone Standard', description: 'A standard phone with a standard screen', price: 299 },
    { id: 4, name: 'Laptop XL', description: 'A large laptop with one of the best screens', price: 999 },
    { id: 5, name: 'Laptop Mini', description: 'A great laptop with one of the best cameras', price: 899 },
    { id: 6, name: 'Laptop Standard', description: 'A standard laptop with a standard screen', price: 499 }
];
