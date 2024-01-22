/**
 * @description used to create a select
 * @author 阿怪
 * @date 2023/5/16 11:48
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MultipleSelect, SelectCreatorOptions, SingleSelect } from './class/BaseSelect';

export default function selectCreator<OptionValue, JSXNode>(options: SelectCreatorOptions<OptionValue, JSXNode>) {
  if (options.props.multiple) {
    return new MultipleSelect(options);
  }
  return new SingleSelect(options);
}
