/**
 * @description effect queue
 * @author 阿怪
 * @date 2023/6/24 19:45
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * like watch but very simple and regardless of performance
 */
import { RMRef } from "./MRef";


class Effect {

  #refMap = new Map<RMRef, Function[]>();


  constructor() {

  }

  register(ref: RMRef, fn: Function) {
    if (this.#refMap.has(ref)) {
      this.#refMap.get(ref)!.push(fn);
    } else {
      this.#refMap.set(ref, [fn]);
    }
  }

  run(ref: RMRef) {
    const fns = this.#refMap.get(ref);
    if (fns) {
      for (const fn of fns) {
        fn();
      }
    }
  }

}


export default new Effect();
