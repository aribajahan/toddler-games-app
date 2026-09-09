import type { ReactNode } from 'react';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';
import '../memory-art-directions/_group.css';

const paperFilter = 'url(#paper-layer-shadow)';

function ArtworkFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className="h-[74px] w-[74px]"
      fill="none"
      viewBox="0 0 74 74"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="paper-layer-shadow" colorInterpolationFilters="sRGB" height="140%" width="140%" x="-20%" y="-20%">
          <feDropShadow dx="0" dy="0.8" floodColor="#5f4a38" floodOpacity="0.13" stdDeviation="0.7" />
        </filter>
      </defs>
      {children}
    </svg>
  );
}

function CatArtwork() {
  return (
    <ArtworkFrame>
      <path d="M53.4 52.1c6.6 2.4 9 8.2 6.8 13.2-1.6 3.7-5.5 4.6-8.5 2.2 2.4-3.2 3.7-6.5 1.7-9.8Z" fill="#C9782B" filter={paperFilter} />
      <path d="M22 45.4c0-9.8 6.4-16.5 15.6-16.5 9.8 0 15.9 7 15.9 17v14.2c0 5.7-4.2 9-15.6 9-11.4 0-15.9-3.2-15.9-9Z" fill="#E88922" filter={paperFilter} />
      <path d="M20.1 15.9 20 33.3l10.7-8.2Z" fill="#E88922" filter={paperFilter} />
      <path d="m53.1 15.9-.1 17.4L42.3 25Z" fill="#E88922" filter={paperFilter} />
      <path d="M23.9 19.9 22.7 28l5.7-4.2Z" fill="#F6B47D" />
      <path d="m49.4 19.9 1.2 8.1-5.7-4.2Z" fill="#F6B47D" />
      <path d="M20.4 30.8c2.6-8.6 9-13.1 15.9-13.1 8 0 14.4 4.6 16.4 13.6l-.7 12.3c-.7 9.5-7 14.5-15.7 14.5-9 0-15.7-5.1-16.1-14.8Z" fill="#EC941F" filter={paperFilter} />
      <path d="M35.6 18.2h4.9l-1.7 9.1h-2.5Z" fill="#C9782B" />
      <path d="m29.5 20.1 3.8 1.5-2.6 7.5-3-5.9Z" fill="#C9782B" />
      <path d="m45.8 20.1-3.8 1.5 2.6 7.5 3-5.9Z" fill="#C9782B" />
      <path d="M30.6 34.7c0-3.7 2.1-5.8 5.2-5.8s5.2 2.1 5.2 5.8v7.5c0 3.6-2.1 5.8-5.2 5.8s-5.2-2.2-5.2-5.8Z" fill="#FFF0CF" />
      <ellipse cx="29" cy="33.4" fill="#FFF9ED" rx="5.4" ry="6.5" />
      <ellipse cx="45.1" cy="33.4" fill="#FFF9ED" rx="5.4" ry="6.5" />
      <ellipse cx="30.3" cy="33.5" fill="#28313A" rx="2.5" ry="3.7" />
      <ellipse cx="43.8" cy="33.5" fill="#28313A" rx="2.5" ry="3.7" />
      <circle cx="31" cy="32.2" fill="#FFF9ED" r="0.8" />
      <circle cx="44.5" cy="32.2" fill="#FFF9ED" r="0.8" />
      <path d="m35.9 38.6 1.9-1.3 1.9 1.3-1.9 1.5Z" fill="#CC6D57" />
      <path d="M37.8 40.1c0 2.5-2.1 3.8-4 3.7m4-3.7c0 2.5 2.1 3.8 4 3.7" stroke="#714B3A" strokeLinecap="round" strokeWidth="1.25" />
      <path d="m25.2 39.2-7.3-1.5m7.5 5.1-7.5.4m26.9-4 7.3-1.5m-7.5 5.1 7.5.4" stroke="#C9782B" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M25.8 51.5c1.9 4.7 5.1 7.7 11.7 7.7 6.4 0 9.9-3.1 11.6-7.7l-3.6 10.2H29.5Z" fill="#F6AE32" />
      <ellipse cx="29.7" cy="65.2" fill="#FFF0CF" rx="5.4" ry="3.1" />
      <ellipse cx="44.9" cy="65.2" fill="#FFF0CF" rx="5.4" ry="3.1" />
      <path d="M30 63.7v2.2m5.1-2.2v2.2m5.1-2.2v2.2m5-2.2v2.2" stroke="#D8904D" strokeLinecap="round" strokeWidth="1" />
    </ArtworkFrame>
  );
}

