<template>
  <div>
    <div>{{ checkedOriginal }}</div>
    <m-checkbox label="A" v-model="checkedOriginal" value="a"/>
    <m-checkbox label="B" value="B" :checked="checkedOriginal2" @change="changeHandle"/>
    <m-checkbox label="C" disabled checked value="C"/>
    <div>{{ checkedArr.join(',') }}</div>
    <m-checkbox-group v-model="checkedArr">
      <m-checkbox label="C" value="c"/>
      <m-checkbox label="D" value="d"/>
    </m-checkbox-group>
    <div>{{ checkedArr2.join(',') }}</div>
    <m-checkbox-group v-model="checkedArr2" disabled>
      <m-checkbox label="E" value="e"/>
      <m-checkbox label="F" value="f"/>
    </m-checkbox-group>
    <div>{{ checkedArr2.join(',') }}</div>
    <m-checkbox-group v-model="checkedArr2" disabled>
      <m-checkbox value="e">这里是slot</m-checkbox>
      <m-checkbox label="F" value="f"/>
    </m-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checkedOriginal = ref(true);
const checkedOriginal2 = ref(true);
const checkedArr = ref(['c']);
const checkedArr2 = ref(['e', 'f']);

const changeHandle = (val: boolean, e: Event) => {
  console.log(val, e);
}

</script>
