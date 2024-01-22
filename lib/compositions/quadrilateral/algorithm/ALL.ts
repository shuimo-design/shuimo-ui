/**
 * @description all negative or not negative case
 * @author 阿怪
 * @date 2023/6/29 01:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DegModeOptions, getPoints, initCase, QPoints, tan } from './common';


export default function ALL_CASE(options: DegModeOptions): QPoints {
  let {
    w, h, degList, degDecimal,
    A, B, C, D,
  } = initCase(options);

  let { Pa, Pb, Pc, Pd } = getPoints();

  if (degList.every(d => d === 0)) {
    Pb = { x: w, y: 0 };
    Pc = { x: w, y: h };
    Pd = { x: 0, y: h };
    return [Pa, Pb, Pc, Pd];
  }

  if (A < 0) {
    A = 90 + A;
    B = 90 + B;
    C = 90 + C;
    D = 90 + D;
  }

  const tanD = tan(D);
  const tanA = tan(A);
  const tanB = tan(B);
  const tanC = tan(C);
  const tanDC = tanD * tanC;
  const tanDCB = tanDC * tanB;
  const tanAll = tanDCB * tanA;

  let Xa = w / 2;
  if (tanAll !== 1) {
    Xa = (h * tanD - w * tanDC + h * tanDCB - w * tanAll) / (1 - tanAll);
  }

  Pa = { x: Xa, y: 0 };
  const Yb = tanA * (w - Xa);
  Pb = { x: w, y: Yb };
  const Hb = h - Yb;
  const Xc = w - Hb * tanB;
  Pc = { x: Xc, y: h };
  const Hc = Xc * tanC;
  Pd = { x: 0, y: h - Hc };


  return [Pa, Pb, Pc, Pd];
}
