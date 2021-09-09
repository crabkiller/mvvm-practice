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

export function fetchDetail(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id,
        desc: `内容${id}-详情`,
      });
    }, Math.random() * 2000);
  });
}
