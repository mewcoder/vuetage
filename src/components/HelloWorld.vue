<script lang="ts" setup>
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      <a target="_blank" href="https://webpack.docschina.org/concepts/">Webpack5</a>+
      <a target="_blank" href="https://v2.cn.vuejs.org/v2/guide/migration-vue-2-7.html">Vue2.7</a>
    </h3>
  </div>
</template>
