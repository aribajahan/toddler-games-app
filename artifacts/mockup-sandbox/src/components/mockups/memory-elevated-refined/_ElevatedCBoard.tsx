import type { ReactNode } from 'react';
import { ChevronLeft, Footprints, RotateCcw } from 'lucide-react';

export type ElevatedSubject =
  | 'dog'
  | 'rabbit'
  | 'turtle'
  | 'apple'
  | 'banana'
  | 'ball'
  | 'fox'
  | 'owl'
  | 'bear'
  | 'mushroom'
  | 'leaf'
  | 'kite'
  | 'whale'
  | 'penguin'
  | 'seal'
  | 'sailboat'
  | 'shell'
  | 'sun';

type CardDefinition = {
  subject: ElevatedSubject;
  color: string;
  surface: string;
};

type ElevatedCBoardProps = {
  eyebrow: string;
  note: string;
  cards: CardDefinition[];
  renderArtwork: (subject: ElevatedSubject) => ReactNode;
};

export function ElevatedCBoard({ eyebrow, note, cards, renderArtwork }: ElevatedCBoardProps) {
  const pairedCards = [...cards, ...cards];

  return (
    <main className="memory-direction-root min-h-screen w-full overflow-hidden">
      <div className="mx-auto flex min-h-[844px] w-full max-w-[390px] flex-col px-[18px] pb-5 pt-[58px]">
        <header className="flex items-center">
          <button
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full border border-[var(--playroom-border)] bg-white"
            type="button"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>
          <div className="ml-[13px] min-w-0 flex-1">
            <p className="mb-[3px] text-[10px] font-bold tracking-[0.14em] text-[var(--playroom-muted)]">{eyebrow}</p>
            <h1 className="text-[20px] font-bold leading-tight">Remember where</h1>
          </div>
          <button
            aria-label="Start a new game"
            className="flex size-10 items-center justify-center rounded-full border border-[var(--playroom-border)] bg-white text-[#7E8A92]"
            type="button"
          >
            <RotateCcw size={19} strokeWidth={1.8} />
          </button>
        </header>

        <section className="flex items-center justify-between px-[6px] py-4">
          <div>
            <p className="mb-1 text-[10px] font-bold tracking-[0.12em] text-[var(--playroom-muted)]">PAIRS FOUND</p>
            <p className="text-[25px] font-bold leading-none">0 <span className="text-[13px] font-medium text-[#9AA29E]">of 6</span></p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-[var(--playroom-border)] bg-white px-[11px] py-[9px] text-[12px] font-medium text-[#7E8A92]">
            <Footprints size={16} strokeWidth={1.8} />
            0 moves
          </div>
        </section>

        <section className="flex flex-1 content-center flex-wrap justify-center gap-3 py-2">
          {pairedCards.map((card, index) => (
            <div
              aria-label={`${card.subject} card`}
              className="flex h-[108px] w-[104px] items-center justify-center rounded-[20px] border-[1.5px] bg-white"
              key={`${card.subject}-${index}`}
              style={{ borderColor: card.color }}
            >
              <div
                className="flex size-[74px] items-center justify-center overflow-hidden rounded-[28px]"
                style={{ backgroundColor: card.surface }}
              >
                {renderArtwork(card.subject)}
              </div>
            </div>
          ))}
        </section>

        <footer className="mx-2 mt-1 rounded-xl border border-[var(--playroom-border)] bg-white/70 px-3 py-2 text-center">
          <p className="text-[11px] font-semibold text-[#7E8A92]">{note}</p>
        </footer>
      </div>
    </main>
  );
}

const INK = '#24313D';

function Svg({ children }: { children: ReactNode }) {
  return <svg aria-hidden="true" height="74" viewBox="0 0 80 80" width="74">{children}</svg>;
}

export function ElevatedArtwork({ subject }: { subject: ElevatedSubject }) {
  switch (subject) {
    case 'dog':
      return (
        <Svg>
          <path d="M19 35c0-13 9-22 21-22s21 9 21 22v17c0 12-9 20-21 20S19 64 19 52Z" fill="#C9814F" />
          <path d="M22 26C9 22 8 9 13 7c8 2 14 8 15 18Zm36 0c13-4 14-17 9-19-8 2-14 8-15 18Z" fill="#A8633F" />
          <ellipse cx="40" cy="44" fill="#E8B887" rx="12" ry="10" />
          <circle cx="32" cy="35" fill={INK} r="2.5" /><circle cx="48" cy="35" fill={INK} r="2.5" />
          <circle cx="40" cy="44" fill={INK} r="2.6" />
          <path d="M40 47c-2 4-5 4-7 1m7-1c2 4 5 4 7 1M25 61c4 3 9 4 15 4s11-1 15-4" fill="none" stroke="#A8633F" strokeLinecap="round" strokeWidth="2.2" />
          <path d="M30 68v3m20-3v3" stroke="#E8B887" strokeLinecap="round" strokeWidth="4" />
        </Svg>
      );
    case 'rabbit':
      return (
        <Svg>
          <path d="M28 29c-4-12-2-25 3-26 6-1 9 12 9 24 2-12 7-24 12-23 6 2 2 16-3 27 9 4 14 12 14 23 0 14-10 22-23 22S17 68 17 54c0-11 4-20 11-25Z" fill="#D89C78" />
          <path d="M31 9c1 8 3 14 7 18M51 10c-2 7-4 13-8 18" fill="none" stroke="#F1C9AD" strokeLinecap="round" strokeWidth="3" />
          <ellipse cx="40" cy="47" fill="#F0C6A4" rx="13" ry="12" />
          <circle cx="33" cy="39" fill={INK} r="2.4" /><circle cx="47" cy="39" fill={INK} r="2.4" />
          <path d="m37 48 3-2 3 2-3 3Z M40 51c-2 3-5 3-6 1m6-1c2 3 5 3 6 1" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.7" />
          <path d="M24 68c5-4 10-5 16-5s11 1 16 5" fill="none" stroke="#B97B5D" strokeLinecap="round" strokeWidth="4" />
        </Svg>
      );
    case 'turtle':
      return (
        <Svg>
          <ellipse cx="39" cy="43" fill="#5C9C73" rx="25" ry="21" />
          <path d="M20 39c3-12 13-19 23-19 9 0 17 5 22 15-7 10-17 16-29 16-7 0-12-4-16-12Z" fill="#7CB483" />
          <path d="M30 26c5 4 8 9 9 15m-19-4c7 1 14 0 20-4m-8 21c-2 5-1 9 2 12m11-12c3 4 3 8 1 12" fill="none" stroke="#4C875F" strokeLinecap="round" strokeWidth="2" />
          <path d="M61 37c8-4 14 1 13 7-1 6-8 8-14 5Z" fill="#8BBC7D" />
          <circle cx="68" cy="40" fill={INK} r="1.8" />
          <path d="M17 32c-6-4-10-1-9 4s6 7 12 5m1 14c-6 2-8 7-5 10s8 1 11-4" fill="#8BBC7D" />
        </Svg>
      );
    case 'apple':
      return (
        <Svg>
          <path d="M40 28c-8-8-23-4-26 11-3 15 7 29 17 29 5 0 7-3 9-3s4 3 9 3c10 0 20-14 17-29-3-15-18-19-26-11Z" fill="#D94842" />
          <path d="M40 28c-1-8 1-13 6-18" fill="none" stroke="#6C462B" strokeLinecap="round" strokeWidth="3" />
          <path d="M46 13c7-5 14-4 19-1-3 8-10 11-19 9Z" fill="#659B61" />
          <path d="M23 38c2-4 5-6 9-7" fill="none" stroke="#F08A70" strokeLinecap="round" strokeWidth="3" />
        </Svg>
      );
    case 'banana':
      return (
        <Svg>
          <path d="M18 23c10 15 20 24 34 23 7 0 11-3 14-8 2 10-5 21-18 24-17 4-29-8-34-26-2-7-1-11 4-13Z" fill="#E6B83E" />
          <path d="M21 28c8 11 17 17 28 16 6 0 11-2 15-6" fill="none" stroke="#F6D66C" strokeLinecap="round" strokeWidth="4" />
          <path d="M17 22c2-3 4-4 7-3m40 18c3 0 5-1 7-4" fill="none" stroke="#9D742F" strokeLinecap="round" strokeWidth="3" />
        </Svg>
      );
    case 'ball':
      return (
        <Svg>
          <circle cx="40" cy="40" fill="#F08E61" r="26" />
          <path d="M19 28c8 6 15 8 23 7 8-1 14-5 19-11M22 56c7-3 14-8 18-15 4-7 5-14 4-22M55 62c-4-7-6-13-5-20 1-8 5-14 11-18" fill="none" stroke="#F7C76E" strokeLinecap="round" strokeWidth="4" />
        </Svg>
      );
    case 'fox':
      return (
        <Svg>
          <path d="M20 38 19 14l17 10c3-1 5-1 8 0l17-10-1 24c3 13-6 28-20 28S17 51 20 38Z" fill="#D7783B" />
          <path d="m22 19 11 8-10 4Zm36 0-11 8 10 4Z" fill="#F0B474" />
          <path d="M25 44c4 10 10 16 15 16s11-6 15-16c-7-4-23-4-30 0Z" fill="#F7D4A2" />
          <circle cx="33" cy="38" fill={INK} r="2.5" /><circle cx="47" cy="38" fill={INK} r="2.5" />
          <path d="m37 47 3-2 3 2-3 3Z" fill={INK} />
          <path d="M40 50c-2 3-5 3-7 1m7-1c2 3 5 3 7 1" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.7" />
          <path d="M59 54c8 3 10 8 8 13-8 0-14-5-18-10" fill="#BC6031" />
        </Svg>
      );
    case 'owl':
      return (
        <Svg>
          <path d="M19 39c0-15 9-25 21-25s21 10 21 25c0 16-8 27-21 27S19 55 19 39Z" fill="#8E6F5C" />
          <path d="m20 26 2-14 11 8m25 6-2-14-11 8Z" fill="#765746" />
          <circle cx="32" cy="38" fill="#F2D18D" r="10" /><circle cx="48" cy="38" fill="#F2D18D" r="10" />
          <circle cx="32" cy="38" fill={INK} r="3" /><circle cx="48" cy="38" fill={INK} r="3" />
          <path d="m40 41 4 5-4 4-4-4Z" fill="#D59045" />
          <path d="M26 59c5 3 10 4 14 4s9-1 14-4" fill="none" stroke="#B38A6C" strokeLinecap="round" strokeWidth="3" />
        </Svg>
      );
    case 'bear':
      return (
        <Svg>
          <circle cx="24" cy="25" fill="#956448" r="11" /><circle cx="56" cy="25" fill="#956448" r="11" />
          <path d="M19 40c0-13 9-22 21-22s21 9 21 22v11c0 12-9 20-21 20s-21-8-21-20Z" fill="#A97550" />
          <ellipse cx="40" cy="49" fill="#E0B28C" rx="12" ry="10" />
          <circle cx="32" cy="38" fill={INK} r="2.5" /><circle cx="48" cy="38" fill={INK} r="2.5" />
          <path d="m37 47 3-2 3 2-3 3Z M40 50c-2 4-5 4-7 1m7-1c2 4 5 4 7 1" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.7" />
        </Svg>
      );
    case 'mushroom':
      return (
        <Svg>
          <path d="M18 37c2-15 12-23 22-23s20 8 22 23Z" fill="#D86B4C" />
          <circle cx="29" cy="27" fill="#F6C9A2" r="3" /><circle cx="45" cy="21" fill="#F6C9A2" r="3" /><circle cx="54" cy="30" fill="#F6C9A2" r="2.5" />
          <path d="M32 37h16v23c-4 5-12 5-16 0Z" fill="#F1D2A5" />
          <path d="M25 61c5-3 25-3 30 0-6 6-24 6-30 0Z" fill="#E7B98A" />
        </Svg>
      );
    case 'leaf':
      return (
        <Svg>
          <path d="M18 56c2-20 13-35 40-39-1 25-14 38-40 39Z" fill="#68A56C" />
          <path d="M20 58c11-12 21-22 35-34" fill="none" stroke="#3F7B58" strokeLinecap="round" strokeWidth="2.5" />
          <path d="M27 50c-2-5-2-9-1-13m10 5c-1-5 0-9 2-13m1 7c5-2 9-4 12-7" fill="none" stroke="#8BC180" strokeLinecap="round" strokeWidth="2" />
          <path d="M18 56c-1 5-2 9-5 13" fill="none" stroke="#6C462B" strokeLinecap="round" strokeWidth="3" />
        </Svg>
      );
    case 'kite':
      return (
        <Svg>
          <path d="m40 10 24 27-24 28-24-28Z" fill="#E36E5F" />
          <path d="M40 10v55M16 37h48" stroke="#F4BA63" strokeWidth="2.5" />
          <path d="M40 65c1 7 6 9 10 11m-9-9c-4 5-8 5-12 6" fill="none" stroke="#7D94A2" strokeLinecap="round" strokeWidth="2" />
          <path d="m47 72 4 5m-19-3-4 5" stroke="#E36E5F" strokeLinecap="round" strokeWidth="3" />
        </Svg>
      );
    case 'whale':
      return (
        <Svg>
          <path d="M12 46c7-17 23-23 38-17 7 3 12 9 17 7-1 9-9 14-18 15-13 2-23 7-37-5Z" fill="#5F91A4" />
          <path d="M55 31c5-8 12-7 15-2-3 1-5 3-7 6 5 0 8 3 9 7-7 1-13-3-17-11Z" fill="#4A778D" />
          <circle cx="43" cy="37" fill={INK} r="2.2" />
          <path d="M22 32c-2-8 1-12 5-15m1 16c0-7 3-11 7-14" fill="none" stroke="#8FC2C7" strokeLinecap="round" strokeWidth="2.4" />
        </Svg>
      );
    case 'penguin':
      return (
        <Svg>
          <path d="M22 42c0-17 8-29 18-29s18 12 18 29c0 16-7 25-18 25S22 58 22 42Z" fill="#425A66" />
          <ellipse cx="40" cy="45" fill="#F4E8D1" rx="12" ry="19" />
          <path d="m24 38-11 9c4 5 9 5 14 1m29-10 11 9c-4 5-9 5-14 1" fill="#344954" />
          <circle cx="34" cy="31" fill={INK} r="2.2" /><circle cx="46" cy="31" fill={INK} r="2.2" />
          <path d="m36 37 4-2 4 2-4 4Z" fill="#D99A43" />
          <path d="M31 66h7m4 0h7" stroke="#D99A43" strokeLinecap="round" strokeWidth="3" />
        </Svg>
      );
    case 'seal':
      return (
        <Svg>
          <path d="M16 50c2-16 11-25 24-25s22 9 24 25c-7 9-15 14-24 14S23 59 16 50Z" fill="#8AA7B0" />
          <ellipse cx="40" cy="35" fill="#9FBAC0" rx="15" ry="13" />
          <circle cx="35" cy="34" fill={INK} r="2.3" /><circle cx="45" cy="34" fill={INK} r="2.3" />
          <path d="m37 41 3-2 3 2-3 3Z M40 44c-2 3-4 3-6 1m6-1c2 3 4 3 6 1" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="1.6" />
          <path d="M22 53c-7 1-9 6-8 11 6 1 11-2 15-7m26-4c7 1 9 6 8 11-6 1-11-2-15-7" fill="#75939E" />
        </Svg>
      );
    case 'sailboat':
      return (
        <Svg>
          <path d="M16 51h48c-5 10-13 14-24 14s-19-4-24-14Z" fill="#D36D54" />
          <path d="M39 14v38" stroke="#6C462B" strokeLinecap="round" strokeWidth="3" />
          <path d="M37 18 18 43h19Z" fill="#F1B855" /><path d="M42 24l17 19H42Z" fill="#6F9FA5" />
          <path d="M13 68c9-3 17 3 27 0s18-3 27 0" fill="none" stroke="#84B5B8" strokeLinecap="round" strokeWidth="2.5" />
        </Svg>
      );
    case 'shell':
      return (
        <Svg>
          <path d="M15 57c1-19 12-32 25-32s24 13 25 32Z" fill="#E28E72" />
          <path d="M40 26v30M28 30c4 8 7 17 7 26m17-26c-4 8-7 17-7 26M20 40c6 4 12 8 20 8s14-4 20-8" fill="none" stroke="#F3C09D" strokeLinecap="round" strokeWidth="2.3" />
          <path d="M16 58c10 4 38 4 48 0" fill="none" stroke="#B86C5C" strokeLinecap="round" strokeWidth="3" />
        </Svg>
      );
    case 'sun':
      return (
        <Svg>
          <circle cx="40" cy="40" fill="#F1B94B" r="18" />
          <path d="M40 10v9m0 42v9M10 40h9m42 0h9M19 19l7 7m28 28 7 7m0-42-7 7M26 54l-7 7" stroke="#E39A40" strokeLinecap="round" strokeWidth="4" />
          <circle cx="34" cy="38" fill="#A56B3C" r="1.8" /><circle cx="46" cy="38" fill="#A56B3C" r="1.8" />
          <path d="M34 47c4 3 8 3 12 0" fill="none" stroke="#A56B3C" strokeLinecap="round" strokeWidth="1.8" />
        </Svg>
      );
  }
}