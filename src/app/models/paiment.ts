import { Commande } from "./commande";

export class Paiement {
    _id: string;
    idCommande: string;
    commande: Commande;
    modePaiement: number;
    prix: number;
    datePaiement: Date;
    idUser: string;
}