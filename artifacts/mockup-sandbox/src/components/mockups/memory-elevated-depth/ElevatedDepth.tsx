import '../memory-art-directions/_group.css';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';

const ink = '#2B3438';
const svgProps = { 'aria-hidden': true, height: 74, viewBox: '0 0 80 80', width: 74 };

function Cat() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="cat-fur" x1="15" x2="63" y1="15" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4A33A" />
          <stop offset="1" stopColor="#D96F1E" />
        </linearGradient>
      </defs>
      <path d="M18 37 17 14q0-3 3-1l15 10q5-2 10 0l15-10q3-2 3 1l-1 23q0 20-10 27H28Q18 56 18 37Z" fill="url(#cat-fur)" />
      <path d="m21 18 11 8-10 6Zm38 0-11 8 10 6Z" fill="#FBCB91" />
      <path d="M26 40q0-14 14-19 14 5 14 19 0 15-14 24-14-9-14-24Z" fill="#F4A946" />
      <path d="M31 48q4-5 9-5t9 5q-2 8-9 10-7-2-9-10Z" fill="#FFE3B3" />
      <path d="M29 32q3-5 8-4m6 0q5-1 8 4" fill="none" stroke="#C7671C" strokeLinecap="round" strokeWidth="2" />
      <ellipse cx="33.5" cy="39" fill={ink} rx="3.5" ry="4.5" />
      <ellipse cx="46.5" cy="39" fill={ink} rx="3.5" ry="4.5" />
      <circle cx="34.5" cy="37.6" fill="#FFF9EF" r="1.2" />
      <circle cx="47.5" cy="37.6" fill="#FFF9EF" r="1.2" />
      <path d="m36.6 48 3.4-2 3.4 2-3.4 3ZM40 51q-1 4-5 4m5-4q1 4 5 4" fill="none" stroke={ink} strokeLinecap="round" strokeWidth="1.7" />
      <path d="M22 64q9 5 17 0m2 0q9 5 17 0" fill="none" stroke="#B9571B" strokeLinecap="round" strokeWidth="5" />
    </svg>
  );
}

function Duck() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="duck-body" x1="20" x2="60" y1="22" y2="66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5CF51" />
          <stop offset="1" stopColor="#DDA52B" />
        </linearGradient>
      </defs>
      <path d="M22 52q-3-13 5-22 7-8 17-7 12 1 16 12 2 7-2 12 8 2 10 8-5 8-16 8H32q-9 0-10-11Z" fill="url(#duck-body)" />
      <path d="M31 39q8-10 18-2 4 5 1 10-9 5-18 0Z" fill="#E4B22F" />
      <path d="M56 35q10-4 16 2-3 7-15 7Z" fill="#E77E34" />
      <path d="M30 22q0-7 5-10 6 4 4 11" fill="#F5CE51" />
      <circle cx="51" cy="29" fill={ink} r="2.5" />
      <circle cx="51.8" cy="28.2" fill="#FFF9EF" r=".8" />
      <path d="M27 62q9 4 17 0m-5-33q-2-4 1-8" fill="none" stroke="#C68E22" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Elephant() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="elephant-body" x1="16" x2="64" y1="18" y2="66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B2CCD3" />
          <stop offset="1" stopColor="#789DAE" />
        </linearGradient>
      </defs>
      <path d="M17 45q0-19 22-27 20 5 24 24v12q-2 10-13 12H29Q18 65 17 55Z" fill="url(#elephant-body)" />
      <path d="M25 29Q11 21 10 38q0 15 14 17l7-8q-7-3-7-10 0-6 8-6Z" fill="#C3D9DE" />
      <path d="M55 29q14-8 15 9 0 15-14 17l-7-8q7-3 7-10 0-6-8-6Z" fill="#A9C4CD" />
      <path d="M37 38q0 15 3 22 2 4 5 0 3-5 0-11l-1-12q-1-5-5-3Z" fill="#6C91A2" />
      <circle cx="31" cy="36" fill={ink} r="2.6" />
      <circle cx="49" cy="36" fill={ink} r="2.6" />
      <path d="M34 49q6 4 12 0M24 63q5 3 9 0m14 0q5 3 9 0" fill="none" stroke="#5E8495" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Apple() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="apple-skin" x1="18" x2="59" y1="21" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F06455" />
          <stop offset="1" stopColor="#C83F43" />
        </linearGradient>
      </defs>
      <path d="M40 28q-9-8-19-1-10 8-5 25 5 17 16 19 5 1 8-3 3 4 8 3 12-2 17-19 5-17-5-25-10-7-20 1Z" fill="url(#apple-skin)" />
      <path d="M39.5 28q-1-9 6-16" fill="none" stroke="#754A2C" strokeLinecap="round" strokeWidth="3.2" />
      <path d="M45 14q9-6 18-2-3 10-18 10Z" fill="#72A568" />
      <path d="M22 37q3-7 8-9" fill="none" stroke="#FFAA8B" strokeLinecap="round" strokeWidth="3.5" />
      <path d="M52 62q-7 5-13 4" fill="none" stroke="#B7343D" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Car() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="car-paint" x1="15" x2="65" y1="24" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4CA6C0" />
          <stop offset="1" stopColor="#27779F" />
        </linearGradient>
      </defs>
      <path d="m11 48 7-15q2-6 10-7h20q7 1 10 7l8 15q4 2 4 7v7H9v-9q0-4 2-5Z" fill="url(#car-paint)" />
      <path d="m24 30-5 15h20V30Zm17 0v15h21l-7-12q-2-3-6-3Z" fill="#C9E4E7" />
      <path d="M41 30v15" stroke="#216B8A" strokeWidth="2" />
      <path d="M12 52h6m48 0h4" stroke="#F6CC45" strokeLinecap="round" strokeWidth="3.5" />
      <circle cx="24" cy="63" fill="#29424D" r="8" />
      <circle cx="57" cy="63" fill="#29424D" r="8" />
      <circle cx="24" cy="63" fill="#E3E5DB" r="3.5" />
      <circle cx="57" cy="63" fill="#E3E5DB" r="3.5" />
      <path d="M17 47q10-3 18-1" fill="none" stroke="#78C0D0" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Bear() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="bear-fur" x1="18" x2="60" y1="18" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B7835B" />
          <stop offset="1" stopColor="#8F5F46" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="25" fill="#966448" r="11" />
      <circle cx="56" cy="25" fill="#966448" r="11" />
      <path d="M19 40q0-21 21-22 21 1 21 22v12q0 18-21 18T19 52Z" fill="url(#bear-fur)" />
      <ellipse cx="40" cy="49" fill="#E2B58B" rx="12" ry="10" />
      <ellipse cx="32" cy="38" fill={ink} rx="2.8" ry="3.3" />
      <ellipse cx="48" cy="38" fill={ink} rx="2.8" ry="3.3" />
      <path d="m37 47 3-2 3 2-3 3Zm3 3q-1 4-5 4m5-4q1 4 5 4" fill="none" stroke={ink} strokeLinecap="round" strokeWidth="1.7" />
      <path d="M26 63q8 4 14 0m4 0q6 4 14 0" fill="none" stroke="#7C503D" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

function renderArtwork(subject: PreviewSubject) {
  return { cat: <Cat />, duck: <Duck />, elephant: <Elephant />, apple: <Apple />, car: <Car />, bear: <Bear /> }[subject];
}

export default function ElevatedDepth() {
  return <MemoryBoard direction="Soft Depth C" note="A little light and shadow, nothing extra." renderArtwork={renderArtwork} />;
}