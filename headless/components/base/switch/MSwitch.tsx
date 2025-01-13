/**
 * @description headless switch
 * @author 阿怪
 * @date 2025/1/13 11:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo support disabled and loading
 */
import { defineComponent } from 'vue';
import { SwitchCore } from '@shuimo-design/ui-core';
import { SwitchProps } from '@shuimo-design/ui-core/components/base/switch/props';
import './switch.css';



const { props, useSwitch } = SwitchCore;

export default defineComponent((props: SwitchProps, ctx) => {
  const { getInfo,changeSwitch ,switchClass} = useSwitch(props, ctx);


  return () => {
    return <div class={switchClass.value}>
      {getInfo('activeInfo')}

      <div class="m-switch-main" onClick={changeSwitch}>
        <div class="m-switch-core">

        </div>
      </div>

      {getInfo('inactiveInfo')}
    </div>;
  };

}, {
  name: 'MSwitch',
  emits: ['update:modelValue', 'change'],
  props,
});
