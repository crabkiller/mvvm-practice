<script>
import { computed } from 'vue';
import { Checkbox } from 'ant-design-vue';

const CheckboxGroup = Checkbox.Group;

export default {
  components: {
    CheckboxGroup,
    Checkbox,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    // 全选状态
    const allChecked = computed(
      () => props.value?.length > 0 && props.value.length === props.options.length
    );

    // 半选状态
    const indeterminate = computed(
      () => props.value?.length > 0 && !allChecked.value
    );

    // 全选/取消全选
    // 这里有个问题，`toggleCheckAll` 和 `handleChange` 里都在 `emit('update:value')` 来同步当前状态
    // 同样，随着业务发展，后期修改状态的场景可能会越来越多，如果都在 `emit('update:value')` 就觉得在写重复代码
    // 其实写重复代码这个问题倒也不是太严重，可能大家会觉得写一个通用方法，里面去 `emit('update:value')` 不就解决了嘛
    // 这里一个主要问题是：命令式编程(Imperative)和声明式编程(Declarative)的区别
    // 更倾向的一种方式是：业务逻辑只需要写 `props.value = newVal`
    // 因为业务只希望去更新这个值，并不关心这个值最终是以何种方式被更新
    // 如果是这种方式，这里有一个问题：value 本身是一个 props 不推荐甚至不能直接修改，那要怎么做呢，具体见下一个 commit
    const toggleCheckAll = ({ target: { checked } }) => {
      emit('update:value', checked ? props.options.map(option => option.value) : []);
    };

    // 修改选中项
    const handleChange = (newVal) => {
      emit('update:value', newVal);
    };

    return {
      allChecked,
      toggleCheckAll,
      indeterminate,
      handleChange,
    };
  },
};
</script>

<template>
  <section>
    <section>
      <Checkbox
        :checked="allChecked"
        :indeterminate="indeterminate"
        @change="toggleCheckAll"
      >
        全选
      </Checkbox>
    </section>
    <CheckboxGroup
      :value="value"
      :options="options"
      @update:value="handleChange"
    />
  </section>
</template>

<style scoped>

</style>
