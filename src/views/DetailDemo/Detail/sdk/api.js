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
