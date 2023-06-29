<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<script lang="ts">
export default {
  name: 'HomeView'
};
</script>

<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" height="200" />
    <HelloWorld msg="Welcome to Your Webpack5 + Vue2.7 App！" />
  </div>
</template>
