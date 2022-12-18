/**
 * @description
 * @author 阿怪
 * @date 2022/12/19 00:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export const patchClassList = (oldClass: string[], newClass: string[]) => {

  const res: { append: string[], remove: string[] } = { append: [], remove: [] };
  for (let i = 0; i < oldClass.length; i++) {
    const item = oldClass[i];
    if (!newClass.includes(item)) {
      res.remove.push(item);
    }
  }
  for (let i = 0; i < newClass.length; i++) {
    const item = newClass[i];
    if (!oldClass.includes(item)) {
      res.append.push(item);
    }
  }
  return res;
};
