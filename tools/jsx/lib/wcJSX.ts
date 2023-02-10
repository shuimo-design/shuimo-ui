/**
 * @description web component jsx tools
 * @author 阿怪
 * @date 2023/2/7 02:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MTemplate } from './tools/MTemplate';

const isEvent = (key: string) => {
  return key.startsWith('on') && key[2].match(/[A-Z]/);
};

export const mWC = (type: string, propsRecord?: Record<string, any> | null, ...childList: MTemplate[]): MTemplate => {
  // for web-component
  const template = new MTemplate();
  template.initTag(type);
  /**
   * handle props.
   * Each tag if it has props, it will be a Record<string, any> values.
   * But we don't know if the props was default value or from component.
   * So we hand over this processing to `createElement`, and what we have to do is to collect it and put it in values.
   */
  if(propsRecord){
    Object.keys(propsRecord).forEach(key => {
      const value = propsRecord[key];
      template.addProp(key, value);
    })
  }

  template.addChildren(childList);


  template.endTag();

  return template;
};
