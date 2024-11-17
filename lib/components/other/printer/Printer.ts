/**
 * @description 控制台打印模块
 * @author 阿怪
 * @date 2021/2/6 10:10 上午
 * @version v1.0.0
 *
 * TODO: 封装待优化，这写法可维护性好弱
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * V1.0.1 添加console底层打印分类
 * V1.0.2 优化ts支持，修改type颜色
 */
import { IPrinter, PrinterType, printInterface } from '../../../types/components/MPrint';


enum PrinterEnum {
  suggest = 'suggest',
  info = 'info',
  error = 'error',
}

const typeColor = {
  suggest: '#ebb10d',
  info: '#474b4c',
  error: '#f03f24',
};

const PrinterConsole: Record<PrinterEnum, keyof Pick<Console, 'log' | 'error'>> = {
  [PrinterEnum.suggest]: 'log',
  [PrinterEnum.info]: 'log',
  [PrinterEnum.error]: 'error',
};

const Printer: IPrinter = (defaultUser = '水墨UI') => {
  const DEFAULT_USER = defaultUser;

  const printer: PrinterType = {
    [PrinterEnum.suggest](...args: unknown[]) {
      console[PrinterConsole[PrinterEnum.suggest]](
        `%c ${DEFAULT_USER} `,
        `background:${typeColor[PrinterEnum.suggest]}; border-radius:5px; padding:5px 7px;color:white;`,
        ...args,
      );
    },

    [PrinterEnum.info](...args: unknown[]) {
      console.log(args)
      console[PrinterConsole[PrinterEnum.info]](
        `%c ${DEFAULT_USER} `,
        `background:${typeColor[PrinterEnum.info]}; border-radius:5px; padding:5px 7px;color:white;`,
        ...args,
      );

    },

    [PrinterEnum.error](...args: unknown[]) {
      console[PrinterConsole[PrinterEnum.error]](
        `%c ${DEFAULT_USER} `,
        `background:${typeColor[PrinterEnum.error]}; border-radius:5px; padding:5px 7px;color:white;`,
        ...args,
      );
    }
  };

  return printer;
};

export default Printer;
