import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

type Feedback = 'idle' | 'correct' | 'tryAgain' | 'complete';
type SortBucket = 'first' | 'second';

type Picture = {
  id: string;
  word: string;
  emoji: string;
  color: string;
};

type Round =
  | {
      id: string;
      type: 'match';
      word: string;
      choices: Picture[];
    }
  | {
      id: string;
      type: 'sounds';
      firstSound: string;
      secondSound: string;
      items: Picture[];
    }
  | {
      id: string;
      type: 'build';
      word: string;
      letters: string[];
      emoji: string;
    };

const PICTURES = {
  cat: { id: 'cat', word: 'cat', emoji: '🐱', color: '#FFE471' },
  dog: { id: 'dog', word: 'dog', emoji: '🐶', color: '#F5CFA7' },
  sun: { id: 'sun', word: 'sun', emoji: '☀️', color: '#FFE471' },
  moon: { id: 'moon', word: 'moon', emoji: '🌙', color: '#B7DCE3' },
  fish: { id: 'fish', word: 'fish', emoji: '🐟', color: '#A9E1DC' },
  frog: { id: 'frog', word: 'frog', emoji: '🐸', color: '#B9DDA8' },
  map: { id: 'map', word: 'map', emoji: '🗺️', color: '#F5CFA7' },
  mouse: { id: 'mouse', word: 'mouse', emoji: '🐭', color: '#D8C9E8' },
  sock: { id: 'sock', word: 'sock', emoji: '🧦', color: '#F6B7B8' },
  star: { id: 'star', word: 'star', emoji: '⭐', color: '#FFE471' },
  tiger: { id: 'tiger', word: 'tiger', emoji: '🐯', color: '#F5CFA7' },
  tree: { id: 'tree', word: 'tree', emoji: '🌳', color: '#B9DDA8' },
} satisfies Record<string, Picture>;

const MATCH_ROUNDS: Round[] = [
  { id: 'match-cat', type: 'match', word: 'cat', choices: [PICTURES.sun, PICTURES.cat, PICTURES.fish] },
  { id: 'match-moon', type: 'match', word: 'moon', choices: [PICTURES.dog, PICTURES.moon, PICTURES.star] },
  { id: 'match-frog', type: 'match', word: 'frog', choices: [PICTURES.tree, PICTURES.frog, PICTURES.tiger] },
];

const SOUND_ROUNDS: Round[] = [
  {
    id: 'sounds-m-s',
    type: 'sounds',
    firstSound: 'M',
    secondSound: 'S',
    items: [PICTURES.sun, PICTURES.mouse, PICTURES.sock, PICTURES.moon],
  },
  {
    id: 'sounds-f-t',
    type: 'sounds',
    firstSound: 'F',
    secondSound: 'T',
    items: [PICTURES.tree, PICTURES.fish, PICTURES.tiger, PICTURES.frog],
  },
];

const BUILD_ROUNDS: Round[] = [
  { id: 'build-cat', type: 'build', word: 'CAT', letters: ['C', 'A', 'T'], emoji: PICTURES.cat.emoji },
  { id: 'build-sun', type: 'build', word: 'SUN', letters: ['S', 'U', 'N'], emoji: PICTURES.sun.emoji },
  { id: 'build-map', type: 'build', word: 'MAP', letters: ['M', 'A', 'P'], emoji: PICTURES.map.emoji },
  { id: 'build-dog', type: 'build', word: 'DOG', letters: ['D', 'O', 'G'], emoji: PICTURES.dog.emoji },
];

const COLORS = {
  ink: '#205D67',
  coral: '#FF6871',
  aqua: '#53C7C1',
  yellow: '#FFE471',
  line: '#E9DFD2',
  muted: '#7E8A92',
  backgroundCard: '#FFFFFF',
};

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function roundKey(round: Round) {
  return round.id;
}

function createRounds(previousKeys: string[] = []) {
  let nextRounds = shuffle([
    ...shuffle(MATCH_ROUNDS).slice(0, 2),
    ...shuffle(SOUND_ROUNDS).slice(0, 1),
    ...shuffle(BUILD_ROUNDS).slice(0, 2),
  ]);
  for (let attempt = 0; attempt < 6 && nextRounds.map(roundKey).join('|') === previousKeys.join('|'); attempt += 1) {
    nextRounds = shuffle([
      ...shuffle(MATCH_ROUNDS).slice(0, 2),
      ...shuffle(SOUND_ROUNDS).slice(0, 1),
      ...shuffle(BUILD_ROUNDS).slice(0, 2),
    ]);
  }
  return nextRounds;
}

function modeForRound(round: Round) {
  if (round.type === 'match') return { label: 'Find it', icon: 'images-outline' as const };
  if (round.type === 'sounds') return { label: 'First sound', icon: 'funnel-outline' as const };
  return { label: 'Build it', icon: 'text-outline' as const };
}

function promptForRound(round: Round) {
  if (round.type === 'match') return `Find ${round.word}`;
  if (round.type === 'sounds') return `Sort by the first sound: ${round.firstSound} or ${round.secondSound}`;
  return `Build ${round.word.toLowerCase()}`;
}

export default function ReadingScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const history = useRef<string[]>([]);
  const [rounds, setRounds] = useState<Round[]>(() => {
    const nextRounds = createRounds();
    history.current = nextRounds.map(roundKey);
    return nextRounds;
  });
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>('idle');
  const [selectedPicture, setSelectedPicture] = useState<string | null>(null);
  const [sorted, setSorted] = useState<Record<string, SortBucket>>({});
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);

  const round = rounds[roundIndex];
  const mode = modeForRound(round);
  const isComplete = feedback === 'complete';
  const availableLetters = useMemo(
    () => (round.type === 'build' ? round.letters.map((_, index) => index).filter((index) => !selectedLetters.includes(index)) : []),
    [round, selectedLetters],
  );

  useEffect(() => {
    if (feedback !== 'correct' && feedback !== 'tryAgain') return undefined;
    const timer = setTimeout(() => {
      if (feedback === 'correct') {
        setRoundIndex((current) => current + 1);
        setSelectedPicture(null);
        setSorted({});
        setSelectedLetters([]);
      }
      setFeedback('idle');
    }, feedback === 'correct' ? 780 : 1000);
    return () => clearTimeout(timer);
  }, [feedback]);

  useEffect(() => () => {
    Speech.stop();
  }, []);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'en-US', rate: 0.78, pitch: 1.08 });
  };

  const hearPrompt = () => {
    if (isComplete) return;
    if (round.type === 'match') speak(round.word);
    if (round.type === 'sounds') speak(`Sort the pictures by their first sound. Choose ${round.firstSound} or ${round.secondSound}.`);
    if (round.type === 'build') speak(`Build the word ${round.word.toLowerCase()}.`);
  };

  const finishRound = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setFeedback(roundIndex === rounds.length - 1 ? 'complete' : 'correct');
  };

  const answerMatch = (word: string) => {
    if (feedback !== 'idle' || round.type !== 'match') return;
    if (word === round.word) finishRound();
    else {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setFeedback('tryAgain');
    }
  };

  const choosePicture = (id: string) => {
    if (feedback !== 'idle' || round.type !== 'sounds' || sorted[id]) return;
    setSelectedPicture(id);
    void Haptics.selectionAsync();
  };

  const sortPicture = (bucket: SortBucket) => {
    if (feedback !== 'idle' || round.type !== 'sounds' || !selectedPicture) return;
    const picture = round.items.find((item) => item.id === selectedPicture);
    if (!picture) return;
    const expectedBucket = picture.word.toUpperCase().startsWith(round.firstSound) ? 'first' : 'second';
    if (bucket !== expectedBucket) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setFeedback('tryAgain');
      return;
    }
    const nextSorted = { ...sorted, [picture.id]: bucket };
    setSorted(nextSorted);
    setSelectedPicture(null);
    void Haptics.selectionAsync();
    if (Object.keys(nextSorted).length === round.items.length) finishRound();
  };

  const chooseLetter = (index: number) => {
    if (feedback !== 'idle' || round.type !== 'build') return;
    const expectedIndex = selectedLetters.length;
    if (index !== expectedIndex) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setSelectedLetters([]);
      setFeedback('tryAgain');
      return;
    }
    const nextLetters = [...selectedLetters, index];
    setSelectedLetters(nextLetters);
    void Haptics.selectionAsync();
    if (nextLetters.length === round.letters.length) finishRound();
  };

  const reset = () => {
    const nextRounds = createRounds(history.current);
    history.current = nextRounds.map(roundKey);
    setRounds(nextRounds);
    setRoundIndex(0);
    setFeedback('idle');
    setSelectedPicture(null);
    setSorted({});
    setSelectedLetters([]);
  };

  const feedbackText = isComplete
    ? 'You made a word path!'
    : feedback === 'correct'
      ? 'Nice listening!'
      : feedback === 'tryAgain'
        ? 'Try one more time'
        : promptForRound(round);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 56, paddingBottom: insets.bottom + 28 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            testID="reading-back"
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.ink} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Reading mix</Text>
            <Text style={styles.subtitle}>Listen, sort, and build</Text>
          </View>
          <Pressable
            testID="reading-reset"
            accessibilityRole="button"
            accessibilityLabel="Start Reading Mix again"
            onPress={reset}
            style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}
          >
            <Ionicons name="refresh-outline" size={19} color={COLORS.muted} />
          </Pressable>
        </View>

        <View style={styles.progressHeader}>
          <View style={styles.progressDots} accessibilityLabel={`Round ${roundIndex + 1} of ${rounds.length}`}>
            {rounds.map((item, index) => (
              <View key={item.id} style={[styles.progressDot, index < (isComplete ? rounds.length : roundIndex + 1) && styles.progressDotActive]} />
            ))}
          </View>
          <View style={styles.modePill}>
            <Ionicons name={mode.icon} size={16} color={COLORS.ink} />
            <Text style={styles.modeText}>{mode.label}</Text>
          </View>
        </View>

        <View style={styles.instructions}>
          <View style={styles.questionRow}>
            <Text style={styles.question}>{feedbackText}</Text>
            {!isComplete && feedback === 'idle' && (
              <Pressable
                testID="reading-hear-prompt"
                accessibilityRole="button"
                accessibilityLabel="Hear the word or instructions"
                onPress={hearPrompt}
                style={({ pressed }) => [styles.listenButton, pressed && styles.answerPressed]}
              >
                <Ionicons name="volume-high" size={22} color={COLORS.ink} />
              </Pressable>
            )}
          </View>
          {(isComplete || feedback === 'tryAgain') && (
            <Text style={styles.helper}>{isComplete ? 'Letters, sounds, and pictures all connect.' : 'Listen again and try.'}</Text>
          )}
        </View>

        {!isComplete && round.type === 'match' && (
          <View style={styles.matchChoices}>
            {round.choices.map((picture) => (
              <Pressable
                key={picture.id}
                testID={`reading-picture-${picture.id}`}
                accessibilityRole="button"
                accessibilityLabel={`Picture of a ${picture.word}`}
                disabled={feedback !== 'idle'}
                onPress={() => answerMatch(picture.word)}
                style={({ pressed }) => [styles.pictureCard, { backgroundColor: picture.color }, pressed && styles.picturePressed]}
              >
                <Text style={styles.pictureEmoji}>{picture.emoji}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {!isComplete && round.type === 'sounds' && (
          <>
            <View style={styles.soundItems}>
              {round.items.map((picture) => {
                const isSorted = Boolean(sorted[picture.id]);
                return (
                  <Pressable
                    key={picture.id}
                    testID={`reading-sort-picture-${picture.id}`}
                    accessibilityRole="button"
                    accessibilityLabel={`Choose the ${picture.word} picture`}
                    disabled={feedback !== 'idle' || isSorted}
                    onPress={() => choosePicture(picture.id)}
                    style={({ pressed }) => [
                      styles.sortPicture,
                      { backgroundColor: picture.color },
                      selectedPicture === picture.id && styles.selectedPicture,
                      isSorted && styles.sortedPicture,
                      pressed && styles.picturePressed,
                    ]}
                  >
                    <Text style={styles.sortEmoji}>{picture.emoji}</Text>
                    {isSorted && <Ionicons name="checkmark-circle" size={22} color="#4C9274" style={styles.sortedCheck} />}
                  </Pressable>
                );
              })}
            </View>
            <Text style={styles.sortHelper}>{selectedPicture ? 'Which basket does it belong in?' : 'Tap a picture to choose it.'}</Text>
            <View style={styles.baskets}>
              {[
                { bucket: 'first' as const, label: round.firstSound, color: COLORS.yellow },
                { bucket: 'second' as const, label: round.secondSound, color: COLORS.aqua },
              ].map((basket) => (
                <Pressable
                  key={basket.bucket}
                  testID={`reading-basket-${basket.label}`}
                  accessibilityRole="button"
                  accessibilityLabel={`Put picture in the ${basket.label} sound basket`}
                  disabled={feedback !== 'idle' || !selectedPicture}
                  onPress={() => sortPicture(basket.bucket)}
                  style={({ pressed }) => [styles.basket, { backgroundColor: basket.color }, pressed && styles.answerPressed]}
                >
                  <Text style={styles.basketLetter}>{basket.label}</Text>
                  <Ionicons name="arrow-down" size={21} color={COLORS.ink} />
                </Pressable>
              ))}
            </View>
          </>
        )}

        {!isComplete && round.type === 'build' && (
          <>
            <View style={styles.wordPicture}>
              <Text style={styles.wordEmoji}>{round.emoji}</Text>
            </View>
            <View style={styles.wordSlots} accessibilityLabel={`Word has ${round.letters.length} letters`}>
              {round.letters.map((letter, index) => (
                <View key={`${letter}-${index}`} style={[styles.wordSlot, selectedLetters.includes(index) && styles.wordSlotFilled]}>
                  {selectedLetters.includes(index) && <Text style={styles.slotLetter}>{letter}</Text>}
                </View>
              ))}
            </View>
            <View style={styles.letterChoices}>
              {availableLetters.map((index) => (
                <Pressable
                  key={`${round.id}-letter-${index}`}
                  testID={`reading-letter-${round.letters[index]}`}
                  accessibilityRole="button"
                  accessibilityLabel={`Letter ${round.letters[index]}`}
                  disabled={feedback !== 'idle'}
                  onPress={() => chooseLetter(index)}
                  style={({ pressed }) => [styles.letterButton, pressed && styles.answerPressed]}
                >
                  <Text style={styles.letterText}>{round.letters[index]}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {isComplete && (
          <>
            <View style={styles.completeDots}>
              <View style={[styles.completeDot, { backgroundColor: COLORS.coral }]} />
              <View style={[styles.completeDot, { backgroundColor: COLORS.yellow }]} />
              <View style={[styles.completeDot, { backgroundColor: COLORS.aqua }]} />
            </View>
            <Pressable
              testID="reading-play-again"
              accessibilityRole="button"
              accessibilityLabel="Play Reading Mix again"
              onPress={reset}
              style={({ pressed }) => [styles.playAgainBtn, pressed && styles.answerPressed]}
            >
              <Ionicons name="refresh" size={28} color="#B56A16" />
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scrollContent: { paddingHorizontal: 20 },
  header: { alignItems: 'center', flexDirection: 'row', paddingBottom: 10 },
  backButton: {
    alignItems: 'center',
    backgroundColor: COLORS.backgroundCard,
    borderColor: COLORS.line,
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  pressed: { opacity: 0.65 },
  headerCopy: { flex: 1, marginLeft: 13 },
  title: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 20 },
  subtitle: { color: COLORS.muted, fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 2 },
  resetButton: {
    alignItems: 'center',
    backgroundColor: COLORS.backgroundCard,
    borderColor: COLORS.line,
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  progressHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 },
  progressDots: { flexDirection: 'row', gap: 5 },
  progressDot: { backgroundColor: COLORS.line, borderRadius: 3, height: 6, width: 6 },
  progressDotActive: { backgroundColor: COLORS.yellow },
  modePill: { alignItems: 'center', backgroundColor: '#EEF6F3', borderRadius: 15, flexDirection: 'row', gap: 5, paddingHorizontal: 10, paddingVertical: 6 },
  modeText: { color: COLORS.ink, fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  instructions: { alignItems: 'center', marginTop: 32 },
  questionRow: { alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'center' },
  question: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 25, textAlign: 'center' },
  listenButton: { alignItems: 'center', backgroundColor: COLORS.yellow, borderRadius: 20, height: 40, justifyContent: 'center', width: 40 },
  helper: { color: COLORS.muted, fontFamily: 'Inter_400Regular', fontSize: 13, marginTop: 7, textAlign: 'center' },
  matchChoices: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 50 },
  pictureCard: { alignItems: 'center', borderColor: 'rgba(32,93,103,0.13)', borderRadius: 26, borderWidth: 2, height: 112, justifyContent: 'center', width: 104 },
  pictureEmoji: { fontSize: 52 },
  picturePressed: { opacity: 0.78, transform: [{ scale: 0.94 }] },
  soundItems: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 34 },
  sortPicture: { alignItems: 'center', borderColor: 'rgba(32,93,103,0.13)', borderRadius: 20, borderWidth: 2, height: 90, justifyContent: 'center', position: 'relative', width: 88 },
  selectedPicture: { borderColor: COLORS.ink, borderWidth: 4, transform: [{ scale: 1.04 }] },
  sortedPicture: { opacity: 0.44 },
  sortEmoji: { fontSize: 41 },
  sortedCheck: { bottom: 5, position: 'absolute', right: 5 },
  sortHelper: { color: COLORS.muted, fontFamily: 'Inter_400Regular', fontSize: 13, marginTop: 18, textAlign: 'center' },
  baskets: { flexDirection: 'row', gap: 16, justifyContent: 'center', marginTop: 14 },
  basket: { alignItems: 'center', borderRadius: 23, height: 92, justifyContent: 'center', width: 124 },
  basketLetter: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 30 },
  wordPicture: { alignItems: 'center', backgroundColor: '#EEF6F3', borderRadius: 34, height: 110, justifyContent: 'center', marginTop: 34, width: 110 },
  wordEmoji: { fontSize: 56 },
  wordSlots: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 30 },
  wordSlot: { alignItems: 'center', borderBottomColor: COLORS.ink, borderBottomWidth: 3, height: 52, justifyContent: 'center', width: 48 },
  wordSlotFilled: { backgroundColor: '#FFF7D2', borderRadius: 10, borderBottomWidth: 0 },
  slotLetter: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 30 },
  letterChoices: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 26 },
  letterButton: { alignItems: 'center', backgroundColor: COLORS.aqua, borderColor: COLORS.ink, borderRadius: 20, borderWidth: 1, height: 64, justifyContent: 'center', width: 64 },
  letterText: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 25 },
  answerPressed: { opacity: 0.75, transform: [{ scale: 0.97 }] },
  completeDots: { flexDirection: 'row', gap: 14, justifyContent: 'center', marginTop: 54 },
  completeDot: { borderRadius: 18, height: 36, width: 36 },
  playAgainBtn: { alignItems: 'center', alignSelf: 'center', backgroundColor: COLORS.yellow, borderRadius: 32, height: 64, justifyContent: 'center', marginTop: 26, width: 64 },
});