function DuckArtwork() {
  return (
    <ArtworkFrame>
      <ellipse cx="37" cy="48.7" fill="#D09A26" opacity="0.22" rx="20.5" ry="15.5" />
      <path d="M20.1 48.8c0-9.1 6.9-16.2 16.8-16.2 9.4 0 16.5 6.8 16.5 16.1 0 9.1-6.8 15.3-16.7 15.3-9.7 0-16.6-5.9-16.6-15.2Z" fill="#F2C34C" filter={paperFilter} />
      <circle cx="36.8" cy="28.5" fill="#F5C94B" r="14.1" filter={paperFilter} />
      <path d="M28.6 32.2c2.4 3.6 5.5 5.4 9.1 5.4s6.7-1.8 9.1-5.4c-2.2 6.2-5 9.3-9.1 9.3s-6.9-3.1-9.1-9.3Z" fill="#DFA52D" />
      <path d="M25.8 29.9c-4.5-.7-7.5-3.2-8.6-6.1 3.9-1.9 9.1-.8 12.1 2.3Z" fill="#E99327" filter={paperFilter} />
      <path d="M48 29.9c4.5-.7 7.5-3.2 8.6-6.1-3.9-1.9-9.1-.8-12.1 2.3Z" fill="#E99327" filter={paperFilter} />
      <circle cx="32.7" cy="27.2" fill="#34404A" r="1.45" />
      <circle cx="41.1" cy="27.2" fill="#34404A" r="1.45" />
      <path d="M23.8 48.1c3.4-4.2 7.7-5.1 12.1-2.1l-2.4 11.8c-4.8-.4-8.2-3.5-9.7-9.7Z" fill="#E3AA35" />
      <path d="M28.8 62.2c-.2 3.3-1.9 5-4.1 5.6m19.2-5.6c.2 3.3 1.9 5 4.1 5.6" stroke="#E99327" strokeLinecap="round" strokeWidth="2.3" />
      <path d="M29.8 49.4c.9 2.4 2.9 3.6 6 3.6 3.2 0 5.4-1.3 6.3-3.9-1.3 4.2-3.3 6.4-6.3 6.4-3 0-5-2-6-6.1Z" fill="#F7D36F" />
    </ArtworkFrame>
  );
}

