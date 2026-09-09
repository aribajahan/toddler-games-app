import type { ReactNode } from 'react';
import { ChevronLeft, Footprints, RotateCcw } from 'lucide-react';

export type PreviewSubject = 'cat' | 'duck' | 'elephant' | 'apple' | 'car' | 'bear';

const cards: Array<{ subject: PreviewSubject; color: string; surface: string }> = [
  { subject: 'cat', color: '#E59B56', surface: '#FFF3E4' },
  { subject: 'duck', color: '#E4B536', surface: '#FFF7D9' },
  { subject: 'elephant', color: '#89AAB9', surface: '#EAF3F5' },
  { subject: 'apple', color: '#DD615B', surface: '#FCEAE7' },
  { subject: 'car', color: '#5B9EB8', surface: '#E6F3F7' },
  { subject: 'bear', color: '#9A6A4E', surface: '#F4EADF' },
];

const pairedCards = [...cards, ...cards];

type MemoryBoardProps = {
  direction: string;
  note: string;
  renderArtwork: (subject: PreviewSubject) => ReactNode;
};

export function MemoryBoard({ direction, note, renderArtwork }: MemoryBoardProps) {
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
            <p className="mb-[3px] text-[10px] font-bold tracking-[0.14em] text-[var(--playroom-muted)]">
              {direction.toUpperCase()}
            </p>
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