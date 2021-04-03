<template>
    <div>

        <h1>Vos produits</h1>

    </div>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      products: [
        {
          name: 'test1',
          description: 'description1',
          reference: 'ref1',
          priceHT: 15.55,
          priceTTC: 30.65
        },
        {
          name: 'test2',
          description: 'description2',
          reference: 'ref2',
          priceHT: 15.65,
          priceTTC: 30.45
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
