export default class PurchaseOrder {
    constructor(numDistributeur, nomClient, prenomClient, adressesClient, telephoneClient, emailClient, facebookClient, typePaiement, productList ) {
        this.numDistributeur = numDistributeur;
        this.nomClient = nomClient;
        this.prenomClient = prenomClient;
        this.adressesClient = adressesClient;
        this.telephoneClient = telephoneClient;
        this.emailClient = emailClient;
        this.facebookClient = facebookClient;
        this.typePaiement = typePaiement;
        this.productList = productList;
    }
}