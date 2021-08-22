/**
 * @Description 多选handler
 * @Author: 南歌子
 * @Date 2021/4/6 14:36
 * @version V1.0.0
 *
 * Hello, humor
 */
import {
    ref,
    computed,
    getCurrentInstance
} from 'vue';
import { toTypeString } from '@vue/shared'
import { UPDATE_MODEL_EVENT } from "../dependents/_utils/constants";
import { ICheckboxProps } from './checkbox.type'

const useModel = (props: ICheckboxProps) => {
    let selfModel = false;
    // @ts-ignore
    const { emit } = getCurrentInstance();
    const isLimitExceeded = ref(false)
    const model = computed({
        get() {
            return props.modelValue;
        },
        set(val: unknown) {
            emit(UPDATE_MODEL_EVENT, val);
            selfModel = val as boolean;
        }
    })

    return {
        model,
        isLimitExceeded
    };
}

const useCheckboxStatus = (props: ICheckboxProps, { model }: any) => {
    const focus = ref(false);
    const isChecked = computed(() => {
        const value = model.value;
        if (toTypeString(value) === '[object Boolean]') {
            return value;
        } else if (value !== null && value !== undefined) {
            return value === props.trueLabel;
        }
    });

    return {
        isChecked,
        focus
    };
}

const useDisabled = (props: ICheckboxProps) => {
    const isDisabled = computed(() => {
        return props.disabled;
    });

    return {
        isDisabled
    };
}

const useEvent = (props: ICheckboxProps, { isLimitExceeded }: any) => {
    // @ts-ignore
    const { emit } = getCurrentInstance();
    function handleChange(e: InputEvent) {
        if (isLimitExceeded.value) return;
        const target = e.target as HTMLInputElement;
        const value = target.checked
            ? props.trueLabel ?? true
            : props.falseLabel ?? false;

        emit('change', value, e);
    }
    return {
        handleChange
    };
}

const setStoreValue = (props: ICheckboxProps, { model }: any) => {
    function addToStore() {
        model.value = props.trueLabel || true;
    }
    props.checked && addToStore();
}

export const useCheckbox = (props: ICheckboxProps) => {
    const { model, isLimitExceeded } = useModel(props);
    const { focus, isChecked } = useCheckboxStatus(props, { model });
    const { isDisabled } = useDisabled(props);
    const { handleChange } = useEvent(props, { isLimitExceeded });

    setStoreValue(props, { model });

    return {
        isChecked,
        isDisabled,
        model,
        handleChange,
        focus
    };
}
