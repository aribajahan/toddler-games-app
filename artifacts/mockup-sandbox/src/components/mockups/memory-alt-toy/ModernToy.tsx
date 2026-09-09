import '../memory-art-directions/_group.css';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';

const INK = '#24313D';

type ArtworkProps = { subject: PreviewSubject };

function Cat() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs>
        <linearGradient id="toy-cat" x1="0.12" x2="0.86" y1="0.08" y2="0.92">
          <stop offset="0" stopColor="#FFD07B" />
          <stop offset="0.32" stopColor="#F3A548" />
          <stop offset="1" stopColor="#C86628" />
        </linearGradient>
        <linearGradient id="toy-cat-ear" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#FFE0A7" /><stop offset="1" stopColor="#E98A3B" /></linearGradient>
      </defs>
      <path d="M18 39 17 14c0-2 2-3 4-1l14 10c3-1 7-1 10 0l14-10c2-2 4-1 4 1l-1 25c-1 16-8 26-22 26S19 56 18 39Z" fill="#B95E29" opacity=".25" transform="translate(1 2)" />
      <path d="M18 37 17 14c0-2 2-3 4-1l14 10c3-1 7-1 10 0l14-10c2-2 4-1 4 1l-1 25c-1 16-8 26-22 26S19 54 18 37Z" fill="url(#toy-cat)" />
      <path d="m21 18 11 7-9 8Z M59 18l-11 7 9 8Z" fill="url(#toy-cat-ear)" />
      <path d="M24 39c0-10 7-17 16-17s16 7 16 17c0 13-7 21-16 21s-16-8-16-21Z" fill="#E88934" />
      <path d="M26 31c4-7 10-9 17-9-9 3-14 10-14 20 0 8 3 14 8 17-7-2-11-10-11-20Z" fill="#FFD17A" opacity=".58" />
      <path d="M31 46c2-4 5-5 9-5s7 1 9 5c-2 7-5 10-9 10s-7-3-9-10Z" fill="#FFE6BC" />
      <circle cx="33" cy="38" fill={INK} r="2.6" /><circle cx="47" cy="38" fill={INK} r="2.6" />
      <circle cx="32.3" cy="37.2" fill="#FFF8E8" r=".8" /><circle cx="46.3" cy="37.2" fill="#FFF8E8" r=".8" />
      <path d="m37 47 3-2 3 2-3 3Z M40 50c-2 4-5 4-7 1m7-1c2 4 5 4 7 1M25 45l-10-2m10 7-10 2m40-7 10-2m-10 7 10 2" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function Duck() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs>
        <linearGradient id="toy-duck" x1="0.1" x2="0.9" y1="0.1" y2="1">
          <stop stopColor="#FFE37A" />
          <stop offset=".45" stopColor="#F2C33D" />
          <stop offset="1" stopColor="#C99123" />
        </linearGradient>
      </defs>
      <path d="M25 48c0-13 8-24 21-24 9 0 16 7 16 16 0 3-1 5-2 7 6 3 8 8 8 13H22c0-5 2-9 7-12-3-1-4-4-4-8Z" fill="#B78323" opacity=".3" transform="translate(1 2)" />
      <path d="M25 46c0-13 8-24 21-24 9 0 16 7 16 16 0 3-1 5-2 7 6 3 8 8 8 13H22c0-5 2-9 7-12-3-1-4-4-4-8Z" fill="url(#toy-duck)" />
      <path d="M57 35c7-3 14-1 16 3-3 5-10 6-16 3Z" fill="#D87B32" /><path d="M59 36c4-1 8 0 10 2-4 1-7 1-10 0Z" fill="#FFB552" />
      <path d="M31 45c4-5 11-5 16 1-4 6-11 8-17 5Z" fill="#F8D96B" />
      <path d="M29 34c3-7 9-10 16-11-8 4-11 10-11 19 0 8 3 13 7 16-7-2-12-10-12-24Z" fill="#FFF0A2" opacity=".5" />
      <circle cx="51" cy="31" fill={INK} r="2.5" />
      <path d="M34 61v7m17-7v7m-20 0h7m10 0h7M33 25c-3-5-2-9 1-12 5 3 7 8 5 13" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Elephant() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs>
        <linearGradient id="toy-elephant" x1="0.12" x2="0.88" y1="0.08" y2="1">
          <stop stopColor="#D1E4E5" />
          <stop offset=".42" stopColor="#A7C5CC" />
          <stop offset="1" stopColor="#718F9E" />
        </linearGradient>
      </defs>
      <path d="M17 42c0-14 9-25 23-25s24 10 24 24v10c0 6-5 10-11 10H28c-7 0-11-7-11-19Z" fill="#668692" opacity=".3" transform="translate(1 2)" />
      <path d="M17 40c0-14 9-25 23-25s24 10 24 24v10c0 6-5 10-11 10H28c-7 0-11-7-11-19Z" fill="url(#toy-elephant)" />
      <path d="M23 24c-8-3-14 3-14 12s6 15 14 13Zm34 0c8-3 14 3 14 12s-6 15-14 13Z" fill="#BFD5DB" />
      <path d="M20 28c4-8 10-11 19-12-9 4-14 11-14 22 0 10 4 16 9 20-10-2-15-11-14-30Z" fill="#ECF5F2" opacity=".5" />
      <path d="M37 36v17c0 7 5 10 9 4V37c0-4-9-5-9-1Z" fill="#6E909F" />
      <circle cx="31" cy="35" fill={INK} r="2.4" /><circle cx="49" cy="35" fill={INK} r="2.4" />
      <path d="M34 48c4 3 8 3 12 0M24 64v6m10-6v6m18-6v6m10-6v6M21 70h7m7 0h7m8 0h7m7 0h7" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Apple() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs>
        <linearGradient id="toy-apple" x1="0.08" x2="0.92" y1="0.05" y2="1">
          <stop stopColor="#FF8D76" />
          <stop offset=".35" stopColor="#EF6158" />
          <stop offset="1" stopColor="#B83E48" />
        </linearGradient>
      </defs>
      <path d="M40 29c-7-7-22-4-25 10-3 15 7 30 17 30 4 0 6-3 8-3s4 3 8 3c10 0 20-15 17-30-3-14-18-17-25-10Z" fill="#9E3C43" opacity=".28" transform="translate(1 2)" />
      <path d="M40 27c-7-7-22-4-25 10-3 15 7 30 17 30 4 0 6-3 8-3s4 3 8 3c10 0 20-15 17-30-3-14-18-17-25-10Z" fill="url(#toy-apple)" />
      <path d="M40 27c-1-8 1-12 6-16" fill="none" stroke="#765039" strokeLinecap="round" strokeWidth="3" />
      <path d="M45 14c7-5 14-4 18-2-2 7-9 11-18 9Z" fill="#7C9F68" />
      <path d="M24 38c2-4 5-6 9-7" fill="none" stroke="#FFB09A" strokeLinecap="round" strokeWidth="3" />
      <path d="M29 30c-4 4-6 10-6 17 0 9 4 15 9 19-6-4-10-11-10-22 0-7 2-11 7-14Z" fill="#FFB49B" opacity=".35" />
    </svg>
  );
}

