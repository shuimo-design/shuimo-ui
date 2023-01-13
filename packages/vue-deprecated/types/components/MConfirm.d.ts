/**
 * @description 确认框模块类型
 * @author 阿怪
 * @date 2021/9/24 1:22 上午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export type BaseConfirmConfig = {
  content: string
};

export type IConfirm = {
  (config: BaseConfirmConfig | string): Promise<boolean>
};
