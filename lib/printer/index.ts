/**
 * @Description:
 * @Author: 菩萨蛮
 * @Date: 2021/2/6 10:10 上午
 * @Version v1.0.0
 *
 * TODO: 封装待优化，这写法可维护性好弱
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export const WPrinter = (defaultUser: String = '水墨UI') => {
  const DEFAULT_USER = defaultUser;
  const getType = (o: any) => {
    const s = Object.prototype.toString.call(o);
    const matchStr = s.match(/\[object (.*?)\]/);
    if (matchStr === null) {
      return 'string';
    }
    return matchStr[1].toLowerCase();
  };

  type OptionalType = {
    type: String,
    format: String,
    content: any
  };

  interface printInterface {
    (options: OptionalType): void;
  }

  const print: printInterface = options => {
    switch (options.type) {
      case 'info':
        console.log(options.format,
          'background:#5e616d; border-radius:5px; padding:5px 7px;color:white;',
          '', options.content);
        break;
      case 'error':
        console.log(options.format,
          'background:#c04851; border-radius:5px; padding:5px 7px;color:white;',
          '', options.content);
        break;
      case 'suggest':
        console.log(options.format,
          'background:#e8b004; border-radius:5px; padding:5px 7px;color:white;',
          '', options.content);
        break;
      default:
        break;
    }
  };

  const printer = Object.create(null);

  ['info', 'error', 'suggest'].forEach(t => {
    printer[t] = (content: any, user: String = DEFAULT_USER) => {
      switch (getType(content)) {
        case 'string':
          return print({
            format: `%c ${user} %c %s`,
            content,
            type: t
          });
        case 'object':
          return print({
            format: `%c ${user} %c %o`,
            content,
            type: t
          });
        default:
          return print({
            format: `%c ${user} %c %s`,
            content: '',
            type: t
          });
      }
    };
  });

  return printer;
}
