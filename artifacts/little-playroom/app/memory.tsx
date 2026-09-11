import React, { useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MEMORY_DECK,
  MemoryIllustration,
  type MemoryDeckEntry,
  type MemorySubject,
} from '@/components/MemoryIllustrations';
import { useColors } from '@/hooks/useColors';

type Card = {
  id: number;
  pair: MemorySubject;
  color: string;
  surface: string;
  flipped: boolean;
  matched: boolean;
};
type Round = {
  cards: Card[];
  pairs: MemorySubject[];
};

const PAIRS_PER_ROUND = 6;
const RECENT_ROUND_HISTORY = 3;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function choosePairs(previousRounds: MemorySubject[][]): MemoryDeckEntry[] {
  const recentPairs = new Set(previousRounds.flat());
  const freshEntries = shuffle(MEMORY_DECK).filter((entry) => !recentPairs.has(entry.pair));
  const fallbackEntries = shuffle(MEMORY_DECK).filter((entry) => recentPairs.has(entry.pair));

  return [...freshEntries, ...fallbackEntries].slice(0, PAIRS_PER_ROUND);
}

function createRound(previousRounds: MemorySubject[][] = []): Round {
  const selectedPairs = choosePairs(previousRounds);
  const cards = shuffle([...selectedPairs, ...selectedPairs]).map((card, index) => ({
    ...card,
    id: index,
    flipped: false,
    matched: false,
  }));

  return {
    cards,
    pairs: selectedPairs.map((entry) => entry.pair),
  };
}

function CardIllustration({ card }: { card: Card }) {
  return (
    <View style={[styles.artFrame, { backgroundColor: card.surface }]}>
      <MemoryIllustration subject={card.pair} size={68} />
    </View>
  );
}

