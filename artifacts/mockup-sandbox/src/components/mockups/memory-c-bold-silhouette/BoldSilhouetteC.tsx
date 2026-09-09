import '../memory-art-directions/_group.css';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';

const INK = '#24313D';

type ArtworkProps = { subject: PreviewSubject };

function Cat() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path
        d="M20 38 18 14c0-2 2-3 4-1l14 10c3-1 6-1 8 0l14-10c2-2 4-1 4 1l-2 24c1 13-5 24-16 29 8 1 13 5 15 10H20c2-5 7-9 15-10C24 52 19 47 20 38Z"
        fill="#E78A26"
      />
      <path d="m23 18 10 8-9 4Zm34 0-10 8 9 4Z" fill="#F7BB78" />
      <path d="M25 42c0-10 6-17 15-17s15 7 15 17c0 12-6 19-15 19s-15-7-15-19Z" fill="#F19D2E" />
      <path d="M31 47c2-4 5-6 9-6s7 2 9 6c-2 7-5 10-9 10s-7-3-9-10Z" fill="#FFE0AB" />
      <ellipse cx="33" cy="38" fill={INK} rx="4.2" ry="5.3" />
      <ellipse cx="47" cy="38" fill={INK} rx="4.2" ry="5.3" />
      <circle cx="34.3" cy="36.5" fill="#FFF9F1" r="1.5" />
      <circle cx="48.3" cy="36.5" fill="#FFF9F1" r="1.5" />
      <path d="m37 47 3-2 3 2-3 3Zm3 3c-2 4-5 4-7 1m7-1c2 4 5 4 7 1M25 47l-9-2m9 7-9 2m39-7 9-2m-9 7 9 2" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.7" />
      <path d="M22 64c-7-1-9-7-5-12 2-3 5-3 7-1-3 2-4 5-2 8 1 2 3 3 5 3Z" fill="#D87522" />
    </svg>
  );
}

function Duck() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M23 47c0-13 7-24 20-24 10 0 17 7 17 17 0 2 0 4-1 6 6 3 9 8 9 14H21c0-6 3-11 8-14-4-1-6-4-6-9Z" fill="#E5B72E" />
      <path d="M57 36c7-3 14-1 17 3-3 5-10 6-17 3Z" fill="#E57A34" />
      <path d="M31 46c5-6 13-5 18 2-4 7-12 9-18 5Z" fill="#F3CB46" />
      <circle cx="51" cy="31" fill={INK} r="2.6" />
      <path d="M32 26c-3-5-2-10 1-13 5 3 7 8 5 14Z" fill="#F0CA42" />
      <path d="M34 62v7m17-7v7M30 70h8m10 0h8" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Elephant() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M17 43c0-15 9-26 23-26s24 10 24 24v10c0 7-5 11-12 11H28c-7 0-11-7-11-19Z" fill="#88AAB9" />
      <path d="M24 25c-9-4-15 3-15 12 0 10 6 16 15 13Zm32 0c9-4 15 3 15 12 0 10-6 16-15 13Z" fill="#B2C9D0" />
      <path d="M36 38c0-4 8-5 9 0v17c0 8-5 11-9 5Z" fill="#7397A8" />
      <path d="M34 49c3 2 8 2 12 0" fill="none" stroke="#5F8494" strokeLinecap="round" strokeWidth="1.7" />
      <circle cx="31" cy="35" fill={INK} r="2.7" />
      <circle cx="49" cy="35" fill={INK} r="2.7" />
      <path d="M24 64v7m10-7v7m18-7v7m10-7v7M21 71h7m7 0h7m8 0h7m7 0h7" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Apple() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M40 28c-7-7-22-4-25 10-3 15 6 29 17 30 4 0 6-3 8-3s4 3 8 3c11-1 20-15 17-30-3-14-18-17-25-10Z" fill="#D95850" />
      <path d="M40 28c-1-8 1-13 6-17" fill="none" stroke="#70462C" strokeLinecap="round" strokeWidth="3.4" />
      <path d="M45 14c7-5 14-4 18-2-2 7-9 11-18 9Z" fill="#6AA36B" />
      <path d="M24 39c2-4 5-6 8-7" fill="none" stroke="#F18D79" strokeLinecap="round" strokeWidth="3.5" />
    </svg>
  );
}

function Car() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M11 49 18 33c2-5 6-7 11-7h19c6 0 9 2 12 7l8 15c3 1 4 4 4 8v7H8v-8c0-3 1-5 3-6Z" fill="#4B94B0" />
      <path d="m24 30-6 15h20V30Zm17 0v15h21l-7-12c-1-2-3-3-6-3Z" fill="#D5EAEC" />
      <path d="M40 30v15" fill="none" stroke="#377F99" strokeWidth="2" />
      <path d="M13 51h5m49 0h5" fill="none" stroke="#F1C23E" strokeLinecap="round" strokeWidth="3.2" />
      <circle cx="24" cy="63" fill={INK} r="8.5" />
      <circle cx="58" cy="63" fill={INK} r="8.5" />
      <circle cx="24" cy="63" fill="#D8DEDA" r="3.2" />
      <circle cx="58" cy="63" fill="#D8DEDA" r="3.2" />
      <rect fill="#286C84" height="2.8" rx="1.4" width="9" x="36" y="51" />
    </svg>
  );
}

function Bear() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <circle cx="24" cy="25" fill="#946247" r="11.5" />
      <circle cx="56" cy="25" fill="#946247" r="11.5" />
      <circle cx="24" cy="25" fill="#C18B68" r="5" />
      <circle cx="56" cy="25" fill="#C18B68" r="5" />
      <path d="M18 40c0-13 9-23 22-23s22 10 22 23v11c0 13-9 21-22 21s-22-8-22-21Z" fill="#A97550" />
      <ellipse cx="40" cy="49" fill="#E1B38B" rx="13" ry="11" />
      <circle cx="32" cy="37" fill={INK} r="2.7" />
      <circle cx="48" cy="37" fill={INK} r="2.7" />
      <path d="m37 47 3-2 3 2-3 3Zm3 3c-2 4-5 4-7 1m7-1c2 4 5 4 7 1" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.7" />
      <path d="M28 63c-4 2-7 5-7 8m31-8c4 2 7 5 7 8" fill="none" stroke="#895A42" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

function Artwork({ subject }: ArtworkProps) {
  return { cat: <Cat />, duck: <Duck />, elephant: <Elephant />, apple: <Apple />, car: <Car />, bear: <Bear /> }[subject];
}

export default function BoldSilhouetteC() {
  return (
    <MemoryBoard
      direction="Bold silhouette C"
      note="Big shapes, bright clues, easy to remember."
      renderArtwork={(subject) => <Artwork subject={subject} />}
    />
  );
}