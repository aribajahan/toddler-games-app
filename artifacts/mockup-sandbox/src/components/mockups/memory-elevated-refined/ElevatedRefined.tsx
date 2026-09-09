import '../memory-art-directions/_group.css';
import { ElevatedArtwork, ElevatedCBoard, type ElevatedSubject } from './_ElevatedCBoard';

const cards: Array<{ subject: ElevatedSubject; color: string; surface: string }> = [
  { subject: 'dog', color: '#C78B5D', surface: '#FFF0DF' },
  { subject: 'rabbit', color: '#D59A78', surface: '#FFF0E7' },
  { subject: 'turtle', color: '#6C9E79', surface: '#EAF4E8' },
  { subject: 'apple', color: '#DD615B', surface: '#FCEAE7' },
  { subject: 'banana', color: '#D9AE3C', surface: '#FFF5D8' },
  { subject: 'ball', color: '#E18961', surface: '#FFF0E5' },
];

export default function ElevatedRefined() {
  return (
    <ElevatedCBoard
      cards={cards}
      eyebrow="OPTION C · NEW PALS"
      note="One clear shape at a time. Easy to spot, fun to remember."
      renderArtwork={(subject) => <ElevatedArtwork subject={subject} />}
    />
  );
}