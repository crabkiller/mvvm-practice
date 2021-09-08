<script>
import "ant-design-vue/dist/antd.css";
</script>

<template>
  <div class="home">
    <ul>
      <li>
        <router-link :to="{ name: 'checkbox-demo' }">
          checkbox demo
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'detail-demo' }">
          detail demo
        </router-link>
      </li>
    </ul>
  </div>
</template>
