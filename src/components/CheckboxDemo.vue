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
    // 在这里可以看出，「全选」状态其实是和「全部选项」、「已选中选项」二者强关联的
    // 当「全部选项」都存在于「已选中选项」中时，即为「全选」状态，否则不是。
    // 这种状态是不是用「计算属性」来做更为合理呢？他其实是由「全部选项」和「已选中选项」二者计算得来的
    // 但是，在进行「全选」和「取消全选」操作时，我们其实在主动修改「全选」状态，这似乎又和计算属性不相符了
    // 不过，这里我们或许应该从另一个角度来看待修改「全选」状态的动作：
    // 我们主动修改完「全选」状态时，会同步去更新「已选中选项」
    // 我们上面已经说了，「全选」状态是依赖「已选中选项」的计算属性
    // 因此当我们更新了「已选中选项」，「全选」状态便会自动更新，所以这里的手动更新「全选」状态是一个冗余操作
    // 基于这些思考，我们的代码可以进行调整，见下一个 commit
    const isAllChecked = (checkedList, options) =>
      checkedList?.length > 0 && checkedList.length === options.length;
    // 是否半选中
    // 「半选」状态同理，而且半选状态本身只是一个展示性的状态，本身并不支持主动修改，这点和「全选」状态不同
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
