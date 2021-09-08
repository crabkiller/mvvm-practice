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
    // 基于之前讨论的，对于更新「已选中选项」，这里可能的一种方式是：
    /*
      const updateValue = newVal => {
        emit('update:value', newVal);
      };

      // 全选/取消全选
      const toggleCheckAll = ({ target: { checked } }) => {
        updateValue(checked ? props.options.map(option => option.value) : []);
      };

      // 修改选中项
      const handleChange = updateValue;
    */
    // 这里还有一种利用 Vue 计算属性的 setter 属性结合 v-model 指令来实现的思路，如下
    // 采用这种方式，我们就无需关心事件监听的事情了，我们的关注点只是数据变更，数据变更就会走到 setter 里
    // 尤其对于使用 v-model 实现了“双向绑定”的组件来说，我们不需要关心组件内部对外 emit 了什么事件
    // 在 Vue3 里组件内部在实现 v-model 的时候对外 emit 的事件相对比较显式，因为我们可以从 v-model:value 看出是 update:value 事件
    // 在 Vue2 的时代，这个事件是很隐式的，一般都是通过猜测 input 还是 change 事件来
    // 在 Vue2 的时代最稳妥的方式应该是 Component.model.event 来得知具体的事件名，但是动态监听事件又是一个难题
    // 如果我们只是为了实现双向绑定，可以利用带有 setter 的计算属性绑定到 v-model 上
    // 让 Vue 去帮我们分析出具体的事件名称进行事件绑定的工作，框架本身做的肯定是正确的，对于未来改动和升级的兼容性也更好
    const model = computed({
      get() {
        return props.value;
      },
      set(newVal) {
        emit('update:value', newVal);
      },
    });

    // 全选状态
    // 同理，这里「全选」也可以使用计算属性的 setter 结合 v-model 来实现
    // 而且这里使用计算属性带来了一个好处是，不需要手动计算初始值了，天然关联自动更新
    const allChecked = computed({
      get() {
        return model.value?.length > 0 && model.value.length === props.options.length;
      },
      set(newVal) {
        model.value = newVal ? props.options.map(option => option.value) : [];
      },
    });

    // 半选状态
    const indeterminate = computed(
      () => model.value?.length > 0 && !allChecked.value
    );

    return {
      model,
      allChecked,
      indeterminate,
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
      >
        全选
      </Checkbox>
    </section>
    <CheckboxGroup
      v-model:value="model"
      :options="options"
    />
  </section>
</template>

<style scoped>

</style>
