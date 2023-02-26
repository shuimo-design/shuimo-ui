/**
 * @description react version MRadio
 * @author 阿怪
 * @date 2023/2/26 20:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { RadioEvents, RadioProps, useRadio } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';
import { Slot } from '../types';


export default function MRadio(props: RadioProps & RadioEvents & Slot) {
  const { getTemplate } = useRadio();

  return cr(getTemplate({
    props,
    events: {
      onClick: (e: any) => {
        props.onClick && props.onClick(e, props.value === props.label ? undefined : props.label);
      }
    }
  }));
}
