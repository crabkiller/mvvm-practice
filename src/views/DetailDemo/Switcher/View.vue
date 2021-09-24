<script>
import { computed } from 'vue';
import { Button } from 'ant-design-vue';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    Button,
    LeftOutlined,
    RightOutlined,
  },
  props: {
    step: {
      type: Number,
      default: 1,
    },
    currentIndex: {
      type: Number,
      default: -1,
    },
    total: {
      type: Number,
      default: -1,
    },
  },
  emits: ['update:visible', 'switch'],
  setup(props, { emit }) {
    const hidden = computed(() => (
      props.step > 0 ? props.currentIndex >= props.total - 1 : props.currentIndex <= 0
    ));

    function handleSwitch(step) {
      emit('switch', Math.min(props.total - 1, Math.max(0, props.currentIndex + step)));
    }

    return {
      hidden,
      handleSwitch,
    };
  },
};
</script>

<template>
  <Button
    v-if="total > 0"
    shape="circle"
    :hidden="hidden"
    @click="handleSwitch(step)"
  >
    <template #icon>
      <LeftOutlined v-if="step < 0" />
      <RightOutlined v-else-if="step > 0" />
    </template>
  </Button>
</template>
