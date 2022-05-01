<template>
  <div>
    <div>{{ checkedOriginal }}</div>
    <w-checkbox label="A" v-model="checkedOriginal" value="a"/>
    <w-checkbox label="B" value="B" :checked="checkedOriginal2" @change="changeHandle"/>
    <w-checkbox label="C" disabled checked value="C"/>
    <div>{{ checkedArr.join(',') }}</div>
    <w-checkbox-group v-model="checkedArr">
      <w-checkbox label="C" value="c"/>
      <w-checkbox label="D" value="d"/>
    </w-checkbox-group>
    <div>{{ checkedArr2.join(',') }}</div>
    <w-checkbox-group v-model="checkedArr2" disabled>
      <w-checkbox label="E" value="e"/>
      <w-checkbox label="F" value="f"/>
    </w-checkbox-group>
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
