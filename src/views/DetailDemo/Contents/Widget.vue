<script>
import { useContents, fetchContents } from './sdk';
import View from './View.vue';

export default {
  components: {
    View,
  },
  setup() {
    const {
      contents,
    } = useContents(fetchContents);

    return {
      contents,
    };
  },
};
</script>

<template>
  <View
    v-bind="$attrs"
    :contents="contents"
  />
</template>
