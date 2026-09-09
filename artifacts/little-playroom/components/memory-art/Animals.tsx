import React from 'react';
import { Circle, Ellipse, G, Path, Rect, Polygon } from 'react-native-svg';
import type { AnimalSubject } from './types';

const c = {
  ink: '#2A3439',
  white: '#FFFFFF',
  red: '#DF4A41',
  darkRed: '#B2332B',
  pink: '#F08B9B',
  orange: '#E98736',
  lightOrange: '#FAD8B1',
  yellow: '#F3C146',
  lightYellow: '#FDF0C6',
  green: '#5E9F50',
  darkGreen: '#45793A',
  blue: '#3A82C4',
  lightBlue: '#A6D2EE',
  darkBlue: '#286299',
  brown: '#906042',
  lightBrown: '#C59A7A',
  darkBrown: '#6B4428',
  grey: '#92A3A8',
  lightGrey: '#D5DFE1',
};

export const AnimalIllustrations: Record<AnimalSubject, () => React.JSX.Element> = {
  cat: () => (
    <G>
      <Path d="M 60 55 C 75 55 75 35 65 35 C 55 35 60 45 55 45" fill="none" stroke={c.orange} strokeWidth="8" strokeLinecap="round" />
      <Path d="M 20 65 L 60 65 C 65 65 65 50 60 45 L 20 45 C 15 50 15 65 20 65 Z" fill={c.orange} />
      <Path d="M 25 50 L 55 50 L 50 30 L 30 30 Z" fill={c.orange} />
      <Path d="M 32 65 L 48 65 C 50 50 45 40 40 40 C 35 40 30 50 32 65 Z" fill={c.lightOrange} />
      <Ellipse cx="40" cy="35" rx="20" ry="16" fill={c.orange} />
      <Path d="M 25 25 L 20 10 L 35 20 Z" fill={c.orange} />
      <Path d="M 55 25 L 60 10 L 45 20 Z" fill={c.orange} />
      <Path d="M 25 23 L 23 15 L 32 21 Z" fill={c.pink} />
      <Path d="M 55 23 L 57 15 L 48 21 Z" fill={c.pink} />
      <Ellipse cx="40" cy="40" rx="10" ry="7" fill={c.lightOrange} />
      <Ellipse cx="40" cy="37" rx="3" ry="2" fill={c.pink} />
      <Circle cx="32" cy="33" r="3.5" fill={c.ink} />
      <Circle cx="48" cy="33" r="3.5" fill={c.ink} />
      <Circle cx="31" cy="32" r="1.2" fill={c.white} />
      <Circle cx="47" cy="32" r="1.2" fill={c.white} />
      <Path d="M 36 41 Q 40 44 40 41 Q 40 44 44 41" fill="none" stroke={c.ink} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 24 37 L 16 35 M 24 40 L 15 40 M 56 37 L 64 35 M 56 40 L 65 40" fill="none" stroke={c.ink} strokeWidth="1.5" strokeLinecap="round" />
      <Circle cx="34" cy="65" r="5" fill={c.lightOrange} />
      <Circle cx="46" cy="65" r="5" fill={c.lightOrange} />
      <Circle cx="22" cy="65" r="5" fill={c.orange} />
      <Circle cx="58" cy="65" r="5" fill={c.orange} />
    </G>
  ),
  dog: () => (
    <G>
      <Path d="M 55 55 Q 70 65 65 45" fill="none" stroke={c.brown} strokeWidth="7" strokeLinecap="round" />
      <Path d="M 20 65 L 60 65 C 65 65 65 50 60 45 L 20 45 C 15 50 15 65 20 65 Z" fill={c.brown} />
      <Path d="M 25 50 L 55 50 L 50 30 L 30 30 Z" fill={c.brown} />
      <Path d="M 32 65 L 48 65 C 50 50 45 40 40 40 C 35 40 30 50 32 65 Z" fill={c.lightBrown} />
      <Ellipse cx="40" cy="35" rx="18" ry="16" fill={c.brown} />
      <Path d="M 25 25 C 10 25 15 50 25 45 C 30 45 28 30 25 25 Z" fill={c.darkBrown} />
      <Path d="M 55 25 C 70 25 65 50 55 45 C 50 45 52 30 55 25 Z" fill={c.darkBrown} />
      <Ellipse cx="40" cy="40" rx="10" ry="7" fill={c.lightBrown} />
      <Ellipse cx="40" cy="38" rx="4" ry="2.5" fill={c.ink} />
      <Circle cx="33" cy="33" r="3.5" fill={c.ink} />
      <Circle cx="47" cy="33" r="3.5" fill={c.ink} />
      <Circle cx="32" cy="32" r="1.2" fill={c.white} />
      <Circle cx="46" cy="32" r="1.2" fill={c.white} />
      <Path d="M 37 42 Q 40 45 43 42" fill="none" stroke={c.ink} strokeWidth="1.5" strokeLinecap="round" />
      <Circle cx="34" cy="65" r="5" fill={c.lightBrown} />
      <Circle cx="46" cy="65" r="5" fill={c.lightBrown} />
      <Circle cx="22" cy="65" r="5" fill={c.brown} />
      <Circle cx="58" cy="65" r="5" fill={c.brown} />
    </G>
  ),
  rabbit: () => (
    <G>
      <Path d="M 35 30 L 30 5 C 35 0 40 5 40 10 Z" fill={c.lightGrey} />
      <Path d="M 45 30 L 50 5 C 45 0 40 5 40 10 Z" fill={c.lightGrey} />
      <Path d="M 35 25 L 32 10 C 35 7 37 10 38 15 Z" fill={c.pink} />
      <Path d="M 45 25 L 48 10 C 45 7 43 10 42 15 Z" fill={c.pink} />
      <Path d="M 22 65 L 58 65 C 65 65 60 45 50 40 L 30 40 C 20 45 15 65 22 65 Z" fill={c.lightGrey} />
      <Circle cx="62" cy="55" r="6" fill={c.white} />
      <Ellipse cx="40" cy="35" rx="16" ry="14" fill={c.lightGrey} />
      <Ellipse cx="40" cy="38" rx="8" ry="6" fill={c.white} />
      <Circle cx="33" cy="33" r="3" fill={c.ink} />
      <Circle cx="47" cy="33" r="3" fill={c.ink} />
      <Circle cx="32" cy="32" r="1" fill={c.white} />
      <Circle cx="46" cy="32" r="1" fill={c.white} />
      <Ellipse cx="40" cy="37" rx="3" ry="2" fill={c.pink} />
      <Path d="M 37 40 Q 40 42 43 40" fill="none" stroke={c.ink} strokeWidth="1.5" strokeLinecap="round" />
      <Ellipse cx="25" cy="63" rx="4" ry="6" fill={c.white} />
      <Ellipse cx="55" cy="63" rx="4" ry="6" fill={c.white} />
    </G>
  ),
  duck: () => (
    <G>
      <Path d="M 32 60 L 25 70 L 36 70 Z" fill={c.orange} />
      <Path d="M 48 60 L 44 70 L 55 70 Z" fill={c.orange} />
      <Ellipse cx="40" cy="50" rx="22" ry="16" fill={c.yellow} />
      <Path d="M 25 55 C 10 45 15 35 25 42 Z" fill={c.yellow} />
      <Path d="M 30 46 C 40 38 50 46 45 55 C 35 55 30 50 30 46 Z" fill="#E2AE29" />
      <Rect x="42" y="25" width="12" height="20" fill={c.yellow} />
      <Circle cx="48" cy="26" r="13" fill={c.yellow} />
      <Path d="M 58 24 Q 72 24 70 29 Q 62 32 58 29 Z" fill={c.orange} />
      <Circle cx="51" cy="23" r="3.5" fill={c.ink} />
      <Circle cx="50" cy="22" r="1.2" fill={c.white} />
    </G>
  ),
  elephant: () => (
    <G>
      <Rect x="25" y="45" width="10" height="25" rx="3" fill={c.grey} />
      <Rect x="45" y="45" width="10" height="25" rx="3" fill={c.grey} />
      <Ellipse cx="40" cy="45" rx="22" ry="20" fill={c.grey} />
      <Ellipse cx="20" cy="35" rx="12" ry="18" fill={c.lightGrey} />
      <Ellipse cx="60" cy="35" rx="12" ry="18" fill={c.lightGrey} />
      <Circle cx="40" cy="35" r="16" fill={c.grey} />
      <Path d="M 34 45 L 34 65 C 34 72 46 72 46 65 L 46 60 C 46 55 42 55 42 60 L 42 45 Z" fill={c.grey} />
      <Path d="M 32 45 C 28 50 25 55 25 50 Z" fill={c.white} />
      <Path d="M 48 45 C 52 50 55 55 55 50 Z" fill={c.white} />
      <Circle cx="32" cy="32" r="3" fill={c.ink} />
      <Circle cx="48" cy="32" r="3" fill={c.ink} />
      <Circle cx="31" cy="31" r="1" fill={c.white} />
      <Circle cx="47" cy="31" r="1" fill={c.white} />
    </G>
  ),
  bear: () => (
    <G>
      <Ellipse cx="40" cy="50" rx="20" ry="22" fill={c.brown} />
      <Ellipse cx="40" cy="55" rx="14" ry="16" fill={c.lightBrown} />
      <Circle cx="25" cy="25" r="8" fill={c.brown} />
      <Circle cx="55" cy="25" r="8" fill={c.brown} />
      <Circle cx="25" cy="25" r="4" fill={c.lightBrown} />
      <Circle cx="55" cy="25" r="4" fill={c.lightBrown} />
      <Circle cx="40" cy="35" r="18" fill={c.brown} />
      <Ellipse cx="40" cy="40" rx="10" ry="8" fill={c.lightBrown} />
      <Ellipse cx="40" cy="37" rx="4" ry="2.5" fill={c.ink} />
      <Circle cx="33" cy="31" r="3.5" fill={c.ink} />
      <Circle cx="47" cy="31" r="3.5" fill={c.ink} />
      <Circle cx="32" cy="30" r="1.2" fill={c.white} />
      <Circle cx="46" cy="30" r="1.2" fill={c.white} />
      <Path d="M 40 37 L 40 43 M 36 43 Q 40 46 44 43" fill="none" stroke={c.ink} strokeWidth="1.5" strokeLinecap="round" />
      <Circle cx="28" cy="65" r="6" fill={c.lightBrown} />
      <Circle cx="52" cy="65" r="6" fill={c.lightBrown} />
    </G>
  ),
  fox: () => (
    <G>
      <Path d="M 25 55 C 5 55 5 35 15 35 C 25 35 30 45 25 55 Z" fill={c.orange} />
      <Path d="M 15 35 C 10 40 10 50 15 50 C 18 50 20 40 15 35 Z" fill={c.white} />
      <Path d="M 25 65 L 55 65 C 60 65 60 50 55 45 L 25 45 C 20 50 20 65 25 65 Z" fill={c.orange} />
      <Path d="M 35 65 L 45 65 C 48 50 42 45 40 45 C 38 45 32 50 35 65 Z" fill={c.white} />
      <Ellipse cx="40" cy="35" rx="18" ry="14" fill={c.orange} />
      <Path d="M 22 35 C 22 45 58 45 58 35 C 58 42 40 50 22 35 Z" fill={c.white} />
      <Path d="M 25 25 L 20 10 L 35 20 Z" fill={c.orange} />
      <Path d="M 55 25 L 60 10 L 45 20 Z" fill={c.orange} />
      <Path d="M 25 23 L 23 15 L 32 21 Z" fill={c.ink} opacity="0.8" />
      <Path d="M 55 23 L 57 15 L 48 21 Z" fill={c.ink} opacity="0.8" />
      <Circle cx="40" cy="41" r="3" fill={c.ink} />
      <Circle cx="32" cy="33" r="3" fill={c.ink} />
      <Circle cx="48" cy="33" r="3" fill={c.ink} />
      <Circle cx="31" cy="32" r="1" fill={c.white} />
      <Circle cx="47" cy="32" r="1" fill={c.white} />
      <Circle cx="32" cy="65" r="5" fill={c.ink} opacity="0.8" />
      <Circle cx="48" cy="65" r="5" fill={c.ink} opacity="0.8" />
    </G>
  ),
  lion: () => (
    <G>
      <Path d="M 25 65 L 55 65 C 60 65 60 50 55 45 L 25 45 C 20 50 20 65 25 65 Z" fill={c.yellow} />
      <Path d="M 32 65 L 48 65 C 50 50 45 45 40 45 C 35 45 30 50 32 65 Z" fill={c.lightYellow} />
      <Circle cx="40" cy="35" r="22" fill={c.orange} />
      <Circle cx="28" cy="25" r="6" fill={c.yellow} />
      <Circle cx="52" cy="25" r="6" fill={c.yellow} />
      <Circle cx="40" cy="35" r="15" fill={c.yellow} />
      <Ellipse cx="40" cy="40" rx="8" ry="6" fill={c.lightYellow} />
      <Polygon points="37,38 43,38 40,42" fill={c.brown} />
      <Path d="M 40 42 L 40 45 M 37 45 Q 40 47 43 45" fill="none" stroke={c.brown} strokeWidth="1.5" strokeLinecap="round" />
      <Circle cx="34" cy="32" r="2.5" fill={c.ink} />
      <Circle cx="46" cy="32" r="2.5" fill={c.ink} />
      <Circle cx="30" cy="65" r="5" fill={c.yellow} />
      <Circle cx="50" cy="65" r="5" fill={c.yellow} />
    </G>
  ),
  turtle: () => (
    <G>
      <Circle cx="25" cy="55" r="6" fill={c.darkGreen} />
      <Circle cx="55" cy="55" r="6" fill={c.darkGreen} />
      <Circle cx="35" cy="57" r="5" fill={c.darkGreen} />
      <Circle cx="45" cy="57" r="5" fill={c.darkGreen} />
      <Path d="M 20 50 L 10 55 L 20 55 Z" fill={c.darkGreen} />
      <Path d="M 15 50 C 15 25 65 25 65 50 Z" fill={c.green} />
      <Path d="M 25 50 C 25 35 35 30 40 30 C 45 30 55 35 55 50 Z" fill={c.darkGreen} opacity="0.3" />
      <Circle cx="65" cy="45" r="8" fill={c.darkGreen} />
      <Ellipse cx="70" cy="45" rx="5" ry="3" fill={c.darkGreen} />
      <Circle cx="67" cy="43" r="2" fill={c.ink} />
      <Circle cx="67.5" cy="42.5" r="0.8" fill={c.white} />
    </G>
  ),
  fish: () => (
    <G>
      <Path d="M 25 40 L 10 25 L 10 55 Z" fill={c.orange} />
      <Path d="M 40 25 C 45 15 55 15 50 25 Z" fill={c.orange} />
      <Path d="M 40 55 C 45 65 55 65 50 55 Z" fill={c.orange} />
      <Ellipse cx="45" cy="40" rx="22" ry="16" fill={c.yellow} />
      <Circle cx="58" cy="35" r="3.5" fill={c.ink} />
      <Circle cx="59" cy="34" r="1.2" fill={c.white} />
      <Path d="M 65 42 Q 62 45 60 42" fill="none" stroke={c.orange} strokeWidth="2" strokeLinecap="round" />
      <Path d="M 35 32 Q 40 40 35 48 M 42 34 Q 47 40 42 46 M 28 34 Q 33 40 28 46" fill="none" stroke={c.orange} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </G>
  ),
  owl: () => (
    <G>
      <Circle cx="32" cy="65" r="4" fill={c.orange} />
      <Circle cx="48" cy="65" r="4" fill={c.orange} />
      <Ellipse cx="22" cy="45" rx="8" ry="18" fill={c.darkBrown} />
      <Ellipse cx="58" cy="45" rx="8" ry="18" fill={c.darkBrown} />
      <Ellipse cx="40" cy="45" rx="18" ry="22" fill={c.brown} />
      <Ellipse cx="40" cy="50" rx="12" ry="15" fill={c.lightBrown} />
      <Path d="M 35 45 Q 40 48 45 45 M 37 52 Q 40 55 43 52 M 35 59 Q 40 62 45 59" fill="none" stroke={c.brown} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 32 25 L 22 12 L 38 20 Z" fill={c.brown} />
      <Path d="M 48 25 L 58 12 L 42 20 Z" fill={c.brown} />
      <Circle cx="32" cy="30" r="11" fill={c.white} />
      <Circle cx="48" cy="30" r="11" fill={c.white} />
      <Circle cx="32" cy="30" r="4" fill={c.ink} />
      <Circle cx="48" cy="30" r="4" fill={c.ink} />
      <Circle cx="31" cy="29" r="1.5" fill={c.white} />
      <Circle cx="47" cy="29" r="1.5" fill={c.white} />
      <Polygon points="37,35 43,35 40,42" fill={c.orange} />
    </G>
  ),
  butterfly: () => (
    <G>
      <Ellipse cx="25" cy="30" rx="16" ry="16" fill={c.pink} />
      <Ellipse cx="55" cy="30" rx="16" ry="16" fill={c.pink} />
      <Ellipse cx="28" cy="50" rx="12" ry="14" fill={c.red} />
      <Ellipse cx="52" cy="50" rx="12" ry="14" fill={c.red} />
      <Circle cx="25" cy="30" r="4" fill={c.white} opacity="0.6" />
      <Circle cx="55" cy="30" r="4" fill={c.white} opacity="0.6" />
      <Circle cx="28" cy="50" r="3" fill={c.white} opacity="0.6" />
      <Circle cx="52" cy="50" r="3" fill={c.white} opacity="0.6" />
      <Path d="M 38 25 Q 30 10 25 15 M 42 25 Q 50 10 55 15" fill="none" stroke={c.ink} strokeWidth="1.5" strokeLinecap="round" />
      <Circle cx="25" cy="15" r="2" fill={c.ink} />
      <Circle cx="55" cy="15" r="2" fill={c.ink} />
      <Ellipse cx="40" cy="40" rx="4" ry="18" fill={c.ink} />
      <Circle cx="40" cy="22" r="5" fill={c.ink} />
    </G>
  ),
};
