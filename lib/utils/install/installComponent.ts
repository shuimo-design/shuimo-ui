/**
 * @description install component script
 * @author 阿怪
 * @date 2024/2/3 21:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { App } from 'vue';
import { MCKeys, MUIOption, MWCType } from '../../types/shuimo-ui';
import * as C from './importComponents.ts';
import { installWebComponents } from './installWebComponents.ts';


export const installComponent = (
  _app: App,
  options: MUIOption | undefined,
) => {
  const { app, useWebComponent } = installWebComponents(_app, options);
  const { component } = options ?? {};

  let installComponentsKey: MCKeys = [];

  if (component) {
    // if array type
    if (Array.isArray(component)) {
      installComponentsKey = component;
    } else if (typeof component === 'object') {
      const { includes, excludes } = component;
      if (includes) {
        installComponentsKey = includes;
      }
      if (excludes) {
        installComponentsKey = installComponentsKey.filter(
          item => !excludes.includes(item),
        );
      }
    }
  } else {
    installComponentsKey = Object.keys(C.components) as MCKeys;
  }


  installComponentsKey.forEach(key => {
    if (useWebComponent.has(key as MWCType)) {
      return;
    }
    app.component(key, C.components[key]);
  });

  return app;

};
