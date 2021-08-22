import {h, defineComponent} from "vue";

export default defineComponent({
  name: 'WUpload',
  props: {
    fileTypes: {type: String, default: 'png, jpeg'}
  },
  methods: {
    changeHandle(e: any) {
      const files = e.target.files;
      if (!files) return;
      this.uploadFiles(files);
    },
    uploadFiles(files: any) {
      let postFiles = Array.prototype.slice.call(files);
      postFiles = postFiles.slice(0, 1);
      if (postFiles.length === 0) { return; }
      postFiles.forEach(rawFile => {
        this.$emit('upload', rawFile);
      });
    },
  },
  render() {
    const {changeHandle} = this;
    const {fileTypes} = this;
    return (
        <div class={'w-upload'} >
          <span>{this.$slots.default()}</span>
          <input type="file" accept={fileTypes} onchange={changeHandle}>
          </input>
        </div>
    )
  }
})
