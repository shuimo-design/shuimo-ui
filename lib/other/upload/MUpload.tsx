/**
 * @description 文件上传组件
 * @author youus
 * @date 2021/1/19 4:05 下午
 * @version v1.1.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 input添加pointer样式 阿怪
 * v1.1.0 改为setup写法 并修复反复上传同一个文件不触发的问题
 */
import { defineComponent, ref } from 'vue';
import { props } from './api';

export default defineComponent({
  name: 'MUpload',
  props,
  emit: ['upload'],
  setup(props, { emit, slots }) {
    const inputRef = ref<HTMLInputElement | null>(null);

    const changeHandle = () => {
      if (!inputRef.value) return;
      const files = inputRef.value.files;
      if (!files) return;
      uploadFiles(files);
      inputRef.value.value = '';
    };

    const uploadFiles = (files: FileList) => {
      let postFiles = Array.prototype.slice.call(files);
      postFiles = postFiles.slice(0, 1);
      if (postFiles.length === 0) {
        return;
      }
      postFiles.forEach(rawFile => {
        emit('upload', rawFile);
      });
    };

    return () => {
      return (
        <div class="m-upload">
          <span>{slots.default!()}</span>
          <input class="m-cursor-pointer" ref={inputRef} type="file" accept={props.fileTypes} onChange={changeHandle} />
        </div>
      );
    };
  }
});
