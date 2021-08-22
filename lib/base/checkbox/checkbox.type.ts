/**
 * @Description 复选框相关类
 * @Author: 南歌子
 * @Date 2021/4/6 15:28
 * @version V1.0.0
 *
 * Hello, humor
 */
export interface ICheckboxProps {
    modelValue: string | boolean | number
    label?: string | boolean | number
    indeterminate?: boolean
    disabled?: boolean
    checked?: boolean
    name?: string
    trueLabel?: string | number
    falseLabel?: string | number
    id?: string
    controls?: string
    size?: string
}
