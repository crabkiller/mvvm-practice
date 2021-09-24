<script>
import { computed, ref } from 'vue';
import Contents from './Contents';
import Detail, { useDetailId } from './Detail';
import Switcher, { useCurrentContent } from './Switcher';

export default {
  components: {
    Contents,
    Detail,
    Switcher,
  },
  setup() {
    const { detailId, setDetailId } = useDetailId();

    const contents = ref(null);
    function handleContentsChange(newVal) {
      contents.value = newVal;
    }
    const total = computed(() => contents.value?.length ?? 0);

    const {
      currentContentIndex,
      handleContentSwitch,
    } = useCurrentContent(contents, detailId);

    return {
      detailId,
      handlePreview: setDetailId,
      handleContentsChange,
      total,
      currentContentIndex,
      handleContentSwitch,
    };
  },
};
</script>

<template>
  <Contents
    @update:contents="handleContentsChange"
    @preview="handlePreview"
  />
  <Detail v-model:detail-id="detailId">
    <template #left>
      <Switcher
        :step="-1"
        :current-index="currentContentIndex"
        :total="total"
        @switch="handleContentSwitch"
      />
    </template>
    <template #right>
      <Switcher
        :step="1"
        :current-index="currentContentIndex"
        :total="total"
        @switch="handleContentSwitch"
      />
    </template>
  </Detail>
</template>
