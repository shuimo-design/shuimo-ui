/**
 * @description shuimo install script
 * @author 阿怪
 * @date 2024/2/3 19:38
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { App } from 'vue';
import { MUIOption } from '../../types/shuimo-ui';
import { loadingDirective } from '../../components/other/loading/directive';
import { MShuimoConfigKey } from '../../components/other/config/MShuimoConfig.tsx';
import { installComponent } from './installComponent.ts';

export const install = (options: MUIOption | undefined = {}) => {
  return (app: App) => {
    app = installComponent(app, options);

    app.directive('loading', loadingDirective);
    app.provide(MShuimoConfigKey, {
      svgInject: options?.svgInject ?? 'auto',
    });

    return app;
  };
};


export {
  MShuimoConfigKey,
};
