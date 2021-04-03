export default class Product {
    constructor(id, nom, marque, type, reference, description, prixTTC, prixHT, quantite ) {
        this.id = id;
        this.nom = nom;
        this.marque = marque;
        this.type = type;
        this.reference = reference;
        this.description = description;
        this.prixTTC = prixTTC;
        this.prixHT = prixHT;
        this.quantite = quantite;
    }
}