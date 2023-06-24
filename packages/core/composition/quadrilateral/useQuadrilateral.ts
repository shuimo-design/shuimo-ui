/**
 * @description quadrilateral hook
 * @author 阿怪
 * @date 2023/6/22 03:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import useQuadrilateralOptions from './useQuadrilateralOptions';
/**
 * 目前前提是每个点都在边界上
 * The current premise is that each point is on the boundary
 *
 * 坐标不贴边场景可以考虑转margin
 */

const tan = (deg: number) => {
  return Math.round(Math.tan(deg * Math.PI / 180) * 1000000) / 1000000;
};

const transformPoint = (point: OptionPoints) => {
  return point;
};

type P = { x: number, y: number, deg?: number };
const getLineLength = (pointA: P, pointB: P) => {
  const { x: x1, y: y1 } = pointA;
  const { x: x2, y: y2 } = pointB;
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
};

const fillLength = (points: { A: P, B: P, C: P, D: P, }) => {
  return {
    A: { ...points.A, length: getLineLength(points.A, points.B) },
    B: { ...points.B, length: getLineLength(points.B, points.C) },
    C: { ...points.C, length: getLineLength(points.C, points.D) },
    D: { ...points.D, length: getLineLength(points.D, points.A) }
  };
};

const getPolygon = (w: number, h: number, points: { A: P, B: P, C: P, D: P, }) => {
  const toPec = (n: number, b: number) => {
    const r = n * 100 / b;
    return isNaN(r) ? 0 : r;
  };
  const { A, B, C, D } = points;

  return `polygon(${toPec(A.x, w)}% 0%, 100% ${toPec(B.y, h)}%, ${toPec(C.x, w)}% 100%, 0% ${toPec(D.y, h)}%)`;
};

const degMode = (w: number, h: number, degList: number[]) => {
  const [A, B, C, D] = degList;

  const tanA = tan(A ?? 0);
  const tanB = tan(B ?? 0);
  const tanC = tan(C ?? 0);
  const tanD = tan(D ?? 0);

  /**
   *  Yd * tan(D) = Xa
   *  h - Xc * tan(C) = Yd =>
   *  h * tan(D) - Xc * tan(C) * tan(D) = Xa
   *  hTanD - Xc * tanCD = Xa
   *  w - (H - Yb) * tan(B) = Xc
   *  hTanD - (w - (H - Yb) * tan(B)) * tanCD = Xa
   *  hTanD - w * tanCD + (H - Yb) * tan(B) * tanCD = Xa
   *  hTanD - wTanCD + hTanBCD - Yb * tanBCD = Xa
   *  before = hTanD - wTanCD + hTanBCD;
   *  before - Yb * tanBCD = Xa
   *  Yb = (w - Xa) * tan(A)
   *  before - (w - Xa) * tan(A) * tanBCD = Xa
   *  before - w * tanBCD + Xa * tan(A) * tanBCD = Xa
   */
  const tanAll = tanA * tanB * tanC * tanD;
  const before = h * tanD - w * tanC * tanD + h * tanB * tanC * tanD - w * tanB * tanC * tanD;

  // before + Xa * tanAll = Xa
  // Xa = before / (1 - tanAll)
  let Xa = before / (1 - tanAll);
  if (tanAll === 1) {
    Xa = w / 2;
  }

  // A: (Xa,0)
  // leftA =  w - Xa
  const Yb = (w - Xa) * tanA;

  // B: (w, Yb)
  const leftB = h - Yb;
  // xCLeft means w - Xc
  const xCLeft = leftB * tanB;
  const Xc = w - xCLeft;
  // C: (Xc, h)

  // yDLeft means h - Yd
  const yDLeft = Xc * tanC;
  const Yd = h - yDLeft;
  // D: (0, Yd)

  const points = {
    A: { x: Xa, y: 0, deg: A },
    B: { x: w, y: Yb, deg: B },
    C: { x: Xc, y: h, deg: C },
    D: { x: 0, y: Yd, deg: D }
  };
  return {
    ...fillLength(points),
    path: getPolygon(w, h, points)
  };

};


export default function useQuadrilateral(options: {
  w: number,
  h: number,
  options: COptions,
  mode?: 'deg' | 'coordinate'
}) {
  const { A, B, C, D } = useQuadrilateralOptions({
    points: options.options.points,
    A: options.options.a,
    B: options.options.b,
    C: options.options.c,
    D: options.options.d
  });

  const isXYEmpty = [A, B, C, D].every(e => e.x === undefined || e.y === undefined);
  const isDegMode = isXYEmpty || options.mode === 'deg';

  // deg mode
  const degList = [A, B, C, D].map(e => e.deg);
  if (isDegMode || degList.every(e => e !== undefined)) {
    return degMode(options.w, options.h, degList as number[]);
  }


  // coordinate mode


}
