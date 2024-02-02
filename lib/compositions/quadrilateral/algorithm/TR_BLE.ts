/**
 * @description deg mode top right and bottom left empty algorithm
 * @author 阿怪
 * @date 2023/6/29 00:58
 * @version v1.0.0
 *
 * case: DB 1010 10
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DegModeOptions, getPoints, initCase, QPoints, tan } from './common';

export default function TR_BLE(options: DegModeOptions): QPoints {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    w, h, degList, degDecimal,
    A, B, C, D,
  } = initCase(options);

  let { Pa, Pb, Pc, Pd } = getPoints();

  Pa = { x: 0, y: 0 };
  Pc = { x: w, y: h };

  const Ka = tan(A);
  const Ba = 0;
  const Kb = 1 / tan(-B);
  const Bb = -1 * (w - tan(-B) * h) * Kb;

  const Xb = (Ba - Bb) / (Kb - Ka);
  const Yb = Ka * Xb + Ba;
  Pb = { x: Xb, y: Yb };

  const Bc = h - w * tan(C);
  const Kc = (h - Bc) / w;

  const Kd = tan(90 - D) * -1;
  const Bd = 0;

  const Xd = (Bd - Bc) / (Kc - Kd);
  const Yd = Kc * Xd + Bc;
  Pd = { x: Xd, y: Yd };


  return [Pa, Pb, Pc, Pd];

}
