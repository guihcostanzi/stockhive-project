<script setup lang="ts">
import { RouterView } from 'vue-router'
import ShHeader from "./components/ShHeader.vue"
import { authentication } from './stores/authentication';
</script>

<template>
  <ShHeader v-if="authentication().token"/>
  <RouterView />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,900;1,100;1,200;1,300;1,800&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}
</style>