function Car() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs>
        <linearGradient id="toy-car" x1="0.05" x2="0.95" y1="0.05" y2="1">
          <stop stopColor="#8AD0DB" />
          <stop offset=".35" stopColor="#4EACC5" />
          <stop offset="1" stopColor="#286B8B" />
        </linearGradient>
      </defs>
      <path d="M12 50 19 34c2-4 5-6 10-6h20c5 0 8 2 11 7l8 15c3 1 4 4 4 8v7H9v-9c0-3 1-5 3-6Z" fill="#225C79" opacity=".3" transform="translate(1 2)" />
      <path d="M12 48 19 32c2-4 5-6 10-6h20c5 0 8 2 11 7l8 15c3 1 4 4 4 8v7H9v-9c0-3 1-5 3-6Z" fill="url(#toy-car)" />
      <path d="m24 30-5 15h19V30Zm17 0v15h21l-7-12c-1-2-3-3-6-3Z" fill="#D8F0EC" />
      <path d="m23 31-4 12h18V31Z" fill="#F0FAEE" opacity=".5" />
      <path d="M39 30v15" stroke="#32728B" strokeWidth="2" />
      <circle cx="24" cy="63" fill="#344C5A" r="8" /><circle cx="58" cy="63" fill="#344C5A" r="8" />
      <circle cx="24" cy="63" fill="#D5E0DD" r="3" /><circle cx="58" cy="63" fill="#D5E0DD" r="3" />
      <path d="M12 52h5m51 0h-5" stroke="#F3C956" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

function Bear() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs>
        <linearGradient id="toy-bear" x1="0.12" x2="0.9" y1="0.06" y2="1">
          <stop stopColor="#D19A70" />
          <stop offset=".42" stopColor="#B77855" />
          <stop offset="1" stopColor="#7C4B3E" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="25" fill="#855142" r="11" /><circle cx="56" cy="25" fill="#855142" r="11" />
      <circle cx="24" cy="25" fill="#D49A72" r="5" /><circle cx="56" cy="25" fill="#D49A72" r="5" />
      <path d="M19 41c0-13 9-22 21-22s21 9 21 22v12c0 12-9 20-21 20s-21-8-21-20Z" fill="#70453C" opacity=".3" transform="translate(1 2)" />
      <path d="M19 39c0-13 9-22 21-22s21 9 21 22v12c0 12-9 20-21 20s-21-8-21-20Z" fill="url(#toy-bear)" />
      <path d="M25 31c3-8 10-13 19-13-9 4-14 12-14 22 0 10 4 17 9 21-9-2-14-11-14-30Z" fill="#F0C28D" opacity=".38" />
      <ellipse cx="40" cy="48" fill="#E5B994" rx="12" ry="10" />
      <circle cx="32" cy="37" fill={INK} r="2.3" /><circle cx="48" cy="37" fill={INK} r="2.3" />
      <path d="m37 46 3-2 3 2-3 3Z M40 49c-2 4-5 4-7 1m7-1c2 4 5 4 7 1M28 63c-4 2-7 5-7 8m31-8c4 2 7 5 7 8" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Artwork({ subject }: ArtworkProps) {
  return { cat: <Cat />, duck: <Duck />, elephant: <Elephant />, apple: <Apple />, car: <Car />, bear: <Bear /> }[subject];
}

export default function ModernToy() {
  return (
    <MemoryBoard
      direction="Modern Toy"
      note="Friendly little forms, made to be remembered."
      renderArtwork={(subject) => <Artwork subject={subject} />}
    />
  );
}