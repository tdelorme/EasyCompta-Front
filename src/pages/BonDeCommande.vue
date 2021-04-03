<template>
<div>
    <div class="row">
      
        <card>
          <form name="formSearch" @submit.prevent="handleSearchProduct" class="form-inline">
              <div class="col">
                <input type="text" class="form-control" name="nomSearch" v-model="search.name" placeholder="Nom du produit"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" name="referenceSearch" v-model="search.reference" placeholder="Référence du produit"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" name="marqueSearch" v-model="search.marque" placeholder="Marque du produit"/>
              </div>
              <div class="col">
              <select name="typeSearch" v-model="search.type" class="form-select-search">
                <option value="" class="option">Sélectionner un type de produit</option>
                <option value="Parfum" class="option">Parfum</option>
                <option value="Menager" class="option">Ménager</option>
                <option value="Huile" class="option">Huile</option>
                <option value="Cosmetique" class="option">Cosmétique</option>
              </select>
              </div>
              <div class="col">
                <button class="btn btn-primary btn-block">
                  <span>Rechercher</span>
                </button>
              </div>
          </form>
        </card>
      
    </div>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive">
            <base-table :data="table1.data"
                        :columns="table1.columns"
                        thead-classes="text-primary"
                        :add="true">
            </base-table>
          </div>
        </card>
      </div>
    </div>
    <div class="row">


      <ul>
        
        <li v-for="product in productsBdc" :key="product.id">
            {{product.id}} - {{product.marque}} - {{product.nom}} - Quantité : {{product.quantite}} - <i class="tim-icons icon-trash-simple" v-on:click="deleteItem(product.id)"></i>
        </li>
        
      </ul>
    

      <p>Ici le formulaire recap de la commande avec la possibilité de supprimer des lignes si on fait une erreur</p>
    </div>
    </div>
</template>
<script>
import { BaseTable } from "@/components";
import Card from '../components/Cards/Card.vue';
import Product from '../model/product.model';
import SearchCriteria from '../model/search.criteria.model'
const tableColumns = ["Id","Nom","Marque","Type","Reference", "Description", "PrixHT", "PrixTTC"];
let tableData = []
export default {
  components: {
    BaseTable,
    Card
  },
  data() {
    return {
      table1: {
        title: "Vos Produits",
        columns: [...tableColumns],
        data: tableData
      },
      product: new Product('','','','','','',''),
      search: new SearchCriteria('','',''),
      productsBdc: []
    };
  },
  methods: {
    handleSearchProduct() {
      const baseURI='product/search';

      this.$http.post(baseURI,{
        name:this.search.name,
        reference:this.search.reference,
        type:this.search.type,
        marque:this.search.marque
      }).then(response => {
        if(response.data.data) {
          this.table1.data = [];
          response.data.data.forEach( product => {
            this.table1.data.push({
              id:product.id,
              nom:product.nom,
              marque:product.marque,
              type:product.type,
              reference:product.reference,
              description:product.description,
              prixHT:product.prixHT,
              prixTTC:product.prixTTC
            })
          })
        }
      }).catch(error => {
        this.table1.data = [];
        console.error(error.response.data.message)
      })
    },
    addItem(item) {

      if(this.productsBdc.length != 0) {
        let productFind = this.productsBdc.find(x => x.id === item['id'])
        if( productFind != undefined ) {
          productFind.quantite = productFind.quantite+1;

          const index = this.productsBdc.map(function(item) {
            return item.id;
          }).indexOf(productFind.id);

          this.productsBdc.slice(index, 1);
        }
        else {
          this.product.id = item['id'];
          this.product.nom = item['nom'];
          this.product.marque = item['marque'];
          this.product.type = item['type'];
          this.product.reference = item['reference'];
          this.product.description = item['description'];
          this.product.prixHT = item['prixHT'];
          this.product.prixTTC = item['prixTTC'];
          this.product.quantite = 1;

          this.productsBdc.push(this.product);
        }
      }
      else {
        this.product.id = item['id'];
          this.product.nom = item['nom'];
          this.product.marque = item['marque'];
          this.product.type = item['type'];
          this.product.reference = item['reference'];
          this.product.description = item['description'];
          this.product.prixHT = item['prixHT'];
          this.product.prixTTC = item['prixTTC'];
          this.product.quantite = 1;

          this.productsBdc.push(this.product);
      }

      this.product = new Product('','','','','','','')
    },
    deleteItem(ident) {

      let productFind = this.productsBdc.find(x => x.id === ident);

      if (productFind != undefined) {

        if(productFind.quantite > 1) {
          productFind.quantite = productFind.quantite - 1;

          const index = this.productsBdc.map(function(item) {
            return item.id;
          }).indexOf(productFind.id);

          this.productsBdc.slice(index, 1);
        }
        else {
          this.productsBdc = this.productsBdc.filter(function(item) {
            return item.id != ident;
          });
        }

      }
    },
    getAllProduct() {
      const baseURI='product/get';

      this.$http.get(baseURI).then(response => {
        console.log(response.data.data);
        this.table1.data = response.data.data;
      })
    }
  },
  mounted() {
    this.getAllProduct();
  },
  created() {
    this.getAllProduct();
  }
};
</script>
<style scoped>

  .table-responsive {
    height: 400px;
  }

  .form-select-search {
    display: block;
    width: 100%;
    padding: .375rem 2.25rem .375rem .75rem;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
    border-color: #2b3553;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: right .75rem center;
    background-size: 16px 12px;
    border-radius: .25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .form-select {
    display: block;
    width: 100%;
    padding: .375rem 2.25rem .375rem .75rem;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
    border-color: #2b3553;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: right .75rem center;
    background-size: 16px 12px;
    border-radius: .25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .option {

    color: #000 !important;
    border-color: #2b3553;

  }
</style>
