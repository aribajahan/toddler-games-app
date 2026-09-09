import React from 'react';
import Svg, { Circle, Ellipse, G, Line, Path, Rect } from 'react-native-svg';

export type MemorySubject = 'cat' | 'duck' | 'elephant' | 'apple' | 'car' | 'bear';

type IllustrationProps = {
  subject: MemorySubject;
  size?: number;
};

const INK = '#24313D';
const STROKE = 2.6;

function Cat() {
  return (
    <G stroke={INK} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20 31 L18 15 L29 22 Q40 16 51 22 L62 15 L60 32" fill="#F3A55B" />
      <Path d="M20 30 Q21 53 40 55 Q59 53 60 30 Q56 20 40 20 Q24 20 20 30Z" fill="#F3A55B" />
      <Path d="M25 21 L21 18 L22 27" fill="#F9D2A7" stroke="none" />
      <Path d="M55 21 L59 18 L58 27" fill="#F9D2A7" stroke="none" />
      <Circle cx="32" cy="35" r="2" fill={INK} stroke="none" />
      <Circle cx="48" cy="35" r="2" fill={INK} stroke="none" />
      <Path d="M37 41 Q40 44 43 41 Q40 38 37 41Z" fill="#E77878" />
      <Path d="M40 44 Q36 49 32 45 M40 44 Q44 49 48 45" fill="none" />
      <Line x1="27" y1="41" x2="16" y2="39" />
      <Line x1="27" y1="45" x2="16" y2="47" />
      <Line x1="53" y1="41" x2="64" y2="39" />
      <Line x1="53" y1="45" x2="64" y2="47" />
    </G>
  );
}

function Duck() {
  return (
    <G stroke={INK} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <Ellipse cx="41" cy="48" rx="22" ry="15" fill="#F3C84B" />
      <Circle cx="47" cy="28" r="15" fill="#F3C84B" />
      <Path d="M33 26 Q28 22 27 17 Q34 18 39 23" fill="#F3C84B" />
      <Circle cx="51" cy="26" r="2" fill={INK} stroke="none" />
      <Path d="M59 31 Q70 30 72 35 Q66 41 57 37Z" fill="#F08A4B" />
      <Path d="M24 47 Q37 38 48 48 Q38 59 26 56" fill="#E9B52E" />
      <Line x1="34" y1="63" x2="32" y2="69" />
      <Line x1="50" y1="63" x2="52" y2="69" />
      <Line x1="27" y1="69" x2="35" y2="69" />
      <Line x1="49" y1="69" x2="57" y2="69" />
    </G>
  );
}

function Elephant() {
  return (
    <G stroke={INK} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <Ellipse cx="40" cy="43" rx="24" ry="21" fill="#9FB9C7" />
      <Ellipse cx="24" cy="40" rx="13" ry="17" fill="#B9CED8" />
      <Ellipse cx="56" cy="40" rx="13" ry="17" fill="#B9CED8" />
      <Path d="M34 38 Q34 61 42 65 Q49 65 49 59 Q43 61 43 51 L43 38Z" fill="#9FB9C7" />
      <Circle cx="32" cy="36" r="2" fill={INK} stroke="none" />
      <Circle cx="48" cy="36" r="2" fill={INK} stroke="none" />
      <Path d="M35 47 Q40 51 45 47" fill="none" />
      <Path d="M19 57 L18 68 M30 61 L30 69 M51 61 L51 69 M62 57 L63 68" fill="none" />
      <Line x1="14" y1="69" x2="22" y2="69" />
      <Line x1="26" y1="69" x2="34" y2="69" />
      <Line x1="47" y1="69" x2="55" y2="69" />
      <Line x1="59" y1="69" x2="67" y2="69" />
    </G>
  );
}

function Apple() {
  return (
    <G stroke={INK} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M40 28 Q25 20 18 35 Q12 51 24 65 Q32 72 40 66 Q48 72 56 65 Q68 51 62 35 Q55 20 40 28Z" fill="#E7655E" />
      <Path d="M40 27 Q39 18 44 11" fill="none" />
      <Path d="M43 17 Q53 10 61 17 Q54 26 43 22Z" fill="#6FAE71" />
      <Path d="M26 39 Q29 32 35 31" fill="none" stroke="#F5A29B" />
      <Circle cx="33" cy="48" r="2" fill={INK} stroke="none" />
      <Circle cx="48" cy="48" r="2" fill={INK} stroke="none" />
      <Path d="M34 56 Q40 61 47 55" fill="none" />
    </G>
  );
}

function Car() {
  return (
    <G stroke={INK} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M14 48 L19 35 Q22 30 29 30 L49 30 Q55 30 59 36 L67 48 Q71 49 71 55 L71 61 L9 61 L9 54 Q9 49 14 48Z" fill="#67AFC8" />
      <Path d="M26 34 L22 46 L42 46 L42 34Z" fill="#DDF1F5" />
      <Path d="M46 34 L46 46 L62 46 L55 36 Q53 34 49 34Z" fill="#DDF1F5" />
      <Circle cx="23" cy="61" r="8" fill="#FFFFFF" />
      <Circle cx="58" cy="61" r="8" fill="#FFFFFF" />
      <Circle cx="23" cy="61" r="3" fill="#7E8A92" stroke="none" />
      <Circle cx="58" cy="61" r="3" fill="#7E8A92" stroke="none" />
      <Circle cx="15" cy="52" r="2.5" fill="#FFF0C6" stroke="none" />
      <Circle cx="65" cy="52" r="2.5" fill="#F16E61" stroke="none" />
    </G>
  );
}

function Bear() {
  return (
    <G stroke={INK} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="23" cy="23" r="9" fill="#A97452" />
      <Circle cx="57" cy="23" r="9" fill="#A97452" />
      <Circle cx="40" cy="35" r="22" fill="#B9825C" />
      <Ellipse cx="40" cy="61" rx="21" ry="17" fill="#B9825C" />
      <Circle cx="32" cy="33" r="2" fill={INK} stroke="none" />
      <Circle cx="48" cy="33" r="2" fill={INK} stroke="none" />
      <Ellipse cx="40" cy="43" rx="10" ry="8" fill="#E8C3A2" />
      <Path d="M37 41 Q40 44 43 41 Q40 38 37 41Z" fill={INK} />
      <Path d="M40 44 Q36 49 32 45 M40 44 Q44 49 48 45" fill="none" />
      <Circle cx="20" cy="57" r="7" fill="#B9825C" />
      <Circle cx="60" cy="57" r="7" fill="#B9825C" />
      <Ellipse cx="30" cy="72" rx="8" ry="5" fill="#E8C3A2" />
      <Ellipse cx="50" cy="72" rx="8" ry="5" fill="#E8C3A2" />
    </G>
  );
}

export function MemoryIllustration({ subject, size = 72 }: IllustrationProps) {
  const illustration = {
    cat: <Cat />,
    duck: <Duck />,
    elephant: <Elephant />,
    apple: <Apple />,
    car: <Car />,
    bear: <Bear />,
  }[subject];

  return (
    <Svg
      focusable={false}
      height={size}
      viewBox="0 0 80 80"
      width={size}
    >
      {illustration}
    </Svg>
  );
}