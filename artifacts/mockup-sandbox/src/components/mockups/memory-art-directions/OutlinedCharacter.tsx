import type { ReactNode } from 'react';
import './_group.css';
import { MemoryBoard, type PreviewSubject } from './_shared/MemoryBoard';

const ink = '#24313D';
const line = { stroke: ink, strokeWidth: 2.35, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function Cat() {
  return <svg viewBox="0 0 80 80" width="74" height="74" aria-hidden="true">
    <g {...line}>
      <path d="M20 34 18 15l13 9q9-5 18 0l13-9-2 20q-1 18-20 20-19-2-20-21Z" fill="#E59B56"/>
      <path d="m22 20 7 8-8-3M58 20l-7 8 8-3" fill="#F8CAA0" stroke="none"/>
      <path d="M26 59q-3 7 2 10M54 59q3 7-2 10" fill="none"/>
      <ellipse cx="40" cy="43" rx="18" ry="17" fill="#E59B56"/>
      <path d="M31 40q2-3 5 0M44 40q2-3 5 0" fill="none"/>
      <circle cx="34" cy="40" r="1.7" fill={ink} stroke="none"/><circle cx="47" cy="40" r="1.7" fill={ink} stroke="none"/>
      <path d="m40 44-3 2q3 3 6 0Z" fill="#D36C62"/><path d="M40 47q-5 6-9 1M40 47q5 6 9 1" fill="none"/>
      <path d="m25 46-10-2m10 6-10 2m30-6 10-2m-10 6 10 2" fill="none"/>
      <path d="M58 59q14 3 12-9-1-6-7-5" fill="none"/>
    </g>
  </svg>;
}

function Duck() {
  return <svg viewBox="0 0 80 80" width="74" height="74" aria-hidden="true">
    <g {...line}>
      <path d="M29 57q-7-9-3-20 3-8 12-10 4-13 16-10 10 3 9 15 8 2 9 7-4 7-15 4-4 14-17 17Z" fill="#E4B536"/>
      <path d="M45 17q-2-8-9-10 0 8 7 12" fill="#E4B536"/>
      <path d="M62 31q9-1 13 4-5 7-14 3Z" fill="#E88948"/>
      <circle cx="56" cy="24" r="2" fill={ink} stroke="none"/>
      <path d="M27 43q8-5 15 4-7 7-15 2Z" fill="#D5A125"/>
      <path d="M37 61v8m15-10 3 8m-8 1h9m-12 1h-9" fill="none"/>
      <path d="M39 37q3 2 6 0" fill="none"/>
    </g>
  </svg>;
}

function Elephant() {
  return <svg viewBox="0 0 80 80" width="74" height="74" aria-hidden="true">
    <g {...line}>
      <path d="M19 43q0-21 21-23 21 2 21 23v14H19Z" fill="#89AAB9"/>
      <ellipse cx="21" cy="39" rx="11" ry="16" fill="#A9C1CC"/><ellipse cx="59" cy="39" rx="11" ry="16" fill="#A9C1CC"/>
      <path d="M35 39v16q0 11 9 8l1-5q-6 2-6-7V39Z" fill="#789EAD"/>
      <circle cx="32" cy="38" r="2" fill={ink} stroke="none"/><circle cx="49" cy="38" r="2" fill={ink} stroke="none"/>
      <path d="M35 48q5 4 10 0M25 57l-2 11m12-10v11m18-11 2 11m8-12 2 11M19 69h8m5 0h8m14 0h8m3 0h-8" fill="none"/>
      <path d="M17 31q-4-5-1-10" fill="none"/>
    </g>
  </svg>;
}

function Apple() {
  return <svg viewBox="0 0 80 80" width="74" height="74" aria-hidden="true">
    <g {...line}>
      <path d="M40 28q-12-9-21 2-8 11 0 27 8 15 21 8 13 7 21-8 8-16 0-27-9-11-21-2Z" fill="#DD615B"/>
      <path d="M40 28q-1-11 6-17" fill="none"/><path d="M45 17q9-8 18-2-5 11-18 10Z" fill="#78A46C"/>
      <path d="M25 38q3-7 8-8" fill="none" stroke="#F39B8D"/>
      <circle cx="33" cy="48" r="1.8" fill={ink} stroke="none"/><circle cx="48" cy="48" r="1.8" fill={ink} stroke="none"/>
      <path d="M34 55q6 5 12 0" fill="none"/>
      <path d="M17 60q-4 4-2 8m48-8q4 4 2 8" fill="none"/>
    </g>
  </svg>;
}

function Car() {
  return <svg viewBox="0 0 80 80" width="74" height="74" aria-hidden="true">
    <g {...line}>
      <path d="M12 50 19 34q2-5 9-5h22q6 0 10 7l8 14q4 1 4 7v6H8v-7q0-5 4-6Z" fill="#5B9EB8"/>
      <path d="m25 33-4 14h20V33Zm20 0v14h18l-8-12q-2-2-5-2Z" fill="#DCEEF1"/>
      <path d="M9 51h8m48 0h7" fill="none"/>
      <circle cx="23" cy="62" r="8" fill="#F5F0E7"/><circle cx="57" cy="62" r="8" fill="#F5F0E7"/>
      <circle cx="23" cy="62" r="3" fill="#71838A" stroke="none"/><circle cx="57" cy="62" r="3" fill="#71838A" stroke="none"/>
      <circle cx="15" cy="51" r="2.5" fill="#F6D270" stroke="none"/><circle cx="66" cy="51" r="2.5" fill="#E4776D" stroke="none"/>
      <path d="M34 51h8" fill="none"/>
    </g>
  </svg>;
}

function Bear() {
  return <svg viewBox="0 0 80 80" width="74" height="74" aria-hidden="true">
    <g {...line}>
      <circle cx="23" cy="25" r="10" fill="#9A6A4E"/><circle cx="57" cy="25" r="10" fill="#9A6A4E"/>
      <path d="M19 40q0-19 21-19t21 19v17q-3 10-21 10T19 57Z" fill="#9A6A4E"/>
      <ellipse cx="40" cy="46" rx="11" ry="9" fill="#E4B99A"/>
      <circle cx="32" cy="39" r="2" fill={ink} stroke="none"/><circle cx="48" cy="39" r="2" fill={ink} stroke="none"/>
      <path d="m40 43-3 2q3 3 6 0Z" fill={ink}/><path d="M40 46q-5 6-9 1m9-1q5 6 9 1" fill="none"/>
      <path d="M24 57q-5 7-1 12m32-12q5 7 1 12M27 69h10m16 0H43" fill="none"/>
    </g>
  </svg>;
}

function renderArtwork(subject: PreviewSubject): ReactNode {
  return { cat: <Cat />, duck: <Duck />, elephant: <Elephant />, apple: <Apple />, car: <Car />, bear: <Bear /> }[subject];
}

export default function OutlinedCharacter() {
  return <MemoryBoard direction="FIND THE PAIRS" note="A little patience makes a great memory." renderArtwork={renderArtwork} />;
}