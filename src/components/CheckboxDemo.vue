<script>
import { ref } from 'vue';
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
    // 是否全部选中
    const isAllChecked = (checkedList, options) =>
      checkedList?.length > 0 && checkedList.length === options.length;
    // 是否半选中
    const isIndeterminate = (checkedList, options) =>
      checkedList?.length > 0 && !isAllChecked(checkedList, options);
    // 全选状态
    const allChecked = ref(isAllChecked(props.value, props.options));
    // 半选状态
    const indeterminate = ref(isIndeterminate(props.value, props.options));

    // 全选/取消全选
    const toggleCheckAll = ({ target: { checked } }) => {
      indeterminate.value = false;
      allChecked.value = checked;
      emit('update:value', checked ? props.options.map(option => option.value) : []);
    };

    // 修改选中项
    const handleChange = (newVal) => {
      allChecked.value = isAllChecked(newVal, props.options);
      indeterminate.value = isIndeterminate(newVal, props.options);
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
        v-model:checked="allChecked"
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
