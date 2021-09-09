<script>
import { Button, Modal } from 'ant-design-vue';
import { LeftOutlined, RightOutlined, Loading3QuartersOutlined } from '@ant-design/icons-vue';
import Contents from './Contents';
import useDetail from './useDetail';
import useCurrentContent from './useCurrentContent';
import { fetchDetail } from './services';

export default {
  components: {
    Contents,
    Button,
    Modal,
    LeftOutlined,
    RightOutlined,
    Loading3QuartersOutlined,
  },
  setup() {
    const {
      detailId,
      isDetail,
      detail,
      loading,
      handlePreview,
    } = useDetail(fetchDetail);

    const {
      currentContentIndex,
      handleContentSwitch,
    } = useCurrentContent([], detailId);

    return {
      isDetail,
      detail,
      loading,
      handlePreview,
      currentContentIndex,
      handleContentSwitch,
    };
  },
};
</script>

<template>
  <Contents @preview="handlePreview" />
  <Modal
    v-if="isDetail"
    v-model:visible="isDetail"
    title="预览"
    :footer="null"
    :mask-closable="false"
  >
    <section class="preview-panel">
      <Button
        shape="circle"
        :hidden="currentContentIndex <= 0"
        @click="handleContentSwitch(-1)"
      >
        <template #icon>
          <LeftOutlined />
        </template>
      </Button>
      <p class="desc">
        {{ detail?.desc }}
        <Loading3QuartersOutlined
          v-if="loading"
          spin
        />
      </p>
      <Button
        shape="circle"
        :hidden="currentContentIndex >= contents?.length - 1"
        @click="handleContentSwitch(1)"
      >
        <template #icon>
          <RightOutlined />
        </template>
      </Button>
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
