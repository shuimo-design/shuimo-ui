/**
 * @description quadrilateral types
 * @author 阿怪
 * @date 2023/6/23 20:26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

type Point = {
  x?: number | string,
  y?: number | string,
  deg?: number
}

type OPoint = Pick<Point, 'x' | 'y' | 'deg'>;

// type OptionPoints = CPoint[] | number | string; not support now
type OptionPoints = number | string;
type OptionPoint = OPoint | number | string;

type CPoint = OptionPoint | undefined;
type COptions = {
  points?: string | number,
  a?: CPoint, b?: CPoint, c?: CPoint, d?: CPoint,
}
type QOptions = {
  points?: string | number,
  A?: CPoint, B?: CPoint, C?: CPoint, D?: CPoint,
}
