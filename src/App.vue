<script setup lang="ts">
import { ref } from 'vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import CheckboxDemo from './components/CheckboxDemo.vue';
import "ant-design-vue/dist/antd.css";

const checkedList = ref([0, 1, 2]);
const options = Array.from(Array(10)).map((_, index) => ({
  label: `选项${index + 1}`,
  value: index,
}));
</script>

<template>
  <CheckboxDemo v-model:value="checkedList" :options="options" />
</template>

<style>
#app {
  width: 75%;
  margin: 10em auto;
}
</style>
