export function fetchContents() {
  return new Promise(resolve => {
    setTimeout(() => {
      const res = Array.from(Array(12)).map((_, index) => ({
        id: String(index),
        title: `内容${index}`,
      }));
      resolve(res);
    }, Math.random() * 1000);
  });
}
