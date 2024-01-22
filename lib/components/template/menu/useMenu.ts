/**
 * @description core menu hook
 * @author 阿怪
 * @date 2023/08/03 15:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MenuProps } from './index';
import { useTree } from '../../base/tree/useTree';
import { Options } from '../../../compositions/common/defineCore.ts';

export function useMenu(options: Options<{
  props: MenuProps,
  event: {
    triggerTree: () => void
  }
}>) {


  const {
    treeRef,
    getNodesByKeys,
    handleToggleExpand,
    handleToggleChecked,
    initTreeRef,
  } = useTree(options);


  return {
    treeRef,
    getNodesByKeys,
    handleToggleExpand,
    handleToggleChecked,
    initTreeRef,
  };

}
