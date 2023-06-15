/**
 * @description avatar component with shuimo-ui style.
 * @author 阿怪
 * @date 2023/05/08 22:52
 * @version v1.0.0
 *
 * @name m-avatar
 * @docDescription avatar component with shuimo-ui style.
 * @docUrl https://shuimo.janghood.com/avatar,
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type AvatarProps = {
  /**
   * @description avatar variant
   *              头像的形状
   * @type string
   * @default circle
   */
  variant?: 'circle' | 'square';
  /**
   * @description avatar size
   *             头像的大小
   * @type string
   * @default default
   */
  size?: 'large' | 'default' | 'small';
  /**
   * @description img url
   *             头像图片地址
   * @type string
   * @default default
   */
  img?: string;
};
