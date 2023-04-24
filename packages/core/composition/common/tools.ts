/**
 * @description component tools
 * @author 阿怪
 * @date 2023/4/24 15:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export const unref = (value: any) => (value && (value.value || value.current)) || value;
