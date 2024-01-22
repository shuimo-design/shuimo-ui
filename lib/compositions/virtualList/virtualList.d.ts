/**
 * @description virtual list type
 * @author 阿怪
 * @date 2023/7/20 21:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

type EntryInfo = {
  ratio: number,
  position: number,  // POSITION_TYPE
  realIndex: number,
  realHeight?: number,
  translateY?: number,
}
