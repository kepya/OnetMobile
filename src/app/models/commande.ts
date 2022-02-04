import { Products } from "./products";

export class Commande {
    _id: string;
    idProduct: string;
    product: Products;
    quantite: number;
    idUser: string;
    prix: number;
    dateCommande: Date;
}