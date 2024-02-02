/**
 * @description deg mode top right empty algorithm
 * @author 阿怪
 * @date 2023/6/28 17:48
 * @version v1.0.0
 *
 * case: DCA    1011  11
 *       DA     1001  9
 *       A      1000  8
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { abs, CASE, DegModeOptions, getPoints, initCase, QPoints, tan } from './common';


export default function TRE(options: DegModeOptions): QPoints {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    w, h, degList, degDecimal,
    A, B, C, D,
  } = initCase(options);

  let { Pa, Pb, Pc, Pd } = getPoints();

  let Yc = h;
  let Xa = 0;
  if (degDecimal === CASE.DCA) {
    // C must (w,h)
    Pc = { x: w, y: h };
    const Yd = h - tan(abs(C)) * w;
    Pd = { x: 0, y: Yd };
    Xa = Yd * tan(abs(D));
    Pa = { x: Xa, y: 0 };
  }

  if (degDecimal === CASE.DA) {
    // D must (0,h)
    Pd = { x: 0, y: h };
    Xa = h * tan(abs(D));
    Pa = { x: Xa, y: 0 };
    Yc = h - tan(abs(C)) * w;
    Pc = { x: w, y: Yc };
  }

  if (degDecimal === CASE.A) {
    // A must (0,0)
    Pa = { x: 0, y: 0 };
    const Xd = tan(abs(D)) * h;
    Pd = { x: Xd, y: h };
    Yc = h - tan(abs(C)) * (w - Xd);
    Pc = { x: w, y: Yc };
  }


  const Ka = tan(abs(A));
  const Ba = tan(A) * Xa * -1;
  const Kb = tan(90 + B);
  const Bb = (w + /* negative -> */tan(B) * Yc) * tan(90 - B);
  const Xb = (Ba - Bb) / (Kb - Ka);
  const Yb = Ka * Xb + Ba;
  Pb = { x: Xb, y: Yb };


  return [Pa, Pb, Pc, Pd];


}
