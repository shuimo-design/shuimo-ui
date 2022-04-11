/**
 * @description 文件上传组件
 * @author youus
 * @date 2021/1/19 4:05 下午
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 input添加pointer样式 阿怪
 */
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
          <input class="w-cursor-pointer" type="file" accept={fileTypes} onchange={changeHandle}/>
        </div>
    )
  }
})
