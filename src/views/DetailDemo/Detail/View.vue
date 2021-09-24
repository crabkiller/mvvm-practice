<script>
import { computed } from 'vue';
import { Modal } from 'ant-design-vue';
import { Loading3QuartersOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    Modal,
    Loading3QuartersOutlined,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    detail: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
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
    const visibleModel = computed({
      get() {
        return props.visible;
      },
      set(newVal) {
        emit('update:visible', newVal);
      },
    });

    return {
      visibleModel,
    };
  },
};
</script>

<template>
  <Modal
    v-if="visibleModel"
    v-model:visible="visibleModel"
    title="预览"
    :footer="null"
    :mask-closable="false"
  >
    <section class="preview-panel">
      <slot name="left" />
      <p class="desc">
        {{ detail?.desc }}
        <Loading3QuartersOutlined
          v-if="loading"
          spin
        />
      </p>
      <slot name="right" />
    </section>
  </Modal>
</template>

<style scoped>
.preview-panel {
  display: flex;
  align-items: center;
}
.desc {
  margin: 0 auto 0 20px;
}
</style>
