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
    // 这里基于之前的思考，将「全选」状态改成了计算属性，逻辑清晰很多。
    // 在用户点击「全选」按钮切换「全选」「取消全选」状态时，只是在修改「已选中选项」，这里的「全选」状态会自动同步更新

    // 这个调整给我们一个启发：
    // 一些数据之间本身就是具有「关联」性的，我们需要关注数据之间的「关联」，而不是独立的去看待和定义所有数据
    // 就如这里的「全选」状态对应的数据本身就是和「全部选项」、「已选中选项」是「强关联」的
    // 甚至可以说「全选」这个 checkbox 根本就没有自己的状态，它的状态是「全部选项」和「已选中选项」二者组合起来赋予它的
    // 它和「半选」状态一样仅是一个展示性的状态标识，更友好的告知用户「当前是否选中了所有选项」，本身根本不具有可修改性
    // 当用户点击「全选」的时候，并不是在修改「全选」状态，而是在便捷的修改「已选中选项」
    // 由此引发的「全选」状态变更，本质上还是由于它依赖的「已选中选项」发生了改变导致的，并不是因为修改了它本身的状态

    // 在这里，我们提到了一个很重要的概念：数据。
    // 在 MVVM 模式下，我们提倡的是，开发者应该把自己的注意力聚焦在「数据」上，视图只是「数据」的一种展现形式
    // 可以这么理解：我们写代码，其实都是在处理数据，至于 UI 上发生了改变，只是 Vue 把「数据」进行了可视化处理
    // 因此，我们为了让写出来的代码更加简洁更易理解，应该花费大量时间思考：如何让我的数据定义、维护、流转的更简洁明了
    // 就如我们这里把「全选」和「半选」都调整为计算属性，我们把注意力聚焦在「已选中选项」这个数据上，去维护这个数据
    // 至于「全选」和「半选」状态，会在我们更新完「已选中选项」后，自然自动同步更新，而不需要我们去关注在何时主动去更新它

    // 关于之前独立维护「全选」和「半选」状态，有一个很大的问题，我们需要花费大量精力去关注在哪些时刻需要去更新它
    // 因为随着业务发展，后期可能会有更多用户操作会来修改「已选中选项」
    // 如果我们不建立数据之间的「关联」，我们可能需要时刻关注数据变更，让数据能够正确的同步更新，否则就可能会出现状态不一致的问题
    // 因此，让数据自身产生「关联」，而不是我们手动去维护保证他们之间的关联性，是很重要的
    const allChecked = computed(
      () => props.value?.length > 0 && props.value.length === props.options.length
    );

    // 半选状态
    // 这里的「半选」状态也是同理
    const indeterminate = computed(
      () => props.value?.length > 0 && !allChecked.value
    );

    // 全选/取消全选
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
