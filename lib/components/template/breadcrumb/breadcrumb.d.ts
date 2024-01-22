/**
 * @description breadcrumb api type
 * @author youus
 * @date 2023/12/19 23:05
 * @version v1.0.0
 *
 *
 * @name m-breadcrumb
 * @docDescription Breadcrumb component with shuimo-ui style.
 *                  水墨组件的面包屑组件。
 * @docUrl https://shuimo.design/breadcrumb
 *
 * Hello, humor
 */

export declare type BreadcrumbProps = {
  /**
   * @description 面包屑分隔符
   * @type string
   * @default ''
   */
  separator?:string,
  /**
   * @description 面包屑项
   * @type BreadcrumbItemProps[]
   * @default []
   */
  options?: Array<BreadcrumbItemProps>,
}

export declare type BreadcrumbItemProps = {
  /**
   * @description 面包屑项内容
   * @type string
   * @default ''
   */
  content?:string,
}
