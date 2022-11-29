/**
 * @description select基础hook
 * @author 阿怪
 * @date 2022/11/10 01:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SelectProps } from "../index";
import useDebounceFn from "../../../dependents/_composables/useDebounceFn";


export default function useSelect(props: Required<SelectProps>,
                                     emit: (event: ("update:modelValue" | "input" | "select" | "focus"), ...args: any[]) => void,
                                     handler: {
                                       emitFocus: (value: FocusEvent) => void,
                                       showDialog: () => void,
                                       input?:(value:InputEvent)=>void
                                     }) {


  const showSelectDialog = () => {
    if (props.options.length > 0) {
      handler.showDialog();
    }
  }

  const debounceShowSelectDialog = useDebounceFn(showSelectDialog, 200);

  const onFocus = (value: FocusEvent) => {
    if (props.inputReadonly) {
      return;
    }
    debounceShowSelectDialog();
    handler.emitFocus(value);
  }
  const onInput = (value: InputEvent) => {
    debounceShowSelectDialog();
    if(handler.input){
      handler.input(value)
     
    }
    emit('input', value);
  }

  return {
    onFocus, onInput,
  }
}
