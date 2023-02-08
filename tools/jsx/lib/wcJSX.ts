/**
 * @description web component jsx tools
 * @author 阿怪
 * @date 2023/2/7 02:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


type Result = { strings: TemplateStringsArray, values: any[] }
const joinChildren = (children: Result[]) => {
  return children.filter(e => e).map((child) => {
    return child.strings;
  }).join('');
};

class TemplateArr extends Array {raw: string[] = [];}

export const mWC = (type: string, propsRecord?: Record<string, any> | null, ...childList: Result[]): Result => {
  // for web-component

  const strings = new TemplateArr();
  const templateList: string[] = [];
  const values: Array<string | boolean | object> = [];
  let index = 0;
  templateList[index] = `<${type} `;

  const nextTemplate = () => {
    strings.push(templateList[index]);
    index++;
    templateList[index] = '';
  };

  if (propsRecord) {
    Object.keys(propsRecord).forEach(key => {
      if (typeof propsRecord[key] === 'boolean') {
        // support boolean props
        templateList[index] += `?${key}=`;
        values.push(propsRecord[key]);
        nextTemplate();
        return;
      }
      if (key.startsWith('on') && key[2].match(/[A-Z]/)) {
        // event
        const eventName = key.slice(2).toLowerCase();
        templateList[index] += ` @${eventName}=`;
        // this is a magic value, in createElement should replace it,inject Component Class function
        values.push({
          name: eventName,
          func: propsRecord[key]
        });
        nextTemplate();
        return;
      }
      templateList[index] += `${key}="${propsRecord[key]}" `;
    });
  }
  templateList[index] += `>${joinChildren(childList)}</${type}>`;
  strings.push(templateList[index]);

  strings.raw = templateList;

  return { strings, values };
};
