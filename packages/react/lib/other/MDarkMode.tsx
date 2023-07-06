/**
 * @description react version MDarkMode
 * @author 阿怪
 * @date 2023/4/25 19:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React, { useState } from 'react';
import { DarkModeProps } from '@shuimo-design/core/lib/other/darkMode';
import { useDarkMode } from '@shuimo-design/core/lib/other/darkMode/useDarkMode';
import '@shuimo-design/core/lib/other/darkMode/darkMode.css';

export default function MDarkMode(props: DarkModeProps) {
  const { onMountedHook, toggleDarkMode } = useDarkMode();

  let isDarkMode = props.value;
  const clickHandler = () => {
    isDarkMode = !isDarkMode;
    toggleDarkMode({ value: !isDarkMode });
  };

  onMountedHook();

  const svg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" className="m-dark-mode-svg"
                   strokeWidth="1">
    <title>Dark Mode</title>
    <filter id="outset-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="black"/>
    </filter>
    <filter id="outset-shadow-white" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="white"/>
    </filter>
    <path
      className="svg-black"
      transform="translate(0)"
      fill="#000000"/>
    <path
      className="svg-white"
      transform="translate(0) rotate(180, 250, 250)"
      fill="#FFFFFF"/>
    <path
      className="fins"
      transform="translate(0)"
      fill="#000000"/>
    <circle className="svg-black" cx="250" cy="375" r="40"/>
    <circle className="svg-white" cx="250" cy="125" r="40" fill="#fff"/>
  </svg>;


  return <div className="m-dark-mode"
              onClick={() => clickHandler()}>
    {svg}
  </div>;

}
