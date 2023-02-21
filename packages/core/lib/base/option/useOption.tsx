/**
 * @description core option hook
 * @author 阿怪
 * @date 2023/2/21 17:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '@shuimo-design/types';


export function useOption(slot?: MNodeTemplate) {

  const getSlot = () => {
    return slot ?? <slot/>;
  };


  const getTemplate = () => {
    return <div class="m-option">{getSlot()}</div>;
  };

  return {
    options: { props: {} },
    getTemplate
  };
}
