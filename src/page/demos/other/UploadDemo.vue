<template>
  <div class="upload-demo">
    <span>上传文件为：{{ file.name }}</span>
    <w-upload @upload="uploadHandle">
      <img :src="fileUrl" alt="" v-if="fileUrl&&fileUrl.length>0">
    </w-upload>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { WPrinter } from "../../../../lib";

const file = ref({
  name: ''
});
const fileUrl = ref([]);

const uploadHandle = (file: any) => {
  file.value = file;
  WPrinter('文件上传组件').info(file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e: any) => {
    fileUrl.value = e.currentTarget.result;
  }

}
</script>

