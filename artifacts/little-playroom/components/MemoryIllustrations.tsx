import React from 'react';
import Svg from 'react-native-svg';
import { AnimalIllustrations } from '@/components/memory-art/Animals';
import { ObjectIllustrations } from '@/components/memory-art/Objects';
import type { MemorySubject } from '@/components/memory-art/types';

export type { MemorySubject } from '@/components/memory-art/types';

type IllustrationProps = {
  subject: MemorySubject;
  size?: number;
};

export type MemoryDeckEntry = {
  pair: MemorySubject;
  color: string;
  surface: string;
};

export const MEMORY_DECK: MemoryDeckEntry[] = [
  { pair: 'cat', color: '#E59B56', surface: '#FFF3E4' },
  { pair: 'dog', color: '#A97452', surface: '#F6ECE4' },
  { pair: 'rabbit', color: '#A6AEB2', surface: '#F1F3F3' },
  { pair: 'duck', color: '#E4B536', surface: '#FFF7D9' },
  { pair: 'elephant', color: '#89AAB9', surface: '#EAF3F5' },
  { pair: 'bear', color: '#9A6A4E', surface: '#F4EADF' },
  { pair: 'fox', color: '#DF7E36', surface: '#FFF0E3' },
  { pair: 'lion', color: '#D99A37', surface: '#FFF3D8' },
  { pair: 'turtle', color: '#6C9B68', surface: '#EAF3E8' },
  { pair: 'fish', color: '#E59B45', surface: '#FFF1DF' },
  { pair: 'owl', color: '#8B6549', surface: '#F4EADF' },
  { pair: 'butterfly', color: '#D56D83', surface: '#FBE9EE' },
  { pair: 'apple', color: '#DD615B', surface: '#FCEAE7' },
  { pair: 'car', color: '#5B9EB8', surface: '#E6F3F7' },
  { pair: 'banana', color: '#E2B93D', surface: '#FFF6D8' },
  { pair: 'strawberry', color: '#D95650', surface: '#FCE9E7' },
  { pair: 'flower', color: '#D97A92', surface: '#FBEAF0' },
  { pair: 'ball', color: '#719A84', surface: '#ECF3EE' },
  { pair: 'boat', color: '#648DA9', surface: '#EAF2F6' },
  { pair: 'airplane', color: '#588DB6', surface: '#E8F2F8' },
  { pair: 'train', color: '#D26057', surface: '#FBEAE7' },
  { pair: 'star', color: '#DDB33D', surface: '#FFF6D8' },
  { pair: 'kite', color: '#CB6670', surface: '#FAE9EC' },
  { pair: 'cupcake', color: '#CF7C8D', surface: '#FBEAF0' },
];

const illustrations: Record<MemorySubject, () => React.JSX.Element> = {
  ...AnimalIllustrations,
  ...ObjectIllustrations,
};

export function MemoryIllustration({ subject, size = 72 }: IllustrationProps) {
  const Illustration = illustrations[subject];

  return (
    <Svg
      accessibilityLabel={subject}
      focusable={false}
      height={size}
      viewBox="0 0 80 80"
      width={size}
    >
      <Illustration />
    </Svg>
  );
}