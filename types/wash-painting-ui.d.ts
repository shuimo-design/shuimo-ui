/**
 * @Description: 类型文件
 * @Author: 菩萨蛮
 * @Date: 2021/6/18 12:42 上午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { App } from "vue";
import { IMessage } from "./components/WMessage";

declare module "wash-painting-ui" {
  function install(app: App<any>): void;
}

export { IMessage };
