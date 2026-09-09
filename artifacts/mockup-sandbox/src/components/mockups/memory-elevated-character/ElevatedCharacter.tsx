import '../memory-art-directions/_group.css';
import { ElevatedArtwork, ElevatedCBoard, type ElevatedSubject } from '../memory-elevated-refined/_ElevatedCBoard';

const cards: Array<{ subject: ElevatedSubject; color: string; surface: string }> = [
  { subject: 'whale', color: '#6997A8', surface: '#E8F3F5' },
  { subject: 'penguin', color: '#58707A', surface: '#EBF1F2' },
  { subject: 'seal', color: '#8DAAB2', surface: '#EAF3F4' },
  { subject: 'sailboat', color: '#D36D54', surface: '#FBEAE2' },
  { subject: 'shell', color: '#DB8D72', surface: '#FCEBE5' },
  { subject: 'sun', color: '#E3AA43', surface: '#FFF4D6' },
];

export default function ElevatedCharacter() {
  return (
    <ElevatedCBoard
      cards={cards}
      eyebrow="OPTION C · OUTSIDE"
      note="Friendly shapes from the shore, sky, and sunny days."
      renderArtwork={(subject) => <ElevatedArtwork subject={subject} />}
    />
  );
}