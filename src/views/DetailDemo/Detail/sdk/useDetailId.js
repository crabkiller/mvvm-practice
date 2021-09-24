import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import omit from 'lodash.omit';

export default function useDetailId(detailIdQueryKey = 'detail') {
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
        if (detailId.value) {
          routeChangeFn = 'replace';
        }
      }

      router[routeChangeFn]({
        query,
      });
    },
  });

  function setDetailId(newVal) {
      detailId.value = newVal;
  }

  return {
    detailId,
    setDetailId,
  };
}
