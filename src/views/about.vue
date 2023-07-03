<template>
  <div class="about">
    <h1>This is an about page</h1>
    <pre>{{ obj }}</pre>
  </div>
</template>

<script setup lang="ts">
const obj = JSON.stringify(process.env, null, 2);
</script>

<script lang="ts">
export default {
  name: 'AboutView'
};
</script>
