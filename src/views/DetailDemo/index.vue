<script>
import { Button, Modal } from 'ant-design-vue';
import { LeftOutlined, RightOutlined, Loading3QuartersOutlined } from '@ant-design/icons-vue';
import useContents from './useContents';
import useDetail from './useDetail';
import useCurrentContent from './useCurrentContent';
import { fetchContents, fetchDetail } from './services';

export default {
  components: {
    Button,
    Modal,
    LeftOutlined,
    RightOutlined,
    Loading3QuartersOutlined,
  },
  setup() {
    const {
      contents,
    } = useContents(fetchContents);

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
    } = useCurrentContent(contents, detailId);

    return {
      contents,
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
  <ul class="list">
    <li
      v-for="content in contents"
      :key="content.id"
      class="item"
      @click="handlePreview(content.id)"
    >
      <div class="content">
        {{ content.title }}
      </div>
    </li>
  </ul>
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
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.item {
  position: relative;
  width: 20%;
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, .2);
  background: rgba(0, 0, 0, .05);
}
.item::before {
  content: "";
  display: block;
  padding-top: 100%;
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.preview-panel {
  display: flex;
  align-items: center;
}
.desc {
  margin: 0 auto 0 20px;
}
</style>