export default function MemoryScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const roundHistory = useRef<MemorySubject[][]>([]);
  const [round, setRound] = useState<Round>(() => {
    const nextRound = createRound();
    roundHistory.current = [nextRound.pairs];
    return nextRound;
  });
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const cards = round.cards;

  const matches = useMemo(() => cards.filter((card) => card.matched).length / 2, [cards]);

  const flipCard = (id: number) => {
    if (flippedIds.length === 2) return;
    const card = cards.find((item) => item.id === id);
    if (!card || card.flipped || card.matched) return;
    void Haptics.selectionAsync();
    const nextFlipped = [...flippedIds, id];
    setFlippedIds(nextFlipped);
    setRound((previous) => ({
      ...previous,
      cards: previous.cards.map((item) => item.id === id ? { ...item, flipped: true } : item),
    }));
    if (nextFlipped.length === 2) {
      setMoves((value) => value + 1);
      const [firstId, secondId] = nextFlipped;
      const first = cards.find((item) => item.id === firstId);
      const second = cards.find((item) => item.id === secondId);
      if (first?.pair === second?.pair) {
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setRound((previous) => ({
          ...previous,
          cards: previous.cards.map((item) => nextFlipped.includes(item.id) ? { ...item, matched: true } : item),
        }));
        setFlippedIds([]);
      } else {
        setTimeout(() => {
          setRound((previous) => ({
            ...previous,
            cards: previous.cards.map((item) => nextFlipped.includes(item.id) ? { ...item, flipped: false } : item),
          }));
          setFlippedIds([]);
        }, 720);
      }
    }
  };

  const reset = () => {
    const nextRound = createRound(roundHistory.current.slice(-RECENT_ROUND_HISTORY));
    roundHistory.current = [...roundHistory.current, nextRound.pairs].slice(-RECENT_ROUND_HISTORY);
    setRound(nextRound);
    setFlippedIds([]);
    setMoves(0);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 56, paddingBottom: 10 }]}>
        <Pressable
          testID="memory-back"
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-back" size={24} color="#205D67" />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Find the pairs</Text>
        </View>
        <Pressable
          testID="memory-reset"
          accessibilityRole="button"
          accessibilityLabel="Start a new game"
          onPress={reset}
          style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}
        >
          <Ionicons name="refresh-outline" size={19} color="#7E8A92" />
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.matchesPill}>
          <Ionicons name="star" size={16} color={matches === 6 ? "#FFE471" : "#E5E0D8"} />
          <Text style={styles.statsValue}>{matches}<Text style={styles.statsTotal}>/6</Text></Text>
        </View>
        <View style={styles.movesPill}>
          <Ionicons name="footsteps" size={16} color="#E5E0D8" />
          <Text style={styles.movesText}>{moves}</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {cards.map((card) => {
          const faceUp = card.flipped || card.matched;
          return (
            <Pressable
              key={card.id}
              testID={`memory-card-${card.id}`}
              accessibilityRole="button"
              accessibilityLabel={faceUp ? `${card.pair} card` : 'Hidden memory card'}
              onPress={() => flipCard(card.id)}
              style={({ pressed }) => [
                styles.card,
                faceUp ? { backgroundColor: '#FFFFFF', borderColor: card.color } : styles.cardBack,
                card.matched && styles.cardMatched,
                pressed && styles.cardPressed,
              ]}
            >
              {faceUp ? (
                <CardIllustration card={card} />
              ) : (
                <View style={styles.cardBackArt}>
                  <View style={styles.cardBackCircleLarge} />
                  <View style={styles.cardBackCircleSmall} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {matches === 6 && (
        <View style={styles.winMessage}>
          <Ionicons name="trophy" size={22} color="#205D67" />
          <Text style={styles.winText}>All found!</Text>
          <Pressable testID="memory-play-again" onPress={reset} style={({ pressed }) => [styles.playAgainBtn, pressed && styles.pressed]}>
            <Ionicons name="refresh" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', paddingHorizontal: 18 },
  backButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderRadius: 20, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  pressed: { opacity: 0.65 },
  headerCopy: { flex: 1, marginLeft: 13 },
  title: { color: '#205D67', fontFamily: 'Inter_700Bold', fontSize: 20 },
  resetButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderRadius: 20, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  statsRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 16, paddingHorizontal: 24, paddingVertical: 16 },
  matchesPill: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderRadius: 17, borderWidth: 1, flexDirection: 'row', gap: 6, paddingHorizontal: 12, paddingVertical: 8 },
  statsValue: { color: '#205D67', fontFamily: 'Inter_700Bold', fontSize: 15 },
  statsTotal: { color: '#9AA29E', fontFamily: 'Inter_500Medium', fontSize: 13 },
  movesPill: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderRadius: 17, borderWidth: 1, flexDirection: 'row', gap: 6, paddingHorizontal: 12, paddingVertical: 8 },
  movesText: { color: '#7E8A92', fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  grid: { alignContent: 'flex-start', flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingHorizontal: 22, paddingTop: 52 },
  card: { alignItems: 'center', borderRadius: 20, borderWidth: 1.5, height: 108, justifyContent: 'center', width: '29%' },
  cardBack: { backgroundColor: '#53C7C1', borderColor: '#205D67' },
  cardMatched: { opacity: 0.55 },
  cardPressed: { transform: [{ scale: 0.95 }] },
  artFrame: { alignItems: 'center', borderRadius: 28, height: 74, justifyContent: 'center', overflow: 'hidden', width: 74 },
  cardBackArt: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 28, height: 62, justifyContent: 'center', overflow: 'hidden', position: 'relative', width: 62 },
  cardBackCircleLarge: { backgroundColor: '#205D67', borderRadius: 34, height: 68, left: -17, position: 'absolute', top: 25, width: 68 },
  cardBackCircleSmall: { backgroundColor: '#FFE471', borderRadius: 18, height: 36, position: 'absolute', right: -3, top: -3, width: 36 },
  winMessage: { alignItems: 'center', backgroundColor: '#FFE471', borderRadius: 18, flexDirection: 'row', gap: 10, margin: 20, paddingHorizontal: 16, paddingVertical: 12 },
  winText: { color: '#205D67', flex: 1, fontFamily: 'Inter_700Bold', fontSize: 15 },
  playAgainBtn: { alignItems: 'center', backgroundColor: '#FF6871', borderRadius: 16, height: 32, justifyContent: 'center', width: 32 },
});