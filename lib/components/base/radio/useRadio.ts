/**
 * @description radio hook
 * @author 阿怪
 * @date 2023/4/23 15:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * todo fix nuxt Hydration error
 */

export { initChecked, getNewModelValue } from '../../../compositions/input/useBooleanInput';
export const createRadioId = () => `m-radio-${Math.random().toString(36).substr(2)}`;
