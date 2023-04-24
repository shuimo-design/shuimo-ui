/**
 * @description lit common tools
 * @author 阿怪
 * @date 2023/4/23 11:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export const styleParse = (record:Record<string, any>)=>{
  return Object.entries(record).map(([key, value])=>{
    return `${key}:${value};`
  }).join('')
}
