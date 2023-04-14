/**
 * @description HTML
 * @author 阿怪
 * @date 2023/4/13 22:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
type Attrs = Record<string, any>;
type DOMAst = {
  name: string,
  attrs?: Attrs,
  innerHTML?: string,
  children?: Array<DOMAst>
}