function ElephantArtwork() {
  return (
    <ArtworkFrame>
      <path d="M19.2 45.9c0-10.5 7.4-18.1 17.7-18.1s17.9 6.9 17.9 17.4v12.6c0 5.1-3.9 8.6-9.2 8.6H28.6c-5.4 0-9.4-3.9-9.4-10.5Z" fill="#86AAB8" filter={paperFilter} />
      <path d="M24.1 34.7c-7.2-1.8-10.3-7.5-8-14.4 1.6-4.9 5.4-7.5 9.4-6.5 5.1 1.3 7 7.3 5 13.2Z" fill="#7098A8" filter={paperFilter} />
      <path d="M49.9 34.7c7.2-1.8 10.3-7.5 8-14.4-1.6-4.9-5.4-7.5-9.4-6.5-5.1 1.3-7 7.3-5 13.2Z" fill="#7098A8" filter={paperFilter} />
      <path d="M24.2 22.1c2.7 1.8 4.4 4.7 4.7 8.1l-5.6 2.9c-2.3-3.3-2.1-7.3.9-11Z" fill="#A6C3CB" />
      <path d="M49.8 22.1c-2.7 1.8-4.4 4.7-4.7 8.1l5.6 2.9c2.3-3.3 2.1-7.3-.9-11Z" fill="#A6C3CB" />
      <path d="M35.8 36.8c-1.7 7.8-1.6 15.1.5 20.6 1.3 3.5 4.4 4.1 6.5 2.2 1.7-1.5 1.1-4-.8-5.5-1.9-1.4-2.4-4.3-1.1-7.4 1.5-3.7 2.1-6.4 1-9.9Z" fill="#86AAB8" filter={paperFilter} />
      <circle cx="30.4" cy="36.8" fill="#33424A" r="1.55" />
      <circle cx="43.8" cy="36.8" fill="#33424A" r="1.55" />
      <path d="M26.4 49.6c1.6 2.4 3.9 3.6 6.8 3.6m11-3.6c-1.6 2.4-3.9 3.6-6.8 3.6" stroke="#658D9A" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M27.7 62.8v3.7m18.7-3.7v3.7" stroke="#7098A8" strokeLinecap="round" strokeWidth="3.2" />
    </ArtworkFrame>
  );
}

function AppleArtwork() {
  return (
    <ArtworkFrame>
      <path d="M36.8 22.5c-1.6-5-1.6-8.8.2-12.4" stroke="#725030" strokeLinecap="round" strokeWidth="3.1" />
      <path d="M38.3 17.7c4.6-7.3 10.1-9.2 16.7-8.2-1.2 6.7-6.9 10.4-16.7 8.2Z" fill="#739B4A" filter={paperFilter} />
      <path d="M37.1 25.5c-4.4-2.7-9.9-2.9-14.5-.7-8.9 4.3-10.4 16.1-6.9 27.2 3.1 9.9 9.3 14.5 16.5 13.1 3-.6 4.9-1.8 7.7-1.8 2.9 0 4.6 1.2 7.6 1.8 7.4 1.4 12.1-5.7 14.5-13.5 2.2-7.2 2.1-15-2.1-20.8-5.9-8-15.2-6.9-20.3-5.3Z" fill="#DC5950" filter={paperFilter} />
      <path d="M39.8 26.3c-.9 4.1-1.5 9-1.4 14.3.1 6.8.5 14.8 2.1 22.6 3.2-.1 5.2-1.4 7-1.8 7.4-1.4 12.1-8.4 14.5-16-2.2 7.1-6.9 9.8-12.8 9.1-5.3-.7-7.5-5.3-8.1-13.4-.4-5.4.1-10.4-1.3-14.8Z" fill="#C94746" opacity="0.45" />
      <path d="M23.1 38.7c-2.4 2.8-2.9 6.8-2.4 10.4" stroke="#F1866B" strokeLinecap="round" strokeWidth="3" />
    </ArtworkFrame>
  );
}

