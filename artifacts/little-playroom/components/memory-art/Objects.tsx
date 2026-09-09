import React from 'react';
import { Circle, Ellipse, G, Path, Rect, Polygon, Line } from 'react-native-svg';
import type { ObjectSubject } from './types';

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

export const ObjectIllustrations: Record<ObjectSubject, () => React.JSX.Element> = {
  apple: () => (
    <G>
      <Path d="M 40 25 C 40 5 65 5 60 20 C 55 30 45 25 40 25 Z" fill={c.green} />
      <Path d="M 40 28 C 38 20 38 12 42 8" stroke={c.darkBrown} strokeWidth="4" strokeLinecap="round" fill="none" />
      <Path d="M 40 25 C 20 15 5 35 15 60 C 25 75 40 65 40 65 C 40 65 55 75 65 60 C 75 35 60 15 40 25 Z" fill={c.red} />
      <Path d="M 18 40 C 13 32 20 22 28 22" stroke={c.pink} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
    </G>
  ),
  car: () => (
    <G>
      <Path d="M 25 45 L 30 25 C 32 20 48 20 50 25 L 60 45 Z" fill={c.blue} />
      <Rect x="15" y="40" width="55" height="15" rx="5" fill={c.blue} />
      <Path d="M 28 40 L 32 27 L 40 27 L 40 40 Z" fill={c.lightBlue} />
      <Path d="M 43 40 L 43 27 L 48 27 L 55 40 Z" fill={c.lightBlue} />
      <Rect x="42" y="44" width="6" height="2" rx="1" fill={c.darkBlue} />
      <Ellipse cx="68" cy="45" rx="2" ry="4" fill={c.yellow} />
      <Ellipse cx="16" cy="45" rx="1.5" ry="3" fill={c.red} />
      <Circle cx="28" cy="55" r="8" fill={c.ink} />
      <Circle cx="55" cy="55" r="8" fill={c.ink} />
      <Circle cx="28" cy="55" r="3" fill={c.lightGrey} />
      <Circle cx="55" cy="55" r="3" fill={c.lightGrey} />
    </G>
  ),
  banana: () => (
    <G>
      <Path d="M 15 65 Q 40 85 70 20 Q 55 25 35 45 Q 20 55 15 65 Z" fill={c.yellow} />
      <Path d="M 68 22 Q 72 15 75 18 L 70 24 Z" fill={c.green} />
      <Path d="M 15 65 Q 12 68 18 64 Z" fill={c.brown} />
      <Path d="M 20 62 Q 40 75 65 25" stroke={c.orange} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
    </G>
  ),
  strawberry: () => (
    <G>
      <Path d="M 40 75 C 65 75 75 30 65 20 C 55 10 25 10 15 20 C 5 30 15 75 40 75 Z" fill={c.red} />
      <Ellipse cx="40" cy="35" rx="1.5" ry="2.5" fill={c.yellow} />
      <Ellipse cx="30" cy="45" rx="1.5" ry="2.5" fill={c.yellow} />
      <Ellipse cx="50" cy="45" rx="1.5" ry="2.5" fill={c.yellow} />
      <Ellipse cx="40" cy="55" rx="1.5" ry="2.5" fill={c.yellow} />
      <Ellipse cx="25" cy="30" rx="1.5" ry="2.5" fill={c.yellow} />
      <Ellipse cx="55" cy="30" rx="1.5" ry="2.5" fill={c.yellow} />
      <Path d="M 40 25 L 30 10 L 35 22 L 40 5 L 45 22 L 50 10 Z" fill={c.green} />
      <Rect x="38" y="2" width="4" height="10" fill={c.darkGreen} />
    </G>
  ),
  flower: () => (
    <G>
      <Rect x="38" y="40" width="4" height="35" fill={c.green} rx="2" />
      <Path d="M 38 60 C 25 65 15 55 20 45 C 25 45 35 50 38 60 Z" fill={c.green} />
      <Path d="M 42 50 C 55 55 65 45 60 35 C 55 35 45 40 42 50 Z" fill={c.green} />
      <Circle cx="40" cy="15" r="12" fill={c.pink} />
      <Circle cx="22" cy="28" r="12" fill={c.pink} />
      <Circle cx="58" cy="28" r="12" fill={c.pink} />
      <Circle cx="28" cy="45" r="12" fill={c.pink} />
      <Circle cx="52" cy="45" r="12" fill={c.pink} />
      <Circle cx="40" cy="32" r="10" fill={c.yellow} />
    </G>
  ),
  ball: () => (
    <G>
      <Circle cx="40" cy="40" r="28" fill={c.white} />
      <Path d="M 40 12 A 28 28 0 0 1 68 40 L 40 40 Z" fill={c.red} />
      <Path d="M 68 40 A 28 28 0 0 1 40 68 L 40 40 Z" fill={c.yellow} />
      <Path d="M 40 68 A 28 28 0 0 1 12 40 L 40 40 Z" fill={c.blue} />
      <Path d="M 12 40 A 28 28 0 0 1 40 12 L 40 40 Z" fill={c.green} />
      <Circle cx="40" cy="40" r="6" fill={c.white} />
      <Circle cx="40" cy="40" r="28" fill="none" stroke={c.ink} strokeWidth="1" opacity="0.1" />
    </G>
  ),
  boat: () => (
    <G>
      <Rect x="38" y="15" width="4" height="45" fill={c.brown} />
      <Path d="M 36 18 L 15 50 L 36 50 Z" fill={c.white} />
      <Path d="M 44 25 L 65 50 L 44 50 Z" fill={c.red} />
      <Path d="M 15 55 L 65 55 L 55 70 L 25 70 Z" fill={c.brown} />
      <Path d="M 5 65 Q 20 60 40 65 Q 60 70 75 65" stroke={c.blue} fill="none" strokeWidth="4" strokeLinecap="round" />
    </G>
  ),
  airplane: () => (
    <G>
      <Path d="M 45 42 L 55 25 L 60 42 Z" fill={c.darkBlue} />
      <Path d="M 20 40 L 10 25 L 25 35 Z" fill={c.blue} />
      <Path d="M 10 40 C 40 35 65 35 70 42 C 75 48 65 48 60 48 L 10 48 Z" fill={c.blue} />
      <Path d="M 35 45 L 25 65 L 45 55 L 50 45 Z" fill={c.blue} />
      <Path d="M 55 39 C 62 39 65 42 65 42 L 55 42 Z" fill={c.lightBlue} />
    </G>
  ),
  train: () => (
    <G>
      <Rect x="15" y="25" width="22" height="30" rx="2" fill={c.red} />
      <Rect x="37" y="35" width="28" height="20" rx="2" fill={c.blue} />
      <Rect x="12" y="55" width="56" height="8" rx="2" fill={c.ink} />
      <Rect x="52" y="20" width="8" height="15" fill={c.orange} />
      <Rect x="20" y="30" width="12" height="12" rx="2" fill={c.lightBlue} />
      <Circle cx="22" cy="65" r="7" fill={c.red} />
      <Circle cx="40" cy="65" r="7" fill={c.red} />
      <Circle cx="58" cy="65" r="7" fill={c.red} />
      <Circle cx="22" cy="65" r="2" fill={c.white} />
      <Circle cx="40" cy="65" r="2" fill={c.white} />
      <Circle cx="58" cy="65" r="2" fill={c.white} />
      <Circle cx="56" cy="12" r="5" fill={c.lightGrey} />
      <Circle cx="64" cy="5" r="7" fill={c.lightGrey} />
    </G>
  ),
  star: () => (
    <G>
      <Path d="M 40 10 L 47 30 L 70 30 L 51 44 L 58 66 L 40 52 L 22 66 L 29 44 L 10 30 L 33 30 Z" fill={c.yellow} stroke={c.yellow} strokeWidth="4" strokeLinejoin="round" />
    </G>
  ),
  kite: () => (
    <G>
      <Path d="M 40 55 Q 55 65 40 75" fill="none" stroke={c.ink} strokeWidth="2" />
      <Polygon points="45,63 50,60 50,66" fill={c.pink} />
      <Polygon points="45,63 40,60 40,66" fill={c.pink} />
      <Polygon points="48,70 53,67 53,73" fill={c.blue} />
      <Polygon points="48,70 43,67 43,73" fill={c.blue} />
      <Polygon points="40,5 65,30 40,55 15,30" fill={c.red} />
      <Line x1="40" y1="5" x2="40" y2="55" stroke={c.yellow} strokeWidth="2" />
      <Line x1="15" y1="30" x2="65" y2="30" stroke={c.yellow} strokeWidth="2" />
    </G>
  ),
  cupcake: () => (
    <G>
      <Path d="M 25 45 L 30 70 L 50 70 L 55 45 Z" fill={c.orange} />
      <Line x1="32" y1="45" x2="35" y2="70" stroke={c.brown} strokeWidth="2" opacity="0.3" />
      <Line x1="40" y1="45" x2="40" y2="70" stroke={c.brown} strokeWidth="2" opacity="0.3" />
      <Line x1="48" y1="45" x2="45" y2="70" stroke={c.brown} strokeWidth="2" opacity="0.3" />
      <Path d="M 20 45 C 20 20 60 20 60 45 Z" fill={c.pink} />
      <Circle cx="25" cy="45" r="8" fill={c.pink} />
      <Circle cx="35" cy="45" r="8" fill={c.pink} />
      <Circle cx="45" cy="45" r="8" fill={c.pink} />
      <Circle cx="55" cy="45" r="8" fill={c.pink} />
      <Path d="M 40 18 Q 45 10 50 12" fill="none" stroke={c.darkGreen} strokeWidth="2" />
      <Circle cx="40" cy="22" r="6" fill={c.red} />
      <Circle cx="38" cy="20" r="1.5" fill={c.white} />
    </G>
  ),
};
