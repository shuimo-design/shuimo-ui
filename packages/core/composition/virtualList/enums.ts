/**
 * @description virtual list enums
 * @author 阿怪
 * @date 2023/7/20 21:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export enum ACTION_TYPE {
  ENTER,
  LEAVE
}


export enum ACTION_POSITION {
  TOP,
  BOTTOM
}


export enum THRESHOLD_TYPE {
  ZERO,
  ONE
}


export enum ACTION {
  ENTER_TOP_START,
  ENTER_TOP_END,
  ENTER_BOTTOM_START,
  ENTER_BOTTOM_END,
  LEAVE_TOP_START,
  LEAVE_TOP_END,
  LEAVE_BOTTOM_START,
  LEAVE_BOTTOM_END,
  UNKNOWN
}


