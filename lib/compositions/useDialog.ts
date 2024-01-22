/**
 * @description 弹窗hook
 * @author 阿怪
 * @date 2022/2/4 5:01 AM
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 阿怪 添加toggleDialog方法
 */
import { ref } from 'vue';

export default function useDialog() {
  const visible = ref(false);
  const closeDialog = () => {
    visible.value = false;
  };
  const showDialog = () => {
    visible.value = true;
  };
  const toggleDialog = () => {
    visible.value = !visible.value;
  };

  return { visible, showDialog, closeDialog, toggleDialog };
}
