<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';

const obj = {
  title: '1',
  year: 11
};
</script>

<template>
  <div id="app">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="wrapper">
        <HelloWorld msg="Hello Vue!" :book="obj" />
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </nav>
      </div>
    </header>
    <router-view />
  </div>
</template>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
