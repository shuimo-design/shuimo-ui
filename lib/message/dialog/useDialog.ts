/**
 * @Description: 弹窗hook
 * @Author: 阿怪
 * @Date: 2022/2/4 5:01 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';

export default function useDialog() {
  const visible = ref(false);
  const closeDialog = () => {
    visible.value = false;
  }
  const showDialog = () => {
    visible.value = true;
  }

  return { visible, showDialog, closeDialog }
}
