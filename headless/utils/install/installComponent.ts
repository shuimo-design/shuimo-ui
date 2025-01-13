/**
 * @description shuimo headless install component script
 * @author 阿怪
 * @date 2024/10/9 00:26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { App } from 'vue';
import { MCKeys, MUIOption } from '../../types/shuimo-ui';
import * as C from './importComponents.ts';


export const installComponent = (
  _app: App,
  options: MUIOption | undefined,
) => {
  // const { app, useWebComponent } = installWebComponents(_app, options);
  const app = _app;
  let installComponentsKey: MCKeys = [];

  installComponentsKey = Object.keys(C.components) as MCKeys;
  installComponentsKey.forEach(key => {
    console.log(key);
    app.component(key, C.components[key]);
  });

  return app;
};
