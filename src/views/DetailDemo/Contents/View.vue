<script>
export default {
  props: {
    contents: {
      type: Array,
      required: true,
    },
  },
  emits: ['preview'],
  setup(props, { emit }) {
    function handlePreview(id) {
      emit('preview', id);
    }

    return {
      handlePreview,
    };
  },
};
</script>

<template>
  <ul class="list">
    <li
      v-for="content in contents"
      :key="content.id"
      class="item"
      @click="handlePreview(content.id)"
    >
      {{ content.title }}
    </li>
  </ul>
</template>

<style scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.item {
  position: relative;
  width: 20%;
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, .2);
  background: rgba(0, 0, 0, .05);
  text-align: center;
}
.item::before {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  padding-top: 100%;
  vertical-align: middle;
}
</style>


