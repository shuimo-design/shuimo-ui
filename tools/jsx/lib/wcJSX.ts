/**
 * @description web component jsx tools
 * @author 阿怪
 * @date 2023/2/7 02:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


type Result = { strings: TemplateStringsArray, values: any[] }
type ValueResult = { name: string, value: any } | string | boolean;

class TemplateArr extends Array {raw: string[] = [];}

const preJoinChildren = (children: Array<Result | string>): [Result['strings'][], Result['values'][]] => {
  const list: Array<Result['strings']> = [];
  const values: Array<Result['values']> = [];
  children.filter(e => e).forEach((child) => {
    if (Array.isArray(child)) {
      // console.group('开始子遍历', child);
      const [l, v] = preJoinChildren(child);
      // console.log(l, v);
      if (l) {list.push(...l);}
      if (v) {values.push(...v);}
      // console.groupEnd();
      return;
    }
    if (typeof child === 'string') {
      const a = new TemplateArr();
      a.push(child);
      a.raw = [child];
      list.push(a);
      values.push([]);
      return;
    }
    if (child.strings) {
      list.push(child.strings);
    }
    if (child.values) {
      values.push(child.values);
    }
  });
  return [list, values];
};

const isEvent = (key: string) => {
  return key.startsWith('on') && key[2].match(/[A-Z]/);
};


export const mWC = (type: string, propsRecord?: Record<string, any> | null, ...childList: Result[]): Result => {
  // for web-component
  const strings = new TemplateArr();
  const templateList: string[] = [];
  const values: Array<ValueResult> = [];
  let index = 0;
  templateList[index] = `<${type} `;

  const nextTemplate = (withQuotation = false) => {
    strings.push(templateList[index]);
    index++;
    templateList[index] = withQuotation ? '" ' : '';
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
      if (isEvent(key)) {
        // event
        const eventName = key.slice(2).toLowerCase();
        templateList[index] += ` @${eventName}="`;
        // this is a magic value, in createElement should replace it,inject Component Class function
        values.push({ name: eventName, value: propsRecord[key] });
        nextTemplate(true);
        return;
      }
      templateList[index] += `${key}="${propsRecord[key]}" `;
    });
  }
  templateList[index] += `>`;
  if (childList && childList.length > 0) {
    const [stringsList, valuesList] = preJoinChildren(childList);

    const strL = stringsList.length;
    const valL = valuesList.length;
    if (strL !== valL) {
      console.warn(stringsList, valuesList, childList);
    }

    for (let i = 0; i < strL; i++) {
      const str = stringsList[i];
      const val = valuesList[i];
      if (val.length === 0) {
        if (str.length !== 1) {console.error('str.length!==1', str, val);}
        templateList[index] += str[0];
        continue;
      }

      for (let sIndex = 0; sIndex < str.length; sIndex++) {
        templateList[index] += str[sIndex];
        if (sIndex === str.length - 1) {continue;}
        // console.log(val[sIndex]);
        values.push(val[sIndex]);
        nextTemplate();
      }


    }
    // console.log(templateList, stringsList, valuesList);

  }
  templateList[index] += `</${type}>`;
  strings.push(templateList[index]);

  strings.raw = templateList;
  // console.warn( strings, values );
  return { strings, values };
};
