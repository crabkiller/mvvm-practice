const Home = () => import('../views/Home.vue');
const CheckboxDemo = () => import('../views/CheckboxDemo.vue');
const DetailDemo = () => import('../views/DetailDemo.vue');

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/checkbox-demo',
    name: 'checkbox-demo',
    component: CheckboxDemo,
  },
  {
    path: '/detail-demo',
    name: 'detail-demo',
    component: DetailDemo,
  },
];
