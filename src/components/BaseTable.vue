<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
    <tr>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
    </tr>
    </thead>
    <tbody :class="tbodyClasses">
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="(column, index) in columns"
            :key="index"
            v-if="hasValue(item, column)">
          {{itemValue(item, column)}}
        </td>
        <td v-if="canUpdate()" v-on:click="updateItem(item)"><i class="tim-icons icon-pencil"></i></td>
        <td v-if="canDelete()" v-on:click="deleteItem(item['id'])"><i class="tim-icons icon-trash-simple"></i></td>
        <td v-if="canAdd()" v-on:click="addItem(item)"><i class="tim-icons icon-simple-add"></i></td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'base-table',
    props: {
      columns: {
        type: Array,
        default: () => [],
        description: "Table columns"
      },
      data: {
        type: Array,
        default: () => [],
        description: "Table data"
      },
      type: {
        type: String, // striped | hover
        default: "",
        description: "Whether table is striped or hover type"
      },
      theadClasses: {
        type: String,
        default: '',
        description: "<thead> css classes"
      },
      tbodyClasses: {
        type: String,
        default: '',
        description: "<tbody> css classes"
      },
      delete: {
        type: Boolean,
        default: false,
        description: "can delete item"
      },
      update: {
        type: Boolean,
        default: false,
        description: "can update item"
      },
      add: {
        type: Boolean,
        default: false,
        description: "can add item"
      }
    },
    computed: {
      tableClass() {
        return this.type && `table-${this.type}`;
      }
    },
    methods: {
      hasValue(item, column) {
        console.log(item);
        console.log(column);
        return item[column.charAt(0).toLowerCase() + column.substring(1)] !== "undefined";
      },
      itemValue(item, column) {
        return item[column.charAt(0).toLowerCase() + column.substring(1)];
      },
      deleteItem(ident) {
        if(confirm('Etes vous sur de vouloir supprimer la ligne ?')) {
          this.$parent.$options.parent.deleteItem(ident);
        }
        else {}
      },
      addItem(item) {
        this.$parent.$options.parent.addItem(item);
      },
      updateItem(item) {
        this.$parent.$options.parent.updateItem(item);
      },
      canDelete() {
        return this.delete;
      },
      canUpdate() {
        return this.update;
      },
      canAdd() {
        return this.add;
      }

    }
  };
</script>
<style>
</style>
