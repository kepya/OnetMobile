import { Products } from "./products";

export class Review {
    _id: string;
    idProduct: string;
    product: Products;
    idUser: string;
    comment: String;
    dateEnvoi: Date;
}
