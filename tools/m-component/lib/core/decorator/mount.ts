/**
 * @description MElement mount decorator
 * @author 阿怪
 * @date 2023/1/29 15:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { InitCustomerElementType, RenderElementType } from '../../types/CustomerElement';

export const lifecycleDecorator = () => {
  return (target: InitCustomerElementType) => {

    class lifecycleElement extends (target as RenderElementType) {

      constructor() {
        super();
        this.mount();
      }

      private render() {
        this.callRender();
        if(this.componentOptions.renderHook){
          this.componentOptions.renderHook(this.refMap);
        }
        super.afterRender();
      }

      private callMount() {
        if (!this.shadow) {return;}
        this.render();
      }

      mount() {
        super.beforeMount();
        this.callMount();
        super.afterMount();
      }

      update() {
        super.beforeUpdate();
        this.render();
        super.afterUpdate();
      }

    }

    return lifecycleElement as InitCustomerElementType;
  };
};
