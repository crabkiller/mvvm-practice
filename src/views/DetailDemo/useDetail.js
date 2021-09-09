import { computed, ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import omit from 'lodash.omit';

export default function useDetail(getDetail, detailIdQueryKey = 'detail') {
  const route = useRoute();
  const router = useRouter();
  const detailId = computed({
    get() {
      return route.query[detailIdQueryKey];
    },
    set(newVal) {
      const query = omit(route.query, [detailIdQueryKey]);
      let routeChangeFn = 'push';
      if (newVal) {
        query[detailIdQueryKey] = newVal;
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

  return {
    detailId,
    isDetail,
    detail,
    loading,
    handlePreview,
  };
}
