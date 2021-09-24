<script>
import { watch } from 'vue';
import { useContents, fetchContents } from './sdk';
import View from './View.vue';

export default {
  components: {
    View,
  },
  emits: ['update:contents'],
  setup(props, { emit }) {
    const {
      contents,
    } = useContents(fetchContents);

    watch(contents, contents => {
      emit('update:contents', contents);
    });

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
