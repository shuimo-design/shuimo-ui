/**
 * @description common utils
 * @author 阿怪
 * @date 2023/6/27 23:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
export const tan = (deg: number) => {
  return Math.round(Math.tan(deg * Math.PI / 180) * 1000000) / 1000000;
};
export const sin = (deg: number) => {
  return Math.round(Math.sin(deg * Math.PI / 180) * 1000000) / 1000000;
};
export const cos = (deg: number) => {
  return Math.round(Math.cos(deg * Math.PI / 180) * 1000000) / 1000000;
};


/**
 * deg case
 * A B C D means that deg is positive number or 0
 */
export enum CASE {
  NO = 0, // 0000
  D, // 0001
  C, // 0010
  DC,// 0011
  B,// 0100
  DB,// 0101
  CB,// 0110
  DCB,// 0111
  A,// 1000
  DA,// 1001
  CA,// 1010
  DCA,// 1011
  BA,// 1100
  DBA,// 1101
  CBA,// 1110
  ALL,// 1111
}

/**
 * E means empty
 * T means top
 * B means bottom
 * R means right
 * L means left
 */
export enum ALGORITHM {
  ALL,
  TLE,
  BLE,
  TRE,
  BRE,
  TL_BRE,
  TR_BLE,
}

export const CASE_ALGORITHM = {
  [CASE.NO]: ALGORITHM.ALL,
  [CASE.D]: ALGORITHM.TLE,
  [CASE.C]: ALGORITHM.BLE,
  [CASE.DC]: ALGORITHM.TLE,
  [CASE.B]: ALGORITHM.BRE,
  [CASE.DB]: ALGORITHM.TL_BRE,
  [CASE.CB]: ALGORITHM.BLE,
  [CASE.DCB]: ALGORITHM.TLE,
  [CASE.A]: ALGORITHM.TRE,
  [CASE.DA]: ALGORITHM.TRE,
  [CASE.CA]: ALGORITHM.TR_BLE,
  [CASE.DCA]: ALGORITHM.TRE,
  [CASE.BA]: ALGORITHM.BRE,
  [CASE.DBA]: ALGORITHM.BRE,
  [CASE.CBA]: ALGORITHM.BLE,
  [CASE.ALL]: ALGORITHM.ALL,
};


export type DegModeOptions = {
  w: number;
  h: number;
  degList: number[];
  degDecimal: CASE
}

export type QPoint = {
  x: number;
  y: number;
}

export type ResPoint = QPoint & {
  length: number;
  position?: {
    left?: number,
    top?: number,
    right?: number,
    bottom?: number
  }
  deg?: number;
}

export type QPoints = QPoint[];

export type QRes = QPoints & {
  path: string
}


export const getPolygon = (w: number, h: number, points: { A: ResPoint, B: ResPoint, C: ResPoint, D: ResPoint, }) => {
  const toPec = (n: number, b: number) => {
    const r = n * 100 / b;
    return isNaN(r) ? 0 : r;
  };
  const tw = (n: number) => toPec(n, w);
  const th = (n: number) => toPec(n, h);
  const { A, B, C, D } = points;
  const info = {
    A: { x: tw(A.x), y: th(A.y) },
    B: { x: tw(B.x), y: th(B.y) },
    C: { x: tw(C.x), y: th(C.y) },
    D: { x: tw(D.x), y: th(D.y) },
  };

  return `polygon(${info.A.x}% ${info.A.y}%, ${info.B.x}% ${info.B.y}%, ${info.C.x}% ${info.C.y}%, ${info.D.x}% ${info.D.y}%)`;
};


export const getLineLength = (pointA: QPoint, pointB: QPoint) => {
  const { x: x1, y: y1 } = pointA;
  const { x: x2, y: y2 } = pointB;
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
};

export const { abs } = Math;


export const initCase = (options: DegModeOptions) => {
  const { w, h, degList, degDecimal } = options;
  /* eslint-disable prefer-const */
  let [A, B, C, D] = degList;

  return {
    w, h, degList, degDecimal,
    A, B, C, D,

  };
};

export const getPoints = () => {
  const EP = { x: 0, y: 0 }; // empty point
  let Pa: QPoint = EP, Pb: QPoint = EP, Pc: QPoint = EP, Pd: QPoint = EP;
  return {
    Pa, Pb, Pc, Pd
  };
};

export const toRes = (points: QPoint[], degList: number[]) => {
  const [Pa, Pb, Pc, Pd] = points;
  const [A, B, C, D] = degList;

  return {
    A: { ...Pa, length: getLineLength(Pa, Pb), deg: A },
    B: { ...Pb, length: getLineLength(Pb, Pc), deg: B },
    C: { ...Pc, length: getLineLength(Pc, Pd), deg: C },
    D: { ...Pd, length: getLineLength(Pd, Pa), deg: D }
  };
};
