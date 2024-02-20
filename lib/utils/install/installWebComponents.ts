/**
 * @description install web component script
 * @author 阿怪
 * @date 2024/2/3 19:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { App } from 'vue';
import { MUIOption } from '../../types/shuimo-ui';
import MWCBorder from '../../components/template/border/MWCBorder.tsx';
import MWCRicePaper from '../../components/template/ricePaper/MWCRicePaper.tsx';


export const installWebComponents = (app: App, options: MUIOption | undefined) => {
  // todo support nuxt
  const { disableWebComponent } = options ?? {};
  const useWebComponent = new Map([
    ['MBorder', { key: 'm-border', component: MWCBorder }],
    ['MRicePaper', { key: 'm-rice-paper', component: MWCRicePaper }],
  ]);

  if (disableWebComponent && Array.isArray(disableWebComponent) && disableWebComponent.length > 0) {
    // remove useWebComponent key in disableWebComponent
    disableWebComponent.forEach(item => {
      useWebComponent.delete(item);
    });
  }

  if (useWebComponent.size > 0) {
    Array.from(useWebComponent).forEach(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => {
        customElements.define(value.key, value.component);
      });
  }

  return {
    app,
    useWebComponent,
  };

};
