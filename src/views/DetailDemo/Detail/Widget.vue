<script>
import { computed, watchEffect } from 'vue';
import { useDetail, fetchDetail } from './sdk';
import View from './View.vue';

export default {
  components: {
    View,
  },
  props: {
    detailId: {
      type: [String, Number],
      default: null,
    },
  },
  emits: ['update:detail-id'],
  setup(props, { emit }) {
    const detailIdModel = computed({
      get() {
        return props.detailId;
      },
      set(newVal) {
        emit('update:detail-id', newVal);
      },
    });

    const {
      isDetail,
      detail,
      loading,
      preview,
    } = useDetail(fetchDetail, detailIdModel);

    watchEffect(() => {
      preview(detailIdModel.value);
    });

    return {
      isDetail,
      detail,
      loading,
    };
  },
};
</script>

<template>
  <View
    v-model:visible="isDetail"
    v-bind="$attrs"
    :detail="detail"
    :loading="loading"
  >
    <template #left>
      <slot name="left" />
    </template>
    <template #right>
      <slot name="right" />
    </template>
  </View>
</template>
