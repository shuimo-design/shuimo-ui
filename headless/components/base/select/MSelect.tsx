/**
 * @description headless select
 * @author 阿怪
 * @date 2024/11/28 16:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SelectCore } from '@shuimo-design/ui-core';
import { defineComponent } from 'vue';
import { SelectProps } from '@shuimo-design/ui-core/components/base/select/props';


const props = SelectCore.props;

export default defineComponent((_props: SelectProps) => {

  const props = _props as Required<SelectProps>;

  return () => {

    return ;
  };

}, {
  name: 'MSelect',
  props,
});
