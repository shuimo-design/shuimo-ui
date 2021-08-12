<template>
  <div class="upload-demo">
    <span>上传文件为：{{file.name}}</span>
    <w-upload @upload="uploadHandle">
      <img :src="fileUrl" alt="" v-if="fileUrl">
    </w-upload>
  </div>
</template>

<script>
  export default {
    name: "UploadDemo",
    data() {
      return {
        file: {},
        fileUrl: ''
      }
    },
    methods: {
      uploadHandle(file) {
        this.file = file;
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let that = this;
        reader.onload = (e) => {
          that.fileUrl = e.currentTarget.result;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
