/**
 * @description deg mode bottom right empty algorithm
 * @author 阿怪
 * @date 2023/6/28 21:59
 * @version v1.0.0
 *
 * case: DBA    1101  13
 *       BA     1100  12
 *       B      0100  4
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { abs, CASE, DegModeOptions, getPoints, initCase, QPoints, tan } from './common';

export default function BRE(options: DegModeOptions): QPoints {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    w, h, degList, degDecimal,
    A, B, C, D,
  } = initCase(options);


  let { Pa, Pb, Pc, Pd } = getPoints();

  let Yb = 0;
  let Xd = 0;
  if (degDecimal === CASE.DBA) {
    // D must (0,h)
    Pd = { x: Xd, y: h };
    const Xa = tan(abs(D)) * h;
    Pa = { x: Xa, y: 0 };
    Yb = tan(abs(A)) * (w - Xa);
    Pb = { x: w, y: Yb };
  }

  if (degDecimal === CASE.BA) {
    // A must (0,0)
    // Pa = { x: 0, y: 0 };
    Yb = tan(A) * w;
    Pb = { x: w, y: Yb };
    Xd = tan(abs(D)) * h;
    Pd = { x: Xd, y: h };
  }

  if (degDecimal === CASE.B) {
    // B must (w,0)
    Pb = { x: w, y: Yb };
    const Ya = tan(abs(A)) * h;
    Pa = { x: 0, y: Ya };
    const Wd = w - Ya;
    Xd = Wd * tan(abs(D));
    Pd = { x: Xd, y: h };
  }


  let Kb = 0;
  let Bb = h;

  // not vertical scene
  if (tan(B) !== 0) {
    Kb = (Yb - h) / ((h - Yb) * tan(B));
    Bb = Yb - Kb * w;
    const Cy = h - (w - Xd) * tan(abs(C));
    const Kc = (Cy - h) / (w - Xd);
    const Bc = h - (Kc * Xd);


    const Xc = (Bb - Bc) / (Kc - Kb);
    const Yc = Kb * Xc + Bb;
    Pc = { x: Xc, y: Yc };
  } else {
    const Yc = h - (w - Xd) * tan(-C);
    Pc = { x: w, y: Yc };
  }

  return [Pa, Pb, Pc, Pd];


}
