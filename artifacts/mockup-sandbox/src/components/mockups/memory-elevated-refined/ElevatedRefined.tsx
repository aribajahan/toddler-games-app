import '../memory-art-directions/_group.css';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';

const ink = '#2B3438';

function Cat() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M17 36 17 14q0-3 3-1l15 10q5-2 10 0l15-10q3-2 3 1l-1 23q0 18-10 24l-8 4H34l-9-5Q17 53 17 36Z" fill="#E88422" />
      <path d="m21 18 11 8-10 6Zm38 0-11 8 10 6Z" fill="#F8BF86" />
      <path d="M25 40q0-16 15-19 15 3 15 19 0 17-15 24-15-7-15-24Z" fill="#F09A2D" />
      <path d="M31 49q3-5 9-5t9 5q-2 8-9 9t-9-9Z" fill="#FFE1AF" />
      <ellipse cx="33.5" cy="38" fill={ink} rx="3.5" ry="4.6" />
      <ellipse cx="46.5" cy="38" fill={ink} rx="3.5" ry="4.6" />
      <circle cx="34.6" cy="36.6" fill="#FFF9ED" r="1.2" />
      <circle cx="47.6" cy="36.6" fill="#FFF9ED" r="1.2" />
      <path d="m36.6 47 3.4-2.2 3.4 2.2-3.4 3.1ZM40 50q-1 4-5 4m5-4q1 4 5 4M26 47l-9-1m9 6-9 2m37-7 9-1m-9 7 9 2" fill="none" stroke={ink} strokeLinecap="round" strokeWidth="1.7" />
      <path d="M22 62q4 7 12 5m24-5q-4 7-12 5" fill="none" stroke="#D66C20" strokeLinecap="round" strokeWidth="5" />
    </svg>
  );
}

function Duck() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M22 51q-3-12 4-21 6-8 16-8 13 0 18 11 3 7-1 13 7 2 9 8-4 8-15 8H32q-9 0-10-11Z" fill="#E6B631" />
      <path d="M31 39q7-10 18-3 5 4 2 10-8 6-18 1Z" fill="#F2C947" />
      <path d="M55 35q10-4 16 2-3 7-15 7Z" fill="#E57B32" />
      <circle cx="50" cy="29" fill={ink} r="2.5" />
      <circle cx="50.8" cy="28.2" fill="#FFF9ED" r=".8" />
      <path d="M29 22q-1-6 4-10 6 5 4 12" fill="#F0C84B" />
      <path d="M28 63q7 4 14 0m-3-38q-4-5-1-10" fill="none" stroke="#D69A24" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Elephant() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M17 45q0-20 22-27 21 5 24 24v13q-2 10-13 11H29Q18 65 17 55Z" fill="#8FAEBC" />
      <path d="M25 28Q11 21 10 38q0 15 14 17l7-8q-7-3-7-10 0-6 8-6Z" fill="#AAC2CB" />
      <path d="M55 28q14-7 15 10 0 15-14 17l-7-8q7-3 7-10 0-6-8-6Z" fill="#AAC2CB" />
      <path d="M37 38q0 14 3 22 2 4 5 0 3-5 0-11l-1-12q-1-5-5-3Z" fill="#789AA9" />
      <circle cx="31" cy="36" fill={ink} r="2.6" />
      <circle cx="49" cy="36" fill={ink} r="2.6" />
      <path d="M34 49q6 4 12 0M25 62q4 3 8 0m14 0q4 3 8 0" fill="none" stroke={ink} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Apple() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M40 28q-9-8-19-1-10 8-5 25 5 17 16 19 5 1 8-3 3 4 8 3 12-2 17-19 5-17-5-25-10-7-20 1Z" fill="#D9534D" />
      <path d="M39.5 28q-1-9 6-16" fill="none" stroke="#754A2C" strokeLinecap="round" strokeWidth="3.2" />
      <path d="M45 14q9-6 18-2-3 10-18 10Z" fill="#6A9C62" />
      <path d="M21 39q3-7 9-9" fill="none" stroke="#F18B78" strokeLinecap="round" strokeWidth="3.5" />
    </svg>
  );
}

function Car() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="m11 48 7-15q2-6 10-7h20q7 1 10 7l8 15q4 2 4 7v7H9v-9q0-4 2-5Z" fill="#2F86AD" />
      <path d="m24 30-5 15h20V30Zm17 0v15h21l-7-12q-2-3-6-3Z" fill="#B9DCE2" />
      <path d="M41 30v15M12 52h6m48 0h4" fill="none" stroke="#26708D" strokeLinecap="round" strokeWidth="2" />
      <circle cx="24" cy="63" fill="#293D45" r="8" />
      <circle cx="57" cy="63" fill="#293D45" r="8" />
      <circle cx="24" cy="63" fill="#D8DDD8" r="3.5" />
      <circle cx="57" cy="63" fill="#D8DDD8" r="3.5" />
      <path d="M12 51h5m51 0h-5" stroke="#F3C642" strokeLinecap="round" strokeWidth="3.5" />
    </svg>
  );
}

function Bear() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <circle cx="24" cy="25" fill="#946448" r="11" />
      <circle cx="56" cy="25" fill="#946448" r="11" />
      <path d="M19 40q0-21 21-22 21 1 21 22v12q0 18-21 18T19 52Z" fill="#A97550" />
      <ellipse cx="40" cy="49" fill="#E0B18A" rx="12" ry="10" />
      <ellipse cx="32" cy="38" fill={ink} rx="2.8" ry="3.3" />
      <ellipse cx="48" cy="38" fill={ink} rx="2.8" ry="3.3" />
      <path d="m37 47 3-2 3 2-3 3Zm3 3q-1 4-5 4m5-4q1 4 5 4M26 62q4 4 8 1m20-1q-4 4-8 1" fill="none" stroke={ink} strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function renderArtwork(subject: PreviewSubject) {
  return { cat: <Cat />, duck: <Duck />, elephant: <Elephant />, apple: <Apple />, car: <Car />, bear: <Bear /> }[subject];
}

export default function ElevatedRefined() {
  return <MemoryBoard direction="Refined C" note="Clear shapes, warm color, easy to remember." renderArtwork={renderArtwork} />;
}