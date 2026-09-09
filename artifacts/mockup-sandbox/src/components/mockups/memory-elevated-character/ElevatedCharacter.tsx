import type { ReactNode } from 'react';
import '../memory-art-directions/_group.css';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';

const ink = '#24313D';

function Art({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden="true" focusable="false" height="74" viewBox="0 0 80 80" width="74">
      {children}
    </svg>
  );
}

function Cat() {
  return (
    <Art>
      <path
        d="M19 38 18 14q0-3 3-1l14 10q5-2 10 0l14-10q3-2 3 1l-1 24q-1 22-21 26-20-4-21-26Z"
        fill="#E88727"
      />
      <path d="m22 18 10 8-9 4Zm36 0-10 8 9 4Z" fill="#F7BD88" />
      <path d="M24 39q0-16 16-18 16 2 16 18 0 18-16 22-16-4-16-22Z" fill="#F09A2E" />
      <path d="M30 29q3-4 7-2m6 0q4-2 7 2" fill="none" stroke="#B96822" strokeLinecap="round" strokeWidth="2" />
      <ellipse cx="40" cy="48" fill="#FFE1AE" rx="11" ry="10" />
      <ellipse cx="33" cy="39" fill={ink} rx="3.1" ry="4.2" />
      <ellipse cx="47" cy="39" fill={ink} rx="3.1" ry="4.2" />
      <circle cx="34" cy="38" fill="#FFF8E9" r="1.1" />
      <circle cx="48" cy="38" fill="#FFF8E9" r="1.1" />
      <path d="m40 46-3 2q3 3 6 0Zm0 3q-1 5-5 5m5-5q1 5 5 5M26 48l-11-2m11 7-10 3m38-8 11-2m-11 7 10 3" fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M23 59q-2 8 5 9h7q-1-7-7-9Zm22 0q-1 7-1 9h8q6-1 3-9Z" fill="#DF7D22" />
      <path d="M57 58q13 2 12-9-1-7-8-7" fill="none" stroke="#E88727" strokeLinecap="round" strokeWidth="6" />
    </Art>
  );
}

function Duck() {
  return (
    <Art>
      <path d="M27 49q-2-16 11-22 10-5 20 3 6 5 4 13 7 2 8 8-3 8-14 6-5 9-17 11H24q0-12 9-15-5-1-6-4Z" fill="#E4B536" />
      <path d="M40 30q-5-8-1-15 8 3 9 12Z" fill="#F0C84B" />
      <path d="M57 37q10-3 17 2-4 8-16 6Z" fill="#E77F3C" />
      <path d="M30 46q8-8 18 1-3 9-15 8Z" fill="#F3C945" />
      <circle cx="54" cy="29" fill={ink} r="2.7" />
      <circle cx="55" cy="28" fill="#FFF8E9" r="0.8" />
      <path d="M39 64v6m16-7v7m-20 0h9m6 0h9" fill="none" stroke={ink} strokeLinecap="round" strokeWidth="2.2" />
      <path d="M39 25q-2-5 1-9" fill="none" stroke="#D99B25" strokeLinecap="round" strokeWidth="1.8" />
    </Art>
  );
}

function Elephant() {
  return (
    <Art>
      <path d="M18 43q0-22 22-25 22 3 22 25v12q-2 10-22 10T18 55Z" fill="#89AAB9" />
      <path d="M24 28Q11 22 10 38q0 16 14 17l4-7q-8-2-8-10 0-6 8-5Zm32 0q13-6 14 10 0 16-14 17l-4-7q8-2 8-10 0-6-8-5Z" fill="#AFC6CF" />
      <path d="M36 39v15q0 11 8 10 7-2 3-8-5 2-6-5V40q0-4-5-1Z" fill="#789BAA" />
      <ellipse cx="32" cy="37" fill={ink} rx="2.7" ry="3.2" />
      <ellipse cx="50" cy="37" fill={ink} rx="2.7" ry="3.2" />
      <circle cx="33" cy="36" fill="#F7FBF7" r="0.8" />
      <circle cx="51" cy="36" fill="#F7FBF7" r="0.8" />
      <path d="M35 49q5 4 10 0m-20 9-1 10m12-9v9m16-10 1 10m8-11 2 10M20 70h8m6 0h8m8 0h8m3 0h7" fill="none" stroke={ink} strokeLinecap="round" strokeWidth="2" />
      <path d="M18 31q-4-4-3-9" fill="none" stroke="#789BAA" strokeLinecap="round" strokeWidth="2.2" />
    </Art>
  );
}