function CarArtwork() {
  return (
    <ArtworkFrame>
      <path d="M13 48.1c.6-5.3 4.1-8.3 9.3-8.9l7.1-10.7c1.8-2.7 4.5-4.1 7.7-4.1h9c3.5 0 6.1 1.5 8.3 4.3l5.1 6.8c2.6 1.5 3.5 4.7 3.5 9.3v6.5c0 2.4-1.7 4-4.2 4H16.8c-2.8 0-4.3-2.2-3.8-7.2Z" fill="#438DAA" filter={paperFilter} />
      <path d="m29.8 27.3-5.3 10.2h15.1V26.2h-5.3c-1.9 0-3.4.3-4.5 1.1Z" fill="#D3E7E8" />
      <path d="M42.6 26.2v11.3h16.1l-4.6-6.2c-1.8-2.5-3.7-4.1-6.9-4.8Z" fill="#C4DDE0" />
      <path d="M40.1 26.5v11.2" stroke="#438DAA" strokeWidth="1.7" />
      <path d="M14.1 45.4h6.5c1.6 0 2.6 1.2 2.1 2.6l-1 2.8h-8.2c-.5-1.5-.4-3.6.6-5.4Z" fill="#F2C448" />
      <path d="M61.7 44.3c2.3.1 3.4 1.6 3.8 3.9-.1 1.1-.2 2.1-.6 2.6h-4.2l-1-3.8c-.4-1.3.7-2.6 2-2.7Z" fill="#DF704F" />
      <circle cx="25.6" cy="52.4" fill="#344D59" r="8.2" />
      <circle cx="25.6" cy="52.4" fill="#D8DED8" r="4.1" />
      <circle cx="25.6" cy="52.4" fill="#9EAFAD" r="2.2" />
      <circle cx="54.7" cy="52.4" fill="#344D59" r="8.2" />
      <circle cx="54.7" cy="52.4" fill="#D8DED8" r="4.1" />
      <circle cx="54.7" cy="52.4" fill="#9EAFAD" r="2.2" />
      <rect fill="#236F8F" height="2.1" rx="1.05" width="7.5" x="35.6" y="44.2" />
      <circle cx="21.8" cy="39.9" fill="#214C67" r="2" />
    </ArtworkFrame>
  );
}

function BearArtwork() {
  return (
    <ArtworkFrame>
      <circle cx="25.8" cy="25.3" fill="#8C5F48" r="8.3" filter={paperFilter} />
      <circle cx="48.2" cy="25.3" fill="#8C5F48" r="8.3" filter={paperFilter} />
      <circle cx="25.8" cy="25.3" fill="#B47751" r="4.4" />
      <circle cx="48.2" cy="25.3" fill="#B47751" r="4.4" />
      <path d="M21.1 45.7c0-11.5 6.8-18.2 15.9-18.2s15.9 6.7 15.9 18.2v12.6c0 6.2-5.9 9.8-15.9 9.8s-15.9-3.6-15.9-9.8Z" fill="#9A6A4E" filter={paperFilter} />
      <circle cx="37" cy="34.1" fill="#AA7655" r="13.5" filter={paperFilter} />
      <ellipse cx="31.7" cy="34.6" fill="#2F3438" rx="1.65" ry="1.9" />
      <ellipse cx="42.3" cy="34.6" fill="#2F3438" rx="1.65" ry="1.9" />
      <circle cx="32.2" cy="34" fill="#F7E8D0" r="0.55" />
      <circle cx="42.8" cy="34" fill="#F7E8D0" r="0.55" />
      <ellipse cx="37" cy="41.2" fill="#EBCDAA" rx="6.4" ry="5.1" />
      <path d="m34.6 40.3 2.4-1.5 2.4 1.5-2.4 1.8Z" fill="#704A3C" />
      <path d="M37 41.9c0 2 1.7 3 3.2 3m-3.2-3c0 2-1.7 3-3.2 3" stroke="#704A3C" strokeLinecap="round" strokeWidth="1.05" />
      <ellipse cx="28.6" cy="63.1" fill="#B47751" rx="5.2" ry="3.3" />
      <ellipse cx="45.4" cy="63.1" fill="#B47751" rx="5.2" ry="3.3" />
    </ArtworkFrame>
  );
}

function renderArtwork(subject: PreviewSubject) {
  switch (subject) {
    case 'cat':
      return <CatArtwork />;
    case 'duck':
      return <DuckArtwork />;
    case 'elephant':
      return <ElephantArtwork />;
    case 'apple':
      return <AppleArtwork />;
    case 'car':
      return <CarArtwork />;
    case 'bear':
      return <BearArtwork />;
    default:
      return null;
  }
}

export default function PaperLayered() {
  return (
    <MemoryBoard
      direction="Paper layered"
      note="Crisp color planes with tiny, quiet paper shadows."
      renderArtwork={renderArtwork}
    />
  );
}