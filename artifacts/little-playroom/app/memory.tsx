import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

type Card = {
  id: number;
  pair: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  surface: string;
  flipped: boolean;
  matched: boolean;
};
const CARD_PAIRS = [
  { pair: 'sun', icon: 'sunny-outline' as const, color: '#F0A83C', surface: '#FFF4D7' },
  { pair: 'leaf', icon: 'leaf-outline' as const, color: '#58B8A4', surface: '#E4F4EF' },
  { pair: 'star', icon: 'star-outline' as const, color: '#8F7BC7', surface: '#EFE9FA' },
  { pair: 'heart', icon: 'heart-outline' as const, color: '#E86A82', surface: '#FCE7ED' },
  { pair: 'cloud', icon: 'cloud-outline' as const, color: '#6DB7D8', surface: '#E5F3FA' },
  { pair: 'flower', icon: 'flower-outline' as const, color: '#F16E61', surface: '#FCE8E3' },
];

function shuffleCards(): Card[] {
  return [...CARD_PAIRS, ...CARD_PAIRS]
    .map((card, index) => ({ ...card, id: index, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
}

function CardIllustration({ card }: { card: Card }) {
  return (
    <View style={[styles.artFrame, { backgroundColor: card.surface }]}>
      <View style={[styles.artHalo, { borderColor: card.color }]} />
      <Ionicons name={card.icon} size={40} color={card.color} />
      <View style={[styles.artSpark, { backgroundColor: card.color }]} />
      <View style={[styles.artDot, { backgroundColor: card.color }]} />
    </View>
  );
}

export default function MemoryScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [cards, setCards] = useState<Card[]>(() => shuffleCards());
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const matches = useMemo(() => cards.filter((card) => card.matched).length / 2, [cards]);

  const flipCard = (id: number) => {
    if (flippedIds.length === 2) return;
    const card = cards.find((item) => item.id === id);
    if (!card || card.flipped || card.matched) return;
    void Haptics.selectionAsync();
    const nextFlipped = [...flippedIds, id];
    setFlippedIds(nextFlipped);
    setCards((previous) => previous.map((item) => item.id === id ? { ...item, flipped: true } : item));
    if (nextFlipped.length === 2) {
      setMoves((value) => value + 1);
      const [firstId, secondId] = nextFlipped;
      const first = cards.find((item) => item.id === firstId);
      const second = cards.find((item) => item.id === secondId);
      if (first?.pair === second?.pair) {
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setCards((previous) => previous.map((item) => nextFlipped.includes(item.id) ? { ...item, matched: true } : item));
        setFlippedIds([]);
      } else {
        setTimeout(() => {
          setCards((previous) => previous.map((item) => nextFlipped.includes(item.id) ? { ...item, flipped: false } : item));
          setFlippedIds([]);
        }, 720);
      }
    }
  };

  const reset = () => {
    setCards(shuffleCards());
    setFlippedIds([]);
    setMoves(0);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 28, paddingBottom: 10 }]}>
        <Pressable
          testID="memory-back"
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-back" size={24} color="#24313D" />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>FIND THE PAIRS</Text>
          <Text style={styles.title}>Remember where</Text>
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
        <View>
          <Text style={styles.statsLabel}>PAIRS FOUND</Text>
          <Text style={styles.statsValue}>{matches} <Text style={styles.statsTotal}>of 6</Text></Text>
        </View>
        <View style={styles.movesPill}>
          <Ionicons name="footsteps-outline" size={16} color="#7E8A92" />
          <Text style={styles.movesText}>{moves} {moves === 1 ? 'move' : 'moves'}</Text>
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
                  <Ionicons name="sparkles" size={19} color="#F0A83C" />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {matches === 6 && (
        <View style={styles.winMessage}>
          <Ionicons name="trophy-outline" size={20} color="#F0A83C" />
          <Text style={styles.winText}>You found them all!</Text>
          <Pressable testID="memory-play-again" onPress={reset}>
            <Text style={styles.playAgain}>Play again</Text>
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
  eyebrow: { color: '#B4A99C', fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.4, marginBottom: 3 },
  title: { color: '#24313D', fontFamily: 'Inter_700Bold', fontSize: 20 },
  resetButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderRadius: 20, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  statsRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
  statsLabel: { color: '#B4A99C', fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.2, marginBottom: 5 },
  statsValue: { color: '#24313D', fontFamily: 'Inter_700Bold', fontSize: 25 },
  statsTotal: { color: '#9AA29E', fontFamily: 'Inter_500Medium', fontSize: 13 },
  movesPill: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderRadius: 17, borderWidth: 1, flexDirection: 'row', gap: 6, paddingHorizontal: 11, paddingVertical: 9 },
  movesText: { color: '#7E8A92', fontFamily: 'Inter_500Medium', fontSize: 12 },
  grid: { alignContent: 'center', flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingHorizontal: 22 },
  card: { alignItems: 'center', borderRadius: 20, borderWidth: 1.5, height: 108, justifyContent: 'center', width: '29%' },
  cardBack: { backgroundColor: '#E4F2EF', borderColor: '#C7E3DC' },
  cardMatched: { opacity: 0.55 },
  cardPressed: { transform: [{ scale: 0.95 }] },
  artFrame: { alignItems: 'center', borderRadius: 28, height: 70, justifyContent: 'center', overflow: 'hidden', position: 'relative', width: 70 },
  artHalo: { borderRadius: 23, borderStyle: 'dashed', borderWidth: 1.5, height: 52, position: 'absolute', width: 52 },
  artSpark: { borderRadius: 3, height: 6, position: 'absolute', right: 12, top: 13, transform: [{ rotate: '45deg' }], width: 6 },
  artDot: { borderRadius: 4, bottom: 11, height: 7, left: 12, position: 'absolute', width: 7 },
  cardBackArt: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 28, height: 62, justifyContent: 'center', overflow: 'hidden', position: 'relative', width: 62 },
  cardBackCircleLarge: { backgroundColor: '#CDEAE5', borderRadius: 34, height: 68, left: -17, position: 'absolute', top: 25, width: 68 },
  cardBackCircleSmall: { backgroundColor: '#FFF0C6', borderRadius: 18, height: 36, position: 'absolute', right: -3, top: -3, width: 36 },
  winMessage: { alignItems: 'center', backgroundColor: '#FFF0C6', borderRadius: 18, flexDirection: 'row', gap: 8, margin: 20, paddingHorizontal: 16, paddingVertical: 13 },
  winText: { color: '#24313D', flex: 1, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  playAgain: { color: '#B56A16', fontFamily: 'Inter_700Bold', fontSize: 12 },
});