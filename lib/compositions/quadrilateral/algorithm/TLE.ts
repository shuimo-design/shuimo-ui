/**
 * @description deg mode top left empty algorithm
 * @author 阿怪
 * @date 2023/6/27 23:51
 * @version v1.0.0
 *
 * case: DCB  0111  7
 *       DC   0011  3
 *       D    0001  1
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { abs, CASE, DegModeOptions, getPoints, initCase, QPoints, tan } from './common';


export default function TLE(options: DegModeOptions): QPoints {
  const {
    w, h, degList, degDecimal,
    A, B, C, D,
  } = initCase(options);

  let { Pa, Pb, Pc, Pd } = getPoints();

  let Yd = h;
  let Xb = w;

  if (degDecimal === CASE.DCB) {
    // B must (w,0)
    Pb = { x: w, y: 0 };
    const Xc = w - tan(B) * h;
    Pc = { x: Xc, y: h };
    Yd = h - Xc * tan(C);
    Pd = { x: 0, y: Yd };
  }


  if (degDecimal === CASE.DC) {
    // C must (w,h)
    Pc = { x: w, y: h };
    Xb = w - tan(abs(B)) * h;
    Pb = { x: Xb, y: 0 };
    Yd = h - w * tan(C);
    Pd = { x: 0, y: Yd };
  }

  if (degDecimal === CASE.D) {
    // D must (0,h)
    Pd = { x: 0, y: h };
    const Yc = h - tan(abs(C)) * w;
    Pc = { x: w, y: Yc };
    Xb = w - tan(abs(B)) * Yc;
    Pb = { x: Xb, y: 0 };
  }

  const Ka = tan(A);
  const Kd = tan(90 - D) * -1;
  const yA = tan(-A) * Xb;
  const Xa = (yA - Yd) / (Kd - Ka);
  const Ya = Ka * Xa + yA;

  Pa = { x: Xa, y: Ya };

  return [Pa, Pb, Pc, Pd];

}
