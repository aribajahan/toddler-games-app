import '../memory-art-directions/_group.css';
import { ElevatedArtwork, ElevatedCBoard, type ElevatedSubject } from '../memory-elevated-refined/_ElevatedCBoard';

const cards: Array<{ subject: ElevatedSubject; color: string; surface: string }> = [
  { subject: 'fox', color: '#D0783C', surface: '#FFF0DF' },
  { subject: 'owl', color: '#94735E', surface: '#F4ECE4' },
  { subject: 'bear', color: '#9A6A4E', surface: '#F4EADF' },
  { subject: 'mushroom', color: '#D36E52', surface: '#FBE9E3' },
  { subject: 'leaf', color: '#6F9F6F', surface: '#EAF3E8' },
  { subject: 'kite', color: '#D96D5F', surface: '#FCE8E3' },
];

export default function ElevatedDepth() {
  return (
    <ElevatedCBoard
      cards={cards}
      eyebrow="OPTION C · LITTLE WORLD"
      note="A tiny world of familiar shapes, ready to be remembered."
      renderArtwork={(subject) => <ElevatedArtwork subject={subject} />}
    />
  );
}