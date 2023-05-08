/**
 * @description mask hook
 * @author 阿怪
 * @date 2023/5/8 21:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import { ModelMask } from '@shuimo-design/core/types/common/model';
import { clsx } from '@shuimo-design/tools/index';

export default function useMask(
  props: { mask: ModelMask },
  handleClick: () => void
) {
  const maskClick = () => {
    if (props.mask.clickClose) {
      handleClick();
    }
  };

  const wrapperWithMask = (dom: React.ReactNode) => {
    return <div className={clsx(['m-model-mask', { 'm-model-mask-bg': props.mask.show }])}
                onClick={() => maskClick()}>
      {dom}
    </div>;
  };


  return {
    wrapperWithMask
  };
}
