/**
 * @description tools
 * @author 阿怪
 * @date 2023/5/15 16:37
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

/**
 * 一个暂时的简易克隆方法
 * todo 待优化 别用JSON
 * @param data
 */
export const deepClone = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
