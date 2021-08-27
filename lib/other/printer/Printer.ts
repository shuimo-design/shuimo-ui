/**
 * @Description: 控制台打印模块
 * @Author: 菩萨蛮
 * @Date: 2021/2/6 10:10 上午
 * @Version v1.0.0
 *
 * TODO: 封装待优化，这写法可维护性好弱
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * V1.0.1 添加console底层打印分类
 */

import { PrinterType, printInterface, IPrinter } from "../../../types/components/WPrint";

enum PrinterEnum {
  suggest = 'suggest',
  info = 'info',
  error = 'error',
}

const typeColor = {
  suggest: '#e8b004',
  info: '#5e616d',
  error: '#c04851',
}

const PrinterConsole: Record<PrinterEnum, keyof Console> = {
  [PrinterEnum.suggest]: 'log',
  [PrinterEnum.info]: 'log',
  [PrinterEnum.error]: 'error'
}

const Printer: IPrinter = (defaultUser = '水墨UI') => {
  const DEFAULT_USER = defaultUser;
  const getType = (o: any) => {
    const s = Object.prototype.toString.call(o);
    const matchStr = s.match(/\[object (.*?)\]/);
    if (matchStr === null) {
      return 'string';
    }
    return matchStr[1].toLowerCase();
  };

  const print: printInterface = options => {
    console[PrinterConsole[options.type]](options.format,
      `background:${typeColor[options.type]}; border-radius:5px; padding:5px 7px;color:white;`,
      '', options.content);
  };

  const printer: PrinterType = Object.create(null);


  for (let t of Object.values(PrinterEnum)) {
    printer[t] = (content: any, user: string = DEFAULT_USER) => {
      switch (getType(content)) {
        case 'string':
          return print({ format: `%c ${user} %c %s`, content, type: t });
        case 'object':
          return print({ format: `%c ${user} %c %o`, content, type: t });
        default:
          return print({ format: `%c ${user} %c %s`, content: '', type: t });
      }
    };
  }


  return printer;
}


export default Printer;
