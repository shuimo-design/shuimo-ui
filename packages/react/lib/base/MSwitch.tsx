/**
 * @description react version MSwitch
 * @author 阿怪
 * @date 2023/2/18 22:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SwitchEvents, SwitchProps } from '@shuimo-design/core/lib/base/switch';
import { useSwitch } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';


export default function MSwitch(props: SwitchProps & SwitchEvents) {
  const { getTemplate } = useSwitch();


  return cr(getTemplate({
    props,
    events: {
      onClick: props.onClick
    }
  }));

}
