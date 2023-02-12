/**
 * @description props for web component
 * @author 阿怪
 * @date 2023/2/11 02:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DefaultFactory } from '@shuimo-design/types';


export class MProps {
  type?: DefaultFactory<any>;
  key?: string;
  value?: any;

  constructor(options: {
    type: DefaultFactory<any>,
    key: string,
    value: any
  }) {
    this.key = options.key;
    this.type = options.type;
    this.value = options.value;
  }


  toString() {
    return this.value;
  }
}
