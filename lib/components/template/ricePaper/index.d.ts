/**
 * @description rice paper api type
 * @author 阿怪
 * @date 2022/7/14 23:35
 * @version v1.0.0
 *
 * @name m-rice-paper
 * @docDescription Rice paper layout component with shuimo-ui style.
 *                  水墨组件的宣纸布局组件
 * @docUrl https://shuimo.design/rice-paper
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type RicePaperProps = {
  /**
   * @description 色调
   * @type 'cold' | 'warm' | 'default'
   * @default true
   */
  type?: 'cold' | 'warm' | 'default',
  /**
   * @description 是否显示山脉背景
   * @type boolean
   * @default true
   */
  mountain?: boolean
};
