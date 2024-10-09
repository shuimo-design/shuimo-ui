/**
 * @description shuimo headless install script
 * @author 阿怪
 * @date 2024/10/9 00:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

// todo merge shuimo install

import { App } from 'vue';
import { MUIOption } from '../../types/shuimo-ui';
import { installComponent } from './installComponent.ts';

export const install = (options: MUIOption | undefined = {}) => {
  return (app: App) => {
    app = installComponent(app, options);

    return app;
  };
};
