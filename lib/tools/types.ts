/**
 * @description types check
 * @author 阿怪
 * @date 2023/4/20 23:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export const isBoolean = (val: any): val is boolean => typeof val === 'boolean';
