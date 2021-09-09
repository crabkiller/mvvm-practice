import { ref, watchEffect } from "vue";

export default function useContents(getContents) {
  const contents = ref(null);
  watchEffect(async () => {
    const res = await getContents();
    contents.value = res;
  });

  return {
    contents,
  };
}
