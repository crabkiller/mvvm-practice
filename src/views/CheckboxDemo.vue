<script>
import { ref } from 'vue';
import CheckboxList from '../components/CheckboxList.vue';

export default {
  components: {
    CheckboxList,
  },
  setup() {
    const checkedList = ref([0, 1, 2]);
    const options = Array.from(Array(10)).map((_, index) => ({
      label: `选项${index + 1}`,
      value: index,
    }));

    return {
      checkedList,
      options,
    };
  },
};
</script>

<template>
  <CheckboxList
    v-model:value="checkedList"
    :options="options"
  />
</template>
