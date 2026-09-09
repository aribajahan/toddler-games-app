import '../memory-art-directions/_group.css';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';

const INK = '#24313D';

type ArtworkProps = { subject: PreviewSubject };

function Cat() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M19 35 18 16c0-2 2-3 4-1l13 9c3-1 7-1 10 0l13-9c2-2 4-1 4 1l-1 19c0 15-8 25-21 25S19 50 19 35Z" fill="#E88924" />
      <path d="M24 20 32 26l-8 5Zm32 0-8 6 8 5Z" fill="#F8C078" />
      <path d="M24 40c0-10 7-17 16-17s16 7 16 17c0 12-7 20-16 20s-16-8-16-20Z" fill="#F09A2D" />
      <path d="M31 46c3-4 7-5 9-5s6 1 9 5c-2 7-5 10-9 10s-7-3-9-10Z" fill="#FFE1A7" />
      <circle cx="33" cy="38" fill={INK} r="2.6" /><circle cx="47" cy="38" fill={INK} r="2.6" />
      <path d="m37 47 3-2 3 2-3 3Zm3 3c-2 3-5 3-7 1m7-1c2 3 5 3 7 1M25 46l-10-2m10 8-10 2m40-8 10-2m-10 8 10 2" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.7" />
      <path d="M28 29c2-2 4-3 7-3m10 0c3 0 5 1 7 3" fill="none" stroke="#B76220" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Duck() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M24 47c0-13 8-24 21-24 9 0 16 7 16 16 0 3-1 5-2 7 6 3 8 8 8 13H22c0-5 2-9 7-12-3-1-5-4-5-8Z" fill="#E6B82F" />
      <path d="M56 36c7-3 14-1 16 3-3 5-10 6-16 3Z" fill="#E47732" />
      <path d="M31 45c4-5 11-5 16 1-4 6-11 8-17 5Z" fill="#F4CF50" />
      <circle cx="51" cy="31" fill={INK} r="2.5" />
      <path d="M34 61v7m17-7v7m-20 0h7m10 0h7M32 25c-3-5-2-9 1-12 5 3 7 8 5 13" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Elephant() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M17 42c0-14 9-25 23-25s24 10 24 24v10c0 6-5 10-11 10H28c-7 0-11-7-11-19Z" fill="#87AAB9" />
      <path d="M23 25c-8-3-14 3-14 12s6 15 14 13Zm34 0c8-3 14 3 14 12s-6 15-14 13Z" fill="#B3CBD2" />
      <path d="M37 38v17c0 7 5 10 9 4V39c0-4-9-5-9-1Z" fill="#7398A8" />
      <circle cx="31" cy="35" fill={INK} r="2.4" /><circle cx="49" cy="35" fill={INK} r="2.4" />
      <path d="M34 48c4 3 8 3 12 0M24 64v6m10-6v6m18-6v6m10-6v6M21 70h7m7 0h7m8 0h7m7 0h7" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Apple() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M40 27c-7-7-22-4-25 10-3 15 7 30 17 30 4 0 6-3 8-3s4 3 8 3c10 0 20-15 17-30-3-14-18-17-25-10Z" fill="#D95751" />
      <path d="M40 27c-1-8 1-12 6-16" fill="none" stroke="#704328" strokeLinecap="round" strokeWidth="3" />
      <path d="M45 14c7-5 14-4 18-2-2 7-9 11-18 9Z" fill="#6BA66C" />
    </svg>
  );
}

function Car() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M12 48 19 32c2-4 5-6 10-6h20c5 0 8 2 11 7l8 15c3 1 4 4 4 8v7H9v-9c0-3 1-5 3-6Z" fill="#3289B0" />
      <path d="m24 30-5 15h19V30Zm17 0v15h21l-7-12c-1-2-3-3-6-3Z" fill="#C2E2E7" />
      <path d="M39 30v15" stroke="#28728F" strokeWidth="2" />
      <circle cx="24" cy="63" fill={INK} r="8" /><circle cx="58" cy="63" fill={INK} r="8" />
      <circle cx="24" cy="63" fill="#D9DDD9" r="3" /><circle cx="58" cy="63" fill="#D9DDD9" r="3" />
      <path d="M12 52h5m51 0h-5" stroke="#F3C73E" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

function Bear() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <circle cx="24" cy="25" fill="#946348" r="11" /><circle cx="56" cy="25" fill="#946348" r="11" />
      <path d="M19 39c0-13 9-22 21-22s21 9 21 22v12c0 12-9 20-21 20s-21-8-21-20Z" fill="#A97550" />
      <ellipse cx="40" cy="48" fill="#E2B58F" rx="12" ry="10" />
      <circle cx="32" cy="37" fill={INK} r="2.4" /><circle cx="48" cy="37" fill={INK} r="2.4" />
      <path d="m37 46 3-2 3 2-3 3Zm3 3c-2 4-5 4-7 1m7-1c2 4 5 4 7 1M28 63c-4 2-7 5-7 8m31-8c4 2 7 5 7 8" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Artwork({ subject }: ArtworkProps) {
  return { cat: <Cat />, duck: <Duck />, elephant: <Elephant />, apple: <Apple />, car: <Car />, bear: <Bear /> }[subject];
}

export default function CleanGeometric() {
  return (
    <MemoryBoard
      direction="Clean geometric"
      note="Clear shapes, friendly faces, easy to remember."
      renderArtwork={(subject) => <Artwork subject={subject} />}
    />
  );
}