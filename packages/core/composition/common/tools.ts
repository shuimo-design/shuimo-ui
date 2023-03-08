/**
 * @description some tools
 * @author 阿怪
 * @date 2023/3/8 20:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export const unref = (value: any) => (value && (value.value || value.current)) || value;
