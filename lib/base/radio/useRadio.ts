/**
 * @description 单选handler
 * @author 南歌子
 * @date 2021/4/6 11:43
 * @version V1.0.0
 *
 * Hello, humor
 */
import {ref, computed, WritableComputedRef} from 'vue'

export const useRadio = () => {
    const focus = ref(false);

    return {
        focus
    };
};

interface IUseRadioAttrsProps {
    disabled?: boolean
    label: string | number | boolean
}

interface IUseRadioAttrsState {
    model: WritableComputedRef<string | number | boolean>
}

export const useRadioAttrs = (props: IUseRadioAttrsProps, {
    model
}: IUseRadioAttrsState) => {
    const isDisabled = computed(() => {
        return props.disabled
    })

    const tabIndex = computed(() => {
        return (isDisabled.value || (model.value !== props.label)) ? -1 : 0
    })

    return {
        isDisabled,
        tabIndex
    }

}
