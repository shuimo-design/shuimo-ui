<template>
  <div>
    <w-checkbox label="A" v-model="checkedOriginal" value="a" @change="changeHandle"/>
    <w-checkbox label="B" disabled value="B" checked/>
    <w-checkbox-group v-model="checkedArr">
      <w-checkbox label="C" value="c"/>
      <w-checkbox label="D" value="d"/>
    </w-checkbox-group>
    <w-checkbox-group v-model="checkedArr2" disabled>
      <w-checkbox label="E" value="e"/>
      <w-checkbox label="F" value="f"/>
    </w-checkbox-group>
  </div>
</template>

<script>
import WCheckboxGroup from "../../../../lib/base/checkbox/WCheckboxGroup";
export default {
  name: "CheckboxDemo",
  components: {WCheckboxGroup},
  data() {
    return {
      checked: '选中返回值',
      checkedOriginal: true,
      checkedArr: ['c'],
      checkedArr2: ['e', 'f']
    };
  },
  methods: {
    changeHandle(val, e) {
      console.log(val, e);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
