import '../memory-art-directions/_group.css';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';

const INK = '#24313D';
type ArtworkProps = { subject: PreviewSubject };

function Cat() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs><linearGradient id="sd-cat" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#F5A23C" /><stop offset="1" stopColor="#D86622" /></linearGradient></defs>
      {/* seated character: ears, broad head, chest and curled tail */}
      <path d="M20 42c-2 9-1 17 5 22 4 4 10 5 15 4 7 4 16 1 18-7 2-7-1-14-5-19Z" fill="url(#sd-cat)" />
      <path d="M59 52c12-4 15 5 10 12-4 5-10 7-15 5" fill="none" stroke="#C45B22" strokeLinecap="round" strokeWidth="7" />
      <path d="M18 40 16 12c0-2 2-3 4-1l15 11c4-2 8-2 12 0l14-11c2-2 4-1 4 1l-2 29c0 14-9 22-23 22S18 54 18 40Z" fill="url(#sd-cat)" />
      <path d="m21 18 11 8-10 7Z M59 18 48 26l10 7Z" fill="#FFD39A" />
      <path d="M24 41c0-10 7-17 16-17s16 7 16 17c0 12-7 19-16 19s-16-7-16-19Z" fill="#EA842A" />
      <path d="M31 48c3-4 6-5 9-5s7 1 9 5c-2 7-5 10-9 10s-7-3-9-10Z" fill="#FFE9BE" />
      <ellipse cx="34" cy="39" fill="#fff" rx="4.4" ry="5.2" /><ellipse cx="46" cy="39" fill="#fff" rx="4.4" ry="5.2" />
      <circle cx="34" cy="40" fill={INK} r="2.3" /><circle cx="46" cy="40" fill={INK} r="2.3" />
      <path d="m37 48 3-2 3 2-3 3Z M40 51c-2 4-5 4-7 1m7-1c2 4 5 4 7 1M25 47l-10-2m10 7-10 2m30-7 10-2m-10 7 10 2" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.7" />
      <path d="M28 67v4m10-4v4m-7 0h-7m14 0h6" fill="none" stroke="#B95722" strokeLinecap="round" strokeWidth="3" />
      <path d="M26 30c3-3 6-4 9-4m10 0c3 0 6 1 9 4" fill="none" opacity=".28" stroke="#9E451B" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

function Duck() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs><linearGradient id="sd-duck" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#F5D64F" /><stop offset="1" stopColor="#D79E25" /></linearGradient></defs>
      <path d="M25 55c-3-5-2-13 3-17-2-14 5-24 17-24 10 0 17 8 16 17 8 2 11 8 9 15-2 8-12 12-22 12H32c-3 0-5-1-7-3Z" fill="url(#sd-duck)" />
      <path d="M39 42c6-7 15-5 18 2-2 8-10 12-18 10-4-2-4-8 0-12Z" fill="#F8C938" />
      <path d="M57 31c8-4 17-1 18 3-3 6-11 7-18 4Z" fill="#E47732" />
      <circle cx="53" cy="25" fill="#fff" r="5" /><circle cx="54" cy="25" fill={INK} r="2.3" />
      <path d="M35 58v9m17-9v9m-21 0h8m9 0h8M36 18c-3-5-2-10 2-13 5 3 6 9 4 14" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
      <path d="M30 46c-3 2-5 5-4 9" fill="none" opacity=".3" stroke="#A06D1E" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}

function Elephant() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs><linearGradient id="sd-elephant" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#AECBD5" /><stop offset="1" stopColor="#789BAA" /></linearGradient></defs>
      <path d="M17 45c0-16 10-27 25-27 14 0 24 10 24 25v12c0 7-5 11-12 11H29c-8 0-12-8-12-21Z" fill="url(#sd-elephant)" />
      <path d="M24 27c-9-5-16 2-15 12 1 10 7 16 16 13Zm32 0c9-5 16 2 15 12-1 10-7 16-16 13Z" fill="#C1D8DE" />
      <path d="M39 38v20c0 8 5 11 9 4V40c0-5-9-6-9-2Z" fill="#7898A7" />
      <ellipse cx="31" cy="36" fill="#fff" rx="4.5" ry="5" /><ellipse cx="50" cy="36" fill="#fff" rx="4.5" ry="5" />
      <circle cx="31" cy="37" fill={INK} r="2.2" /><circle cx="50" cy="37" fill={INK} r="2.2" />
      <path d="M35 49c4 3 8 3 12 0M25 66v5m10-5v5m17-5v5m10-5v5M21 71h8m5 0h8m8 0h8m4 0h7" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
      <path d="M26 28c5-5 11-7 17-7" fill="none" opacity=".3" stroke="#fff" strokeLinecap="round" strokeWidth="2.8" />
    </svg>
  );
}

