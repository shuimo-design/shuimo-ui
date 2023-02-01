/**
 * @description TaiChi svg
 * @author 阿怪
 * @date 2023/1/31 11:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
export const TaiChiSvg =
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" class="m-tai-chi-svg"
       m-name="TaiChiSvg"
       stroke-width="1">
    <title m-name="title">Tai Chi</title>
    <filter m-name="filter-black" id="outset-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow m-name="shadow" dx="0" dy="0" stdDeviation="20" flood-color="black"/>
    </filter>
    <filter m-name="filter-white" id="outset-shadow-white" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow m-name="shadow" dx="0" dy="0" stdDeviation="20" flood-color="white"/>
    </filter>
    <path
      m-name="TaiChiSvg-g-black"
      class="svg-black"
      transform="translate(0)"
      fill="#000000"/>
    <path
      m-name="TaiChiSvg-g-white"
      class="svg-white"
      transform="translate(0) rotate(180, 250, 250)"
      fill="#FFFFFF"/>
    <path
      m-name="TaiChiSvg-g-black-2"
      class="svg-black dark-hidden"
      transform="translate(0)"
      fill="#000000"/>


    <circle m-name="TaiChiSvg-g-g-circle" class="svg-black" cx="250" cy="375" r="40"/>


    <circle m-name="TaiChiSvg-g-g-circle-2" class="svg-white" cx="250" cy="125" r="40"
            fill="#fff"/>
  </svg>;
