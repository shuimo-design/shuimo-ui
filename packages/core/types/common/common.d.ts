/**
 * @description common type
 * @author 阿怪
 * @date 2023/5/5 21:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export declare type MTeleportProps = {
  /**
   * @description teleport to
   *              传送到的位置
   * @type string
   * @default 'body'
   */
  to?: string | null | undefined; // support RendererElement
  // todo support disabled
};
