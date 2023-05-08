/**
 * @description mask hook
 * @author 阿怪
 * @date 2023/5/8 17:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { VNode } from 'vue';
import { ModelMask } from '@shuimo-design/core/types/common/model';

export default function useMask(
  props: { mask: ModelMask },
  handleClick: () => void
) {

  const maskClick = () => {
    if (props.mask.clickClose) {
      handleClick();
    }
  };
  const wrapperWithMask = (dom: VNode) => {
    return <div class={['m-model-mask', { 'm-model-mask-bg': props.mask.show }]}
                onClick={() => maskClick()}>
      {dom}
    </div>;
  };

  return {
    wrapperWithMask
  };

}
