import { computed } from 'vue';

export default function useCurrentContent(contents, detailId) {
  const currentContentIndex = computed({
    get() {
      return contents.value?.findIndex(({ id }) => id === detailId.value);
    },
    set(newVal) {
      detailId.value = contents.value?.[newVal].id;
    },
  });
  function handleContentSwitch(newVal) {
    currentContentIndex.value = newVal;
  }

  return {
    currentContentIndex,
    handleContentSwitch,
  };
}
