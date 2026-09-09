import '../memory-art-directions/_group.css';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';

const INK = '#26343B';

type ArtworkProps = { subject: PreviewSubject };

function Cat() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path
        d="M17.8 35.8 17 13.9c-.1-2.7 1.8-4 4-2.3l14.7 10.6c2.8-.8 5.8-.8 8.6 0L59 11.6c2.2-1.7 4.1-.4 4 2.3l-.8 21.9c.3 2 .4 4.1.2 6.3-1.1 13.5-9.5 23.1-22.7 23.1S18.1 55.6 17 42.1c-.2-2.2-.1-4.3.8-6.3Z"
        fill="#E98525"
      />
      <path d="m21.7 18.1 10.8 7.7-9.9 6.5Z M58.3 18.1l-10.8 7.7 9.9 6.5Z" fill="#F6BD83" />
      <path d="M23.4 39.1c0-11.6 7.3-19.2 16.6-19.2s16.6 7.6 16.6 19.2c0 13.1-7.3 21.3-16.6 21.3s-16.6-8.2-16.6-21.3Z" fill="#F19A2C" />
      <path d="M31 47.1c2.4-3.1 5.4-4.6 9-4.6s6.6 1.5 9 4.6c-1.9 6-5 8.8-9 8.8s-7.1-2.8-9-8.8Z" fill="#FFE0AE" />
      <path d="M29.3 31.2c3-2.4 6.3-2.6 8.6-1.3M42.1 29.9c2.3-1.3 5.6-1.1 8.6 1.3" fill="none" stroke="#C8661E" strokeLinecap="round" strokeWidth="2" />
      <ellipse cx="33.2" cy="37.6" fill={INK} rx="4.2" ry="5.5" />
      <ellipse cx="46.8" cy="37.6" fill={INK} rx="4.2" ry="5.5" />
      <circle cx="34.5" cy="35.7" fill="#FFF9EF" r="1.5" />
      <circle cx="48.1" cy="35.7" fill="#FFF9EF" r="1.5" />
      <path d="m36.6 46 3.4-2.2 3.4 2.2-3.4 3.1Z" fill="#CB5E55" />
      <path d="M40 49.1c-1.9 3.8-5.1 4.1-7.1 1.2m7.1-1.2c1.9 3.8 5.1 4.1 7.1 1.2M24.9 45.2l-10-1.6m10.5 6.5-10.1 2.8m49.8-7.7 10-1.6m-10.5 6.5 10.1 2.8" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.7" />
      <path d="M25.7 22.3c2.1 2.3 3.8 4.9 4.3 8.1m24.3-8.1c-2.1 2.3-3.8 4.9-4.3 8.1" fill="none" stroke="#D46F20" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function Duck() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M24.1 47.6c0-13.8 8-24.3 21.1-24.3 9.6 0 16.8 7.1 16.8 16.3 0 3.2-.8 5.8-2.4 8 5.7 3.1 8.2 7.7 8.2 13.2H21.8c0-5.8 2.8-10 7.4-12.6-3.2-1.5-5.1-4.2-5.1-10.6Z" fill="#E9B830" />
      <path d="M57.1 36.3c7-3.2 13.5-1.5 15.4 2.8-2.8 4.8-9.9 6.1-15.7 3.1Z" fill="#E78035" />
      <path d="M31 45.4c4.5-4.6 11.9-4.3 17.1 1.2-3.4 5.8-10.9 7.8-17.1 4.5Z" fill="#F5CE4D" />
      <circle cx="51.3" cy="31.3" fill={INK} r="2.5" />
      <circle cx="52" cy="30.5" fill="#FFF9EF" r=".8" />
      <path d="M33.1 25.9c-2.5-4.8-2-9.3 1.2-12.3 4.9 3 6.7 8 4.6 12.8M31.7 62.7v6.2m18.4-6.2v6.2M28 69h7m10.6 0h7" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Elephant() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M17.4 42.3c0-14.4 9.2-25.1 22.8-25.1 14 0 24.5 10.3 24.5 24.3v10.4c0 6-4.7 10.2-11 10.2H28.5c-7.1 0-11.1-6.4-11.1-19.8Z" fill="#90AFBC" />
      <path d="M23.6 26.1c-7.3-3.1-13.8 2.9-13.8 11.6 0 9.2 5.8 15 14 12.9Zm32.8 0c7.3-3.1 13.8 2.9 13.8 11.6 0 9.2-5.8 15-14 12.9Z" fill="#AEC6CF" />
      <path d="M37.1 38.3v16.8c0 6.9 3.5 10.5 7.1 6.4l2.5-3.2V39.2c0-4-9.6-5.1-9.6-.9Z" fill="#7E9EAE" />
      <path d="M28.5 28.5c2.7-2.5 5.9-3.9 9.1-4.3m5.3 0c3.2.4 6.4 1.8 9.1 4.3" fill="none" stroke="#779AA9" strokeLinecap="round" strokeWidth="2" />
      <circle cx="31.1" cy="35.1" fill={INK} r="2.4" />
      <circle cx="48.9" cy="35.1" fill={INK} r="2.4" />
      <path d="M34.1 48.5c3.7 2.9 8.1 2.9 11.8 0M24.4 64.3v6.1m10.2-6.1v6.1m17.1-6.1v6.1m10.2-6.1v6.1M21.3 70.5h6.2m4.1 0h6.2m9.7 0h6.2m4.1 0h6.2" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Apple() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="M40 28.2c-7.1-7.4-21.8-4.6-25.1 9.5-3.2 13.8 5.2 29.8 16.2 30.1 4.2.1 6.1-2.6 8.9-2.6s4.7 2.7 8.9 2.6c10.7-.3 19.5-16.3 16.1-30.1C61.5 23.6 47.1 20.8 40 28.2Z" fill="#D95650" />
      <path d="M39.9 28.3c-.7-7.3 1.2-12.2 6.5-16.8" fill="none" stroke="#76502F" strokeLinecap="round" strokeWidth="3.4" />
      <path d="M45.5 14.8c6-5.1 13.8-5.1 18.1-3.1-2.3 7.5-9.6 11.5-18.8 9.6Z" fill="#679663" />
      <path d="M21.8 40.4c1.8-5 5.2-8.1 9.7-9.9" fill="none" stroke="#F28B79" strokeLinecap="round" strokeWidth="3.2" />
      <path d="M39.9 29.2c-3.7-2.7-8.4-3.6-12.1-2.6" fill="none" stroke="#C94845" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function Car() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <path d="m11.1 48.3 7.4-15.7c1.9-4.1 5-6.4 10.2-6.4h19.7c5.5 0 8.6 2.2 11.2 6.7l8.1 14.8c2.7.9 3.9 3.5 3.9 7.2v8.4H8.9v-8.6c0-3.4.8-5.4 2.2-6.4Z" fill="#398EAF" />
      <path d="m24.7 30.1-5.8 14.8h19.6V30.1Zm17 0v14.8h20.8l-6.9-11.9c-1.2-2-3.1-2.9-6.1-2.9Z" fill="#BBDCE2" />
      <path d="M40 30v15.1M21.5 47.8h37.8" fill="none" stroke="#26738F" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M31.1 48h8m4.5 0h6.1" fill="none" stroke="#245D72" strokeLinecap="round" strokeWidth="2.4" />
      <circle cx="24.1" cy="63.2" fill="#263A43" r="8.3" />
      <circle cx="57.8" cy="63.2" fill="#263A43" r="8.3" />
      <circle cx="24.1" cy="63.2" fill="#DDE0D9" r="3.5" />
      <circle cx="57.8" cy="63.2" fill="#DDE0D9" r="3.5" />
      <circle cx="24.1" cy="63.2" fill="#AAB6B3" r="1.3" />
      <circle cx="57.8" cy="63.2" fill="#AAB6B3" r="1.3" />
      <path d="M11.7 52.3h5.5m51.6 0h-5.5" fill="none" stroke="#F4C844" strokeLinecap="round" strokeWidth="3.4" />
      <path d="M70.4 54.4h1.2" stroke="#E56D4D" strokeLinecap="round" strokeWidth="3.3" />
    </svg>
  );
}

function Bear() {
  return (
    <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">
      <circle cx="24.3" cy="25.5" fill="#95664A" r="10.8" />
      <circle cx="55.7" cy="25.5" fill="#95664A" r="10.8" />
      <circle cx="24.3" cy="25.5" fill="#C9946D" r="5.1" />
      <circle cx="55.7" cy="25.5" fill="#C9946D" r="5.1" />
      <path d="M18.7 39.2c0-13 9.2-21.9 21.3-21.9s21.3 8.9 21.3 21.9v11.4c0 12.3-8.8 20.4-21.3 20.4s-21.3-8.1-21.3-20.4Z" fill="#A97550" />
      <ellipse cx="40" cy="49" fill="#E2B38D" rx="12.5" ry="10.2" />
      <circle cx="32.3" cy="37.1" fill={INK} r="2.4" />
      <circle cx="47.7" cy="37.1" fill={INK} r="2.4" />
      <path d="m36.8 46.3 3.2-2.1 3.2 2.1-3.2 3.1Z" fill="#6F4334" />
      <path d="M40 49.4c-1.9 3.7-5.1 4-7.1 1.1m7.1-1.1c1.9 3.7 5.1 4 7.1 1.1M28.3 64c-3.8 2-6.1 4.5-6.9 7.3m30.3-7.3c3.8 2 6.1 4.5 6.9 7.3" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Artwork({ subject }: ArtworkProps) {
  return {
    cat: <Cat />,
    duck: <Duck />,
    elephant: <Elephant />,
    apple: <Apple />,
    car: <Car />,
    bear: <Bear />,
  }[subject];
}

export default function ElevatedRefined() {
  return (
    <MemoryBoard
      direction="Refined C"
      note="Smooth silhouettes, little details, easy to remember."
      renderArtwork={(subject) => <Artwork subject={subject} />}
    />
  );
}