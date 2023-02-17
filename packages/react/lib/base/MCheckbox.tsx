/**
 * @description MCheckbox
 * @author 阿怪
 * @date 2023/2/8 20:58
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { CheckboxEvents, CheckboxProps, useCheckbox } from '@shuimo-design/core';
import { Slot } from '../types';
import { cr } from '../../tools/coreRender';


export default function MCheckbox(props: CheckboxProps & CheckboxEvents & Slot) {


  const { getTemplate } = useCheckbox();

  return cr(getTemplate({
    props,
    events: {
      onChange: props.onChange
    }
  }),props);

}