function Apple() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs><linearGradient id="sd-apple" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#F27165" /><stop offset="1" stopColor="#C73E43" /></linearGradient></defs>
      <path d="M39 29C30 21 17 26 15 39c-2 15 8 28 18 29 4 0 5-3 8-3s5 3 9 3c9-1 17-12 16-24-1-12-13-21-27-15Z" fill="url(#sd-apple)" />
      <path d="M40 29c-2-9 0-14 7-19" fill="none" stroke="#71442A" strokeLinecap="round" strokeWidth="3" />
      <path d="M46 13c7-7 15-6 20-5-2 8-10 13-20 11Z" fill="#74A86E" />
      <path d="M24 39c2-5 5-8 10-9" fill="none" opacity=".5" stroke="#FFB18C" strokeLinecap="round" strokeWidth="4" />
      <path d="M27 62c4 3 8 4 12 4" fill="none" opacity=".18" stroke="#A72F36" strokeLinecap="round" strokeWidth="3" />
      <path d="M30 57c5 4 11 5 17 2" fill="none" opacity=".2" stroke="#A72F36" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Car() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs><linearGradient id="sd-car" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#63B7D0" /><stop offset="1" stopColor="#347BA5" /></linearGradient></defs>
      <path d="M10 49 19 32c2-4 6-6 11-6h18c6 0 9 3 12 8l8 14c3 1 4 4 4 8v7H8v-8c0-3 1-5 2-6Z" fill="url(#sd-car)" />
      <path d="m24 30-6 15h20V30Zm17 0v15h21l-7-12c-1-2-3-3-6-3Z" fill="#C9E8EB" /><path d="M39 30v15" stroke="#327694" strokeWidth="2" />
      <circle cx="23" cy="63" fill="#294351" r="8" /><circle cx="58" cy="63" fill="#294351" r="8" /><circle cx="23" cy="63" fill="#DCE4E0" r="3" /><circle cx="58" cy="63" fill="#DCE4E0" r="3" />
      <path d="M11 52h6m52 0h-5" stroke="#F5CF58" strokeLinecap="round" strokeWidth="3" /><path d="M25 29h12" opacity=".35" stroke="#fff" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}

function Bear() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <defs><linearGradient id="sd-bear" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#BC875F" /><stop offset="1" stopColor="#895842" /></linearGradient></defs>
      <circle cx="24" cy="25" fill="#946044" r="12" /><circle cx="56" cy="25" fill="#946044" r="12" />
      <path d="M17 44c0-15 10-25 23-25s23 10 23 25v11c0 13-10 20-23 20S17 68 17 55Z" fill="url(#sd-bear)" />
      <path d="M25 63c-5 2-7 6-7 10m37-10c5 2 7 6 7 10" fill="none" stroke="#7C4C3B" strokeLinecap="round" strokeWidth="5" />
      <ellipse cx="40" cy="49" fill="#E8C29D" rx="13" ry="11" />
      <ellipse cx="32" cy="38" fill="#fff" rx="4.4" ry="5" /><ellipse cx="48" cy="38" fill="#fff" rx="4.4" ry="5" /><circle cx="32" cy="39" fill={INK} r="2.2" /><circle cx="48" cy="39" fill={INK} r="2.2" />
      <path d="m37 47 3-2 3 2-3 3Z M40 50c-2 4-5 4-7 1m7-1c2 4 5 4 7 1" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
      <path d="M26 30c4-5 9-7 14-7" fill="none" opacity=".25" stroke="#fff" strokeLinecap="round" strokeWidth="2.6" />
    </svg>
  );
}

function Artwork({ subject }: ArtworkProps) {
  return { cat: <Cat />, duck: <Duck />, elephant: <Elephant />, apple: <Apple />, car: <Car />, bear: <Bear /> }[subject];
}

export default function SoftDimensional() {
  return <MemoryBoard direction="Soft dimensional" note="Layered little characters, bright faces, easy to remember." renderArtwork={(subject) => <Artwork subject={subject} />} />;
}