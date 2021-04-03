<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Product />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Product from '@/components/Product.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld, Product
  }
}
</script>
