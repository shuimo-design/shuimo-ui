/**
 * @description
 * @author 阿怪
 * @date 2024/4/4 01:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { zh } from '~/i18n/zh/zh';
import { en } from '~/i18n/en/en';


export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh',
  messages: {
    'zh': zh,
    en,
  },
}));
