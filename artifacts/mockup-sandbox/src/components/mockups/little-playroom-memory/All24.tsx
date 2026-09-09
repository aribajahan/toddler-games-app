import React from 'react';
import Svg from 'react-native-svg';
import { AnimalIllustrations } from '../../../../../little-playroom/components/memory-art/Animals';
import { ObjectIllustrations } from '../../../../../little-playroom/components/memory-art/Objects';
import './_group.css';

const cards = [
  { subject: 'cat', surface: '#FFF3E4', group: 'Animals' },
  { subject: 'dog', surface: '#F6ECE4', group: 'Animals' },
  { subject: 'rabbit', surface: '#F1F3F3', group: 'Animals' },
  { subject: 'duck', surface: '#FFF7D9', group: 'Animals' },
  { subject: 'elephant', surface: '#EAF3F5', group: 'Animals' },
  { subject: 'bear', surface: '#F4EADF', group: 'Animals' },
  { subject: 'fox', surface: '#FFF0E3', group: 'Animals' },
  { subject: 'lion', surface: '#FFF3D8', group: 'Animals' },
  { subject: 'turtle', surface: '#EAF3E8', group: 'Animals' },
  { subject: 'fish', surface: '#FFF1DF', group: 'Animals' },
  { subject: 'owl', surface: '#F4EADF', group: 'Animals' },
  { subject: 'butterfly', surface: '#FBE9EE', group: 'Animals' },
  { subject: 'apple', surface: '#FCEAE7', group: 'Objects & foods' },
  { subject: 'car', surface: '#E6F3F7', group: 'Objects & foods' },
  { subject: 'banana', surface: '#FFF6D8', group: 'Objects & foods' },
  { subject: 'strawberry', surface: '#FCE9E7', group: 'Objects & foods' },
  { subject: 'flower', surface: '#FBEAF0', group: 'Objects & foods' },
  { subject: 'ball', surface: '#ECF3EE', group: 'Objects & foods' },
  { subject: 'boat', surface: '#EAF2F6', group: 'Objects & foods' },
  { subject: 'airplane', surface: '#E8F2F8', group: 'Objects & foods' },
  { subject: 'train', surface: '#FBEAE7', group: 'Objects & foods' },
  { subject: 'star', surface: '#FFF6D8', group: 'Objects & foods' },
  { subject: 'kite', surface: '#FAE9EC', group: 'Objects & foods' },
  { subject: 'cupcake', surface: '#FBEAF0', group: 'Objects & foods' },
] as const;

const illustrations = { ...AnimalIllustrations, ...ObjectIllustrations };

function GalleryCard({ subject, surface }: { subject: string; surface: string }) {
  const Illustration = illustrations[subject as keyof typeof illustrations];

  return (
    <article className="flex min-w-0 flex-col items-center gap-3">
      <div
        className="flex aspect-square w-full items-center justify-center rounded-[26px] border border-black/[0.055] shadow-[0_8px_24px_rgba(63,54,44,0.07)]"
        style={{ backgroundColor: surface }}
      >
        <Svg accessibilityLabel={subject} height="78%" viewBox="0 0 80 80" width="78%">
          <Illustration />
        </Svg>
      </div>
      <span className="text-[13px] font-semibold capitalize tracking-[-0.01em] text-[#657078]">
        {subject}
      </span>
    </article>
  );
}

export function All24() {
  return (
    <main className="little-playroom-gallery min-h-screen bg-[#F7F4EE] px-12 py-10 text-[#24313D]">
      <header className="mb-8 flex items-end justify-between border-b border-[#E7DED2] pb-7">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B1A597]">
            Little Playroom · Memory Game
          </p>
          <h1 className="text-[38px] font-bold tracking-[-0.045em]">The complete card family</h1>
        </div>
        <div className="rounded-full bg-white/80 px-4 py-2 text-[13px] font-semibold text-[#7A817E] shadow-sm">
          24 subjects · 6 pairs each round
        </div>
      </header>

      <section className="grid grid-cols-6 gap-x-6 gap-y-7">
        {cards.map((card) => (
          <GalleryCard key={card.subject} subject={card.subject} surface={card.surface} />
        ))}
      </section>
    </main>
  );
}