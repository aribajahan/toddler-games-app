import '../memory-art-directions/_group.css';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';

const ink = '#29353A';
const artProps = { 'aria-hidden': true, height: 74, viewBox: '0 0 80 80', width: 74 };

function Cat() {
  return (
    <svg {...artProps}>
      <path d="M18 63q-2-15 7-25 3-4 8-6L31 16q0-3 3-1l11 9q6-1 12 2l9-7q3-2 3 2l-1 20q3 5 2 12-1 12-13 16H30q-9-1-12-6Z" fill="#E88727" />
      <path d="M35 27q8-8 18-2 10 6 9 18-1 15-15 19-15-1-17-14-2-13 5-21Z" fill="#F09B2C" />
      <path d="m34 19 9 7-9 5Zm29 1-9 7 9 3Z" fill="#F8C18C" />
      <path d="M36 46q5-7 13-5 5 1 7 7-3 9-11 10-7-2-9-12Z" fill="#FFE0AC" />
      <ellipse cx="45" cy="36" fill={ink} rx="3.3" ry="4.3" />
      <circle cx="46" cy="35" fill="#FFF9ED" r="1.1" />
      <path d="m48 44 3 2-3 3q-4-1-4-3Zm1 5q-1 4-5 5m4-5q2 3 5 3M39 48l-8 1" fill="none" stroke={ink} strokeLinecap="round" strokeWidth="1.7" />
      <path d="M24 61q6 5 14 4M57 60q6 1 10-5-1 11-11 13" fill="none" stroke="#C9691F" strokeLinecap="round" strokeWidth="5" />
      <path d="M28 28q3 4 3 8m26-8q-3 3-4 6" fill="none" stroke="#C8661E" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Duck() {
  return (
    <svg {...artProps}>
      <path d="M19 54q1-14 12-20 7-4 15-1 8 3 11 11 5 1 10 6-4 7-13 8H31q-10 0-12-4Z" fill="#E7B833" />
      <path d="M30 37q-1-12 9-18 11-5 18 4 5 7-1 15-5 6-14 5Z" fill="#F2C647" />
      <path d="M54 34q11-5 19 1-4 7-17 7Z" fill="#E37D34" />
      <path d="M28 47q9-8 19 0-2 10-14 9Z" fill="#D79F27" />
      <circle cx="48" cy="27" fill={ink} r="2.5" />
      <circle cx="48.7" cy="26.2" fill="#FFF9ED" r=".8" />
      <path d="M35 22q-1-7 5-11 6 5 4 12" fill="#F0C94A" />
      <path d="M24 61q11 3 21 0" fill="none" stroke="#C99222" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Elephant() {
  return (
    <svg {...artProps}>
      <path d="M15 52q-2-15 7-25 9-9 23-7 13 2 19 12 5 9 1 21-4 11-17 12H29q-12-1-14-13Z" fill="#8BAAB8" />
      <path d="M27 25q-13-9-17 2-3 12 10 20 6 3 11-2-8-7-6-15 1-3 2-5Z" fill="#B2C9D0" />
      <path d="M49 24q11-5 15 4 3 9-6 15-5 3-10-1 7-7 3-18Z" fill="#A5C2CB" />
      <path d="M48 37q4 5 3 12-1 10-8 13-5 0-4-5 2-6 0-12-2-8 3-10Z" fill="#7698A8" />
      <circle cx="34" cy="35" fill={ink} r="2.7" />
      <circle cx="51" cy="34" fill={ink} r="2.3" />
      <path d="M35 48q5 3 10 0M25 63q6 2 11-1m8 1q6 3 12-1" fill="none" stroke="#638797" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Apple() {
  return (
    <svg {...artProps}>
      <path d="M40 27q-9-8-19-1-10 8-5 25 5 17 16 19 5 1 8-3 3 4 8 3 12-2 17-19 5-17-5-25-10-7-20 1Z" fill="#D9544E" />
      <path d="M39.5 27q-1-8 6-15" fill="none" stroke="#72472C" strokeLinecap="round" strokeWidth="3.2" />
      <path d="M45 14q9-6 18-2-3 10-18 10Z" fill="#6FA267" />
      <path d="M21 38q3-7 9-9" fill="none" stroke="#F3937E" strokeLinecap="round" strokeWidth="3.4" />
      <path d="M52 63q-7 4-13 3" fill="none" stroke="#C14745" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Car() {
  return (
    <svg {...artProps}>
      <path d="m11 48 7-15q2-6 10-7h20q7 1 10 7l8 15q4 2 4 7v7H9v-9q0-4 2-5Z" fill="#2F86AD" />
      <path d="m24 30-5 15h20V30Zm17 0v15h21l-7-12q-2-3-6-3Z" fill="#B9DCE2" />
      <path d="M41 30v15M12 52h6m48 0h4" fill="none" stroke="#26708D" strokeLinecap="round" strokeWidth="2" />
      <circle cx="24" cy="63" fill="#293D45" r="8" />
      <circle cx="57" cy="63" fill="#293D45" r="8" />
      <circle cx="24" cy="63" fill="#D8DDD8" r="3.5" />
      <circle cx="57" cy="63" fill="#D8DDD8" r="3.5" />
      <path d="M12 51h5m51 0h-5" stroke="#F4C642" strokeLinecap="round" strokeWidth="3.5" />
    </svg>
  );
}

function Bear() {
  return (
    <svg {...artProps}>
      <path d="M20 29q-3-10 5-14 7-4 12 3 7-4 14 0 8 5 4 14 7 9 3 21-4 11-16 13-14 1-23-7-9-9-3-21Z" fill="#A97550" />
      <path d="M24 20q5-5 11 1l-3 9q-8 3-11-3-2-4 3-7Zm30 0q-5-5-11 1l3 9q8 3 11-3 2-4-3-7Z" fill="#C18A63" />
      <path d="M27 39q5-10 13-10t13 10q0 15-13 21-13-6-13-21Z" fill="#B98159" />
      <ellipse cx="40" cy="48" fill="#E2B48A" rx="11" ry="9" />
      <ellipse cx="34" cy="37" fill={ink} rx="2.8" ry="3.4" />
      <ellipse cx="47" cy="37" fill={ink} rx="2.4" ry="3.2" />
      <path d="m37 46 3-2 3 2-3 3Zm3 3q-1 4-5 4m5-4q1 4 5 4" fill="none" stroke={ink} strokeLinecap="round" strokeWidth="1.7" />
      <path d="M27 62q6 5 12 1m3 0q6 4 12-1" fill="none" stroke="#8D5E46" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

function renderArtwork(subject: PreviewSubject) {
  return { cat: <Cat />, duck: <Duck />, elephant: <Elephant />, apple: <Apple />, car: <Car />, bear: <Bear /> }[subject];
}

export default function ElevatedCharacter() {
  return <MemoryBoard direction="Character C" note="Distinct silhouettes, calm details, easy to remember." renderArtwork={renderArtwork} />;
}