import type { PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';
import { MemoryBoard } from '../memory-art-directions/_shared/MemoryBoard';
import '../memory-art-directions/_group.css';

type ArtworkProps = {
  subject: PreviewSubject;
};

function CatArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 74 74">
      <path d="M20 58c-4-7-4-17-1-26L18 11c0-1 1-2 2-1l13 8c4-2 8-3 12-2l12-7c1-1 2 0 2 1l-1 21c3 5 4 10 3 16-1 8-7 13-14 13H31c-5 0-9-1-11-2Z" fill="#e89039" />
      <path d="M21 15l2 17 9-12-10-6a1 1 0 0 0-1 1Zm37 0-1 16-8-12 8-5a1 1 0 0 1 1 1Z" fill="#f6b45e" />
      <path d="M25 22c3-2 6-3 9-4l-3 8-6-4Zm25-4c3 1 6 2 8 4l-5 4-3-8Z" fill="#d86c2b" opacity=".72" />
      <path d="M24 34c0-7 5-12 13-12 9 0 15 5 15 13 0 7-6 12-14 12-8 0-14-5-14-13Z" fill="#f4a947" />
      <path d="M29 33c0-3 2-6 5-6 3 0 5 3 5 6s-2 6-5 6c-3 0-5-3-5-6Zm14 0c0-3 2-6 5-6s5 3 5 6-2 6-5 6-5-3-5-6Z" fill="#fff8ed" />
      <ellipse cx="35" cy="33" rx="2.1" ry="3.4" fill="#27353b" />
      <ellipse cx="48" cy="33" rx="2.1" ry="3.4" fill="#27353b" />
      <circle cx="35.7" cy="31.5" r=".8" fill="#fff" />
      <circle cx="48.7" cy="31.5" r=".8" fill="#fff" />
      <path d="M38 40c2-2 4-2 6 0-1 2-2 3-3 3s-2-1-3-3Z" fill="#b84e3f" />
      <path d="M41 43c-1 3-4 4-6 2m6-2c1 3 4 4 6 2" fill="none" stroke="#6b3b2d" strokeLinecap="round" strokeWidth="1.2" />
      <path d="M27 40 18 39m9 4-9 2m32-5 9-2m-9 6 8 2" fill="none" stroke="#aa5b2d" strokeLinecap="round" strokeWidth="1.3" />
      <path d="M24 50c2 7 7 10 12 10 3 0 6-1 8-3l3 3c5-1 8-4 9-8-4-2-8-2-11 1-4-2-8-2-12 0-2-2-5-3-9-3Z" fill="#f8c573" />
      <path d="M56 48c9 4 10 13 3 19-3 3-8 4-12 1 8-1 11-5 9-10-1-3-3-5-6-6l6-4Z" fill="#d97d2d" />
      <path d="M55 51c4 2 6 5 6 8M52 56c4 1 6 3 6 6" fill="none" stroke="#f3af53" strokeLinecap="round" strokeWidth="1.6" />
      <path d="M30 58c-2 3-1 5 2 5 2 0 3-1 3-3m5-2c-1 3 0 5 3 5 2 0 3-1 3-3" fill="none" stroke="#d3782e" strokeLinecap="round" strokeWidth="1.4" />
    </svg>
  );
}

function DuckArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 74 74">
      <path d="M22 53c-3-5-2-12 2-17 2-3 5-5 9-6-1-5 0-10 4-13 5 3 8 7 8 13 6 1 10 5 10 11 0 8-7 14-17 14-7 0-13-1-16-2Z" fill="#f2c84b" />
      <path d="M37 17c4 2 7 6 7 11l-7 3c-2-4-2-9 0-14Z" fill="#e8b133" />
      <path d="M34 30c-3 3-5 8-4 14 1 5 5 9 11 10-9 2-17-2-19-8-2-7 2-13 12-16Z" fill="#f6d65e" />
      <path d="M47 34c4 1 7 4 8 7-3 2-8 2-11-1Z" fill="#df8a35" />
      <path d="M48 31c-2-3-1-7 2-9 3 2 4 5 3 9-1 2-3 2-5 0Z" fill="#f7d768" />
      <circle cx="50" cy="27" r="1.35" fill="#354044" />
      <path d="M51 31c3 0 6 1 7 3-2 2-5 2-8 0Z" fill="#dc7130" />
      <path d="M27 56c-1 5-2 7-5 8m15-7c0 4 1 6 3 8" fill="none" stroke="#d49331" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M17 64h10m8 0h8" fill="none" stroke="#c27c2a" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M32 42c3 4 7 5 12 4" fill="none" stroke="#e4aa31" strokeLinecap="round" strokeWidth="1.2" />
      <path d="M32 52c4-2 8-2 12 0" fill="none" stroke="#f9dc70" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function ElephantArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 74 74">
      <path d="M18 47c-2-12 3-23 14-27 10-4 22 1 26 10 3 6 2 13-2 19-3 4-8 6-14 6H27c-5 0-8-3-9-8Z" fill="#8eabb7" />
      <path d="M28 26c-1-7 1-12 5-16 4 3 5 8 3 14Z" fill="#7898a4" />
      <path d="M45 31c-1-6 3-10 8-11 3 4 3 9 0 13Z" fill="#7898a4" />
      <path d="M54 39c8 0 11 4 10 9-1 4-5 6-10 5l-3-4c3-2 5-5 3-10Z" fill="#8eabb7" />
      <path d="M60 45c3 1 4 3 3 5-2 2-5 1-7 0" fill="none" stroke="#6f909d" strokeLinecap="round" strokeWidth="2" />
      <path d="M24 39c0-3 2-5 5-5 3 0 5 2 5 5s-2 5-5 5-5-2-5-5Z" fill="#dbe7e7" />
      <circle cx="29" cy="39" r="1.7" fill="#2e444b" />
      <path d="M19 35c-3 2-5 5-5 9 0 4 2 7 5 8m7-1c-1 4-1 7 1 9m14-8c0 3 1 6 3 8" fill="none" stroke="#6f919d" strokeLinecap="round" strokeWidth="2" />
      <path d="M34 48c3 3 7 4 11 2" fill="none" stroke="#6f919d" strokeLinecap="round" strokeWidth="1.2" />
      <path d="M18 28c3-4 7-7 12-8" fill="none" stroke="#b4c9cc" strokeLinecap="round" strokeWidth="2" opacity=".8" />
    </svg>
  );
}

function AppleArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 74 74">
      <path d="M38 21c-2-5-1-9 3-13 4 2 6 6 4 11-2 3-4 4-7 2Z" fill="#7c542e" />
      <path d="M42 16c6-7 13-8 19-7-1 7-6 12-16 13Z" fill="#71964b" />
      <path d="M38 23c-8-6-18-1-21 8-4 12 2 29 13 33 4 1 7-1 10-1 4 0 7 2 11 0 10-4 16-20 12-31-3-9-12-14-20-9-2 1-3 2-5 0Z" fill="#db6252" />
      <path d="M25 31c3-4 6-5 8-5" fill="none" stroke="#f3a07e" strokeLinecap="round" strokeWidth="3" opacity=".8" />
      <path d="M38 23c-1 7-1 10 0 13" fill="none" stroke="#b84943" strokeLinecap="round" strokeWidth="1.3" opacity=".8" />
      <path d="M49 57c4 0 7-1 10-4" fill="none" stroke="#c84e49" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function CarArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 74 74">
      <path d="M14 47c0-4 3-6 6-7l4-10c1-3 4-5 8-5h15c4 0 7 2 9 5l4 10c3 1 5 4 5 7v8H14v-8Z" fill="#5a9bb4" />
      <path d="m27 29-3 9h27l-4-9H27Z" fill="#d9edf0" />
      <path d="M38 29v9h13l-4-9H38Z" fill="#bddfe4" />
      <path d="M17 43h39c4 0 6 3 6 6H12c0-3 2-6 5-6Z" fill="#63a8bd" />
      <path d="M14 44h6c2 0 3 2 2 5h-9c-2-1-1-4 1-5Z" fill="#f3ca52" />
      <path d="M64 44h3c2 1 3 3 2 5h-6c-1-2-1-4 1-5Z" fill="#e78362" />
      <path d="M28 48h13" fill="none" stroke="#34768f" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M45 47h5" fill="none" stroke="#34768f" strokeLinecap="round" strokeWidth="1.8" />
      <circle cx="25" cy="56" r="7" fill="#304b58" />
      <circle cx="25" cy="56" r="3.3" fill="#d4d7d1" />
      <circle cx="57" cy="56" r="7" fill="#304b58" />
      <circle cx="57" cy="56" r="3.3" fill="#d4d7d1" />
      <path d="M15 59h53" fill="none" stroke="#3d7f91" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function BearArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 74 74">
      <circle cx="27" cy="20" r="8" fill="#9a6a4e" />
      <circle cx="51" cy="20" r="8" fill="#9a6a4e" />
      <circle cx="27" cy="20" r="4" fill="#d39a6b" />
      <circle cx="51" cy="20" r="4" fill="#d39a6b" />
      <path d="M20 47c-2-12 2-23 12-27 11-5 24-1 29 9 3 6 2 15-2 21-4 7-12 9-22 9-10 0-16-3-17-12Z" fill="#9a6a4e" />
      <path d="M28 38c0-5 4-9 10-9 7 0 12 4 12 10 0 6-5 10-12 10-6 0-10-4-10-11Z" fill="#c38759" />
      <path d="M25 34c0-3 2-5 5-5 3 0 5 2 5 5s-2 5-5 5-5-2-5-5Zm17 0c0-3 2-5 5-5 3 0 5 2 5 5s-2 5-5 5-5-2-5-5Z" fill="#f0d9b9" />
      <circle cx="30" cy="34" r="1.7" fill="#36444a" />
      <circle cx="47" cy="34" r="1.7" fill="#36444a" />
      <path d="M37 42c2-2 5-2 7 0-1 2-2 3-4 3-1 0-2-1-3-3Z" fill="#614237" />
      <path d="M40 45c0 3-3 4-5 3m5-3c1 3 4 4 6 2" fill="none" stroke="#654439" strokeLinecap="round" strokeWidth="1.2" />
      <path d="M25 50c-1 5 0 9 3 12m23-13c0 5-2 9-5 12" fill="none" stroke="#815338" strokeLinecap="round" strokeWidth="2.1" />
      <path d="M27 56c3 2 6 3 9 3" fill="none" stroke="#bc8159" strokeLinecap="round" strokeWidth="2" opacity=".8" />
      <path d="M57 43c5 4 6 10 4 15-2 5-6 7-11 8 4-4 5-8 3-12-1-3-3-5-6-6l10-5Z" fill="#815338" />
    </svg>
  );
}

function Artwork({ subject }: ArtworkProps) {
  if (subject === 'cat') return <CatArtwork />;
  if (subject === 'duck') return <DuckArtwork />;
  if (subject === 'elephant') return <ElephantArtwork />;
  if (subject === 'apple') return <AppleArtwork />;
  if (subject === 'car') return <CarArtwork />;
  return <BearArtwork />;
}

export default function EditorialC() {
  return (
    <MemoryBoard
      direction="Editorial C"
      note="Take your time — good remembering is quiet work."
      renderArtwork={(subject) => <Artwork subject={subject} />}
    />
  );
}