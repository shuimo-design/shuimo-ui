/**
 * @description hook接口
 * @author 阿怪
 * @date 2022/2/13 12:14 AM
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { Ref } from 'vue';


export declare function useDialog(name?: string): {
  visible: Ref<boolean>,
  closeDialog: () => void,
  showDialog: () => void
};
