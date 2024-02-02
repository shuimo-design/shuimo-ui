/**
 * @description quadrilateral options hook
 * @author 阿怪
 * @date 2023/6/23 18:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

const getLine = (line: CPoint): Point => {
  if (line == null) {
    console.error('line can not undefined!');
    return {};
  }
  if (typeof line === 'object') {
    return line;
  }
  if (typeof line === 'number' || !isNaN(Number(line))) {
    return { deg: Number(line) };
  }
  // match [?,?]
  const match = line.match(/\[(\d+),(\d+)]/);
  if (match) {
    const [, x, y] = match;
    return { x, y };
  }
  if (line.endsWith('deg')) {
    const deg = Number(line.replace('deg', ''));
    if (isNaN(deg)) {
      console.error('deg must be number!');
    }
    return { deg };
  }
  console.error(`can not resolve line: ${line}`);
  return {};
};

const pointsModeGetABCD = (points: string | number): Point[] => {
  if (typeof points === 'number') {
    return [{ deg: points }, { deg: points }, { deg: points }, { deg: points }];
  }
  let A: CPoint, B: CPoint, C: CPoint, D: CPoint;

  const lineList = points.trim().split(' ');
  const l = lineList.length;
  switch (l) {
    case 2:
      A = C = lineList[0];
      B = D = lineList[1];
      break;
    case 3:
      A = lineList[0];
      B = D = lineList[1];
      C = lineList[2];
      break;
    case 4:
      A = lineList[0];
      B = lineList[1];
      C = lineList[2];
      D = lineList[3];
      break;
    default: // case 1
      A = B = C = D = lineList[0];
  }
  return [getLine(A), getLine(B), getLine(C), getLine(D)];
};



export default function useQuadrilateralOptions(options: QOptions | string | number | CPoint[] | undefined) {
  if (Array.isArray(options)) {
    return quadrilateralOptions({ A: options[0], B: options[1], C: options[2], D: options[3] });
  }
  if (typeof options === 'object') {
    return quadrilateralOptions(options);
  }
  return quadrilateralOptions({ points: options });
}


const quadrilateralOptions = (options: QOptions) => {
  const { points } = options;
  let A: Point = {}, B: Point = {}, C: Point = {}, D: Point = {};

  if (points) {
    [A, B, C, D] = pointsModeGetABCD(points);
  }

  if (options.A) {A = getLine(options.A);}
  if (options.B) {B = getLine(options.B);}
  if (options.C) {C = getLine(options.C);}
  if (options.D) {D = getLine(options.D);}

  return {
    A, B, C, D
  };

};
