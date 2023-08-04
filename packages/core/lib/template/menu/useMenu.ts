/**
 * @description core menu hook
 * @author 阿怪
 * @date 2023/08/03 15:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MenuProps } from './index';
import { Options } from '../../../composition/common/defineCore';
import Tree from '../../base/tree/tree';
import { useTree } from '../../base/tree/useTree';

export function useMenu(options: Options<{
  props: MenuProps,
  value: {
    treeRef: Tree
  },
  event: {
    triggerTree: () => void
  }
}>) {


  const {
    getNodesByKeys,
    handleToggleExpand,
    handleToggleChecked,
  } = useTree(options);


  return {
    getNodesByKeys,
    handleToggleExpand,
    handleToggleChecked,
  }

}
