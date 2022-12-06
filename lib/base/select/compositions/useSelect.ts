/**
 * @description select基础hook
 * @author Jimmy
 * @date 2022/12/06 17:46
 * @version v1.0.0
 */
import { SelectProps } from '../index';
import useDebounceFn from '../../../dependents/_composables/useDebounceFn';
import { HTMLElementEvent } from '../../../dependents/_types';


export default function useSelect(props: Required<SelectProps>,
                                  emit: (event: ('update:modelValue' | 'input' | 'select' | 'focus'), ...args: any[]) => void,
                                  handler: {
                                    emitFocus: (value: FocusEvent) => void,
                                    emitBlur?: (value: FocusEvent) => void,
                                    showDialog: () => void,
                                    input?: (value: HTMLElementEvent<HTMLInputElement>) => void
                                  }) {

  const showSelectDialog = () => {
    if (props.options.length > 0) {
      handler.showDialog();
    }
  };

  const debounceShowSelectDialog = useDebounceFn(showSelectDialog, 200);

  const onFocus = (value: FocusEvent) => {
    if (props.inputReadonly) {
      return;
    }
    debounceShowSelectDialog();
    handler.emitFocus(value);
  };

  const onBlur = (value: FocusEvent) => {
    if (!props.inputReadonly && handler.emitBlur) {
      handler.emitBlur(value);
    }
  };

  const onInput = (value: HTMLElementEvent<HTMLInputElement>) => {
    debounceShowSelectDialog();
    if (handler.input) {
      handler.input(value);
    }
    emit('input', value);
  };

  return {
    onFocus, onInput, onBlur
  };
}
