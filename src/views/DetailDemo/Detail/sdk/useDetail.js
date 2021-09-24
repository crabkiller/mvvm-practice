import { computed, ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import omit from 'lodash.omit';

export default function useDetail(getDetail, detailId) {
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

  function preview(id) {
    detailId.value = id;
  }

  return {
    detailId,
    isDetail,
    detail,
    loading,
    preview,
  };
}
