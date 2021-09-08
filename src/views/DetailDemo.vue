<script>
import { computed, ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import omit from 'lodash.omit';
import { Button, Modal } from 'ant-design-vue';
import { LeftOutlined, RightOutlined, Loading3QuartersOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    Button,
    Modal,
    LeftOutlined,
    RightOutlined,
    Loading3QuartersOutlined,
  },
  setup() {
    const list = Array.from(Array(12)).map((_, index) => ({
      id: String(index),
      title: `内容${index}`,
    }));
    const listMap = computed(() => {
      return list.reduce((res, content) => ({
        ...res,
        [content.id]: content,
      }), {});
    });

    const route = useRoute();
    const router = useRouter();
    const detailId = computed({
      get() {
        return route.query.detail;
      },
      set(newVal) {
        const query = omit(route.query, ['detail']);
        let routeChangeFn = 'push';
        if (newVal) {
          query.detail = newVal;
          if (isDetail.value) {
            routeChangeFn = 'replace';
          }
        }

        router[routeChangeFn]({
          query,
        });
      },
    });

    const isDetail = computed({
      get() {
        return !!detailId.value;
      },
      set(newVal) {
        if (!newVal) {
          detailId.value = null;
        }
      },
    });

    function getDetail(id) {
      return new Promise(resolve => {
        const content = listMap.value[id];
        setTimeout(() => {
          resolve({
            ...content,
            desc: `${content.title}-详情`,
          });
        }, Math.random() * 2000);
      });
    }

    const detail = ref(null);
    const loading = ref(false);
    watchEffect(async () => {
      const id = detailId.value;
      if (isDetail.value) {
        loading.value = true;
        try {
          const res = await getDetail(id);
          if (id === detailId.value) {
            detail.value = res;
          }
        } finally {
          if (id === detailId.value) {
            loading.value = false;
          }
        }
      } else {
        detail.value = null;
      }
    });

    function handlePreview(id) {
      detailId.value = id;
    }

    const detailIndex = computed({
      get() {
        return list.findIndex(({ id }) => id === detailId.value);
      },
      set(newVal) {
        detailId.value = list[newVal].id;
      },
    });
    function handlePreviewSwitch(step) {
      detailIndex.value += step;
    }

    return {
      list,
      isDetail,
      detail,
      loading,
      handlePreview,
      detailIndex,
      handlePreviewSwitch,
    };
  },
};
</script>

<template>
  <ul class="list">
    <li
      v-for="content in list"
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
        :hidden="detailIndex <= 0"
        @click="handlePreviewSwitch(-1)"
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
        :hidden="detailIndex >= list.length - 1"
        @click="handlePreviewSwitch(1)"
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