function Apple() {
  return (
    <Art>
      <path d="M40 27q-10-8-20-1-11 8-6 25 5 18 17 19 6 1 9-3 3 4 9 3 12-1 17-19 5-17-6-25-10-7-20 1Z" fill="#D9544E" />
      <path d="M40 27q-1-10 6-16" fill="none" stroke="#70472E" strokeLinecap="round" strokeWidth="3.2" />
      <path d="M45 14q9-6 18-2-3 10-18 10Z" fill="#6FA268" />
      <path d="M22 38q3-7 9-8" fill="none" stroke="#F2927E" strokeLinecap="round" strokeWidth="3.5" />
      <path d="M17 61q-2 4 1 7m45-7q2 4-1 7" fill="none" stroke="#C74C48" strokeLinecap="round" strokeWidth="2" />
    </Art>
  );
}

function Car() {
  return (
    <Art>
      <path d="M12 48h5l6-14q2-5 8-6h18q6 1 9 7l7 13q4 1 4 6v8H9v-9q0-4 3-5Z" fill="#3186AD" />
      <path d="m25 32-5 15h20V32Zm17 0v15h20l-7-12q-2-3-6-3Z" fill="#BFE0E5" />
      <path d="M42 32v15" stroke="#28718F" strokeWidth="2" />
      <path d="M12 52h6m49 0h6" stroke="#F6C83F" strokeLinecap="round" strokeWidth="3.5" />
      <circle cx="23" cy="63" fill="#24313D" r="8.5" />
      <circle cx="57" cy="63" fill="#24313D" r="8.5" />
      <circle cx="23" cy="63" fill="#D9DDD8" r="3.5" />
      <circle cx="57" cy="63" fill="#D9DDD8" r="3.5" />
      <path d="M34 52h8" stroke="#236B8A" strokeLinecap="round" strokeWidth="2.5" />
      <circle cx="70" cy="52" fill="#E67E66" r="2.5" />
    </Art>
  );
}

function Bear() {
  return (
    <Art>
      <circle cx="24" cy="25" fill="#956448" r="11" />
      <circle cx="56" cy="25" fill="#956448" r="11" />
      <circle cx="24" cy="25" fill="#B98562" r="5" />
      <circle cx="56" cy="25" fill="#B98562" r="5" />
      <path d="M19 40q0-21 21-22 21 1 21 22v12q0 18-21 18T19 52Z" fill="#A97550" />
      <path d="M23 39q3-8 9-10m16 0q6 2 9 10" fill="none" stroke="#8C5C43" strokeLinecap="round" strokeWidth="2" />
      <ellipse cx="40" cy="49" fill="#E0B28C" rx="12" ry="10" />
      <ellipse cx="32" cy="39" fill={ink} rx="2.7" ry="3.3" />
      <ellipse cx="48" cy="39" fill={ink} rx="2.7" ry="3.3" />
      <circle cx="33" cy="38" fill="#FFF8E9" r="0.8" />
      <circle cx="49" cy="38" fill="#FFF8E9" r="0.8" />
      <path d="m40 47-3 2q3 3 6 0Zm0 3q-1 5-5 5m5-5q1 5 5 5M25 62q-3 4-1 7m31-7q3 4 1 7" fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </Art>
  );
}

function renderArtwork(subject: PreviewSubject): ReactNode {
  switch (subject) {
    case 'cat':
      return <Cat />;
    case 'duck':
      return <Duck />;
    case 'elephant':
      return <Elephant />;
    case 'apple':
      return <Apple />;
    case 'car':
      return <Car />;
    case 'bear':
      return <Bear />;
  }
  return null;
}

export default function ElevatedCharacter() {
  return (
    <MemoryBoard
      direction="CHARACTER C"
      note="Friendly shapes, clear clues — remember the little details."
      renderArtwork={renderArtwork}
    />
  );
}