/**
 * @description deg mode bottom left empty algorithm
 * @author 阿怪
 * @date 2023/6/28 11:40
 * @version v1.0.0
 *
 * case: CBA    1110  14
 *       CB     0110  6
 *       C      0010  2
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { abs, CASE, DegModeOptions, getPoints, initCase, QPoints, tan } from './common';

export default function BLE(options: DegModeOptions): QPoints {
  const {
    w, h, degList, degDecimal,
    A, B, C, D,
  } = initCase(options);

  let { Pa, Pb, Pc, Pd } = getPoints();

  let Xc = w;
  let Ya = 0;
  if (degDecimal === CASE.CBA) {
    // A must (0,0)
    // Pa = {x:0,y:0}
    const Yb = tan(abs(A)) * w;
    Pb = { x: w, y: Yb };
    Xc = w - tan(abs(B)) * (h - Yb);
    Pc = { x: Xc, y: h };
  }

  if (degDecimal === CASE.CB) {
    // B must (w,0)
    Pb = { x: w, y: 0 };
    Xc = w - tan(abs(B)) * h;
    Ya = tan(abs(A)) * w;
    Pa = { x: 0, y: Ya };
    Pc = { x: Xc, y: h };
  }

  if (degDecimal === CASE.C) {
    // C must (w,h)
    Pc = { x: w, y: h };
    const Xb = w - tan(abs(B)) * h;
    Pb = { x: Xb, y: 0 };
    Ya = tan(abs(A)) * Xb;
    Pa = { x: 0, y: Ya };
  }


  const Kc = tan(C);
  const Kd = tan(90 - D) * -1;
  const yC = h - tan(C) * Xc;
  const Xd = Math.abs((Ya - yC) / (Kd - Kc));
  const Yd = Kc * Xd + yC;
  Pd = { x: Xd, y: Yd };

  return [Pa, Pb, Pc, Pd];

}
