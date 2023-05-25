import { Sale } from "../sales/models/sale";
import { Region } from "./region";

export class Cliente {
    id: number;
    nombre: string;
    apellido: string;
    createAt: string;
    email: string;
    photo: string;
    region: Region;
    sales: Array<Sale> = [];
}
