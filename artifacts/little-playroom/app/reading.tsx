import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAudioPlayer } from 'expo-audio';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { MemoryIllustration, type MemorySubject } from '@/components/MemoryIllustrations';

type Feedback = 'idle' | 'correct' | 'tryAgain' | 'complete';

type Picture = {
  id: string;
  word: string;
  subject: MemorySubject;
  color: string;
  surface: string;
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
      picture: Picture;
    };

const PICTURES: Record<string, Picture> = {
  cat: { id: 'cat', word: 'cat', subject: 'cat', color: '#E59B56', surface: '#FFF3E4' },
  dog: { id: 'dog', word: 'dog', subject: 'dog', color: '#A97452', surface: '#F6ECE4' },
  fish: { id: 'fish', word: 'fish', subject: 'fish', color: '#E59B45', surface: '#FFF1DF' },
  car: { id: 'car', word: 'car', subject: 'car', color: '#5B9EB8', surface: '#E6F3F7' },
  duck: { id: 'duck', word: 'duck', subject: 'duck', color: '#E4B536', surface: '#FFF7D9' },
  ball: { id: 'ball', word: 'ball', subject: 'ball', color: '#719A84', surface: '#ECF3EE' },
  boat: { id: 'boat', word: 'boat', subject: 'boat', color: '#648DA9', surface: '#EAF2F6' },
  fox: { id: 'fox', word: 'fox', subject: 'fox', color: '#DF7E36', surface: '#FFF0E3' },
};

const MATCH_ROUNDS: Round[] = [
  { id: 'match-cat', type: 'match', word: 'cat', choices: [PICTURES.dog, PICTURES.cat, PICTURES.fish] },
  { id: 'match-dog', type: 'match', word: 'dog', choices: [PICTURES.cat, PICTURES.dog, PICTURES.fox] },
  { id: 'match-fish', type: 'match', word: 'fish', choices: [PICTURES.ball, PICTURES.fish, PICTURES.boat] },
];

const SOUND_ROUNDS: Round[] = [
  {
    id: 'sounds-c-d',
    type: 'sounds',
    firstSound: 'C',
    secondSound: 'D',
    items: [PICTURES.cat, PICTURES.dog, PICTURES.car, PICTURES.duck],
  },
  {
    id: 'sounds-b-f',
    type: 'sounds',
    firstSound: 'B',
    secondSound: 'F',
    items: [PICTURES.ball, PICTURES.fish, PICTURES.boat, PICTURES.fox],
  },
];

const BUILD_ROUNDS: Round[] = [
  { id: 'build-cat', type: 'build', word: 'CAT', letters: ['T', 'C', 'A'], picture: PICTURES.cat },
  { id: 'build-dog', type: 'build', word: 'DOG', letters: ['G', 'D', 'O'], picture: PICTURES.dog },
  { id: 'build-fox', type: 'build', word: 'FOX', letters: ['X', 'O', 'F'], picture: PICTURES.fox },
  { id: 'build-car', type: 'build', word: 'CAR', letters: ['R', 'C', 'A'], picture: PICTURES.car },
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

const READING_PROMPTS = {
  match: {
    cat: require('../assets/audio/reading-match-cat.mp3'),
    dog: require('../assets/audio/reading-match-dog.mp3'),
    fish: require('../assets/audio/reading-match-fish.mp3'),
  },
  soundsCD: {
    cat: require('../assets/audio/reading-sound-cat-c-d.mp3'),
    dog: require('../assets/audio/reading-sound-dog-c-d.mp3'),
    car: require('../assets/audio/reading-sound-car-c-d.mp3'),
    duck: require('../assets/audio/reading-sound-duck-c-d.mp3'),
  },
  soundsBF: {
    ball: require('../assets/audio/reading-sound-ball-b-f.mp3'),
    fish: require('../assets/audio/reading-sound-fish-b-f.mp3'),
    boat: require('../assets/audio/reading-sound-boat-b-f.mp3'),
    fox: require('../assets/audio/reading-sound-fox-b-f.mp3'),
  },
  buildCat: require('../assets/audio/reading-build-cat_2.mp3'),
  buildDog: require('../assets/audio/reading-build-dog_2.mp3'),
  buildFox: require('../assets/audio/reading-build-fox_2.mp3'),
  buildCar: require('../assets/audio/reading-build-car_2.mp3'),
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

function prepareRound(round: Round): Round {
  if (round.type === 'match') {
    return { ...round, choices: shuffle(round.choices) };
  }
  if (round.type === 'sounds') {
    return { ...round, items: shuffle(round.items) };
  }
  return { ...round, letters: shuffle(round.word.split('')) };
}

function createRounds(previousKeys: string[] = []) {
  let nextRounds = shuffle([
    ...shuffle(MATCH_ROUNDS).slice(0, 2),
    ...shuffle(SOUND_ROUNDS).slice(0, 1),
    ...shuffle(BUILD_ROUNDS).slice(0, 2),
  ]).map(prepareRound);
  for (let attempt = 0; attempt < 6 && nextRounds.map(roundKey).join('|') === previousKeys.join('|'); attempt += 1) {
    nextRounds = shuffle([
      ...shuffle(MATCH_ROUNDS).slice(0, 2),
      ...shuffle(SOUND_ROUNDS).slice(0, 1),
      ...shuffle(BUILD_ROUNDS).slice(0, 2),
    ]).map(prepareRound);
  }
  return nextRounds;
}

function promptForRound(round: Round) {
  if (round.type === 'match') return 'Tap the picture you hear';
  if (round.type === 'sounds') return 'Tap the first sound';
  return 'Tap the letters in order';
}

function promptSourceForRound(round: Round, soundItemIndex: number) {
  if (round.type === 'match') {
    return READING_PROMPTS.match[round.word as keyof typeof READING_PROMPTS.match];
  }
  if (round.type === 'sounds') {
    const word = round.items[soundItemIndex].word;
    if (round.firstSound === 'C') {
      return READING_PROMPTS.soundsCD[word as keyof typeof READING_PROMPTS.soundsCD];
    }
    return READING_PROMPTS.soundsBF[word as keyof typeof READING_PROMPTS.soundsBF];
  }
  if (round.word === 'CAT') return READING_PROMPTS.buildCat;
  if (round.word === 'DOG') return READING_PROMPTS.buildDog;
  if (round.word === 'FOX') return READING_PROMPTS.buildFox;
  return READING_PROMPTS.buildCar;
}

export default function ReadingScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const history = useRef<string[]>([]);
  const autoPromptTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [rounds, setRounds] = useState<Round[]>(() => {
    const nextRounds = createRounds();
    history.current = nextRounds.map(roundKey);
    return nextRounds;
  });
  const [roundIndex, setRoundIndex] = useState(0);
  const [soundItemIndex, setSoundItemIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>('idle');
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);

  const promptPlayer = useAudioPlayer(READING_PROMPTS.match.cat);

  const round = rounds[roundIndex];
  const isComplete = feedback === 'complete';

  useEffect(() => {
    if (feedback !== 'correct' && feedback !== 'tryAgain') return undefined;
    const timer = setTimeout(() => {
      if (feedback === 'correct') {
        if (round.type === 'sounds' && soundItemIndex < round.items.length - 1) {
          setSoundItemIndex((current) => current + 1);
        } else {
          setRoundIndex((current) => current + 1);
          setSoundItemIndex(0);
          setSelectedLetters([]);
        }
      }
      setFeedback('idle');
    }, feedback === 'correct' ? 780 : 1000);
    return () => clearTimeout(timer);
  }, [feedback, round, soundItemIndex]);

  const playPrompt = () => {
    if (isComplete) return;
    if (autoPromptTimer.current) {
      clearTimeout(autoPromptTimer.current);
      autoPromptTimer.current = null;
    }
    const source = promptSourceForRound(round, soundItemIndex);
    promptPlayer.replace(source);
    void promptPlayer.seekTo(0);
    promptPlayer.play();
  };

  useEffect(() => {
    if (isComplete) return undefined;
    autoPromptTimer.current = setTimeout(() => {
      const source = promptSourceForRound(round, soundItemIndex);
      promptPlayer.replace(source);
      void promptPlayer.seekTo(0);
      promptPlayer.play();
      autoPromptTimer.current = null;
    }, 1000);
    return () => {
      if (autoPromptTimer.current) {
        clearTimeout(autoPromptTimer.current);
        autoPromptTimer.current = null;
      }
    };
  }, [isComplete, promptPlayer, round, rounds, soundItemIndex]);

  const answerMatch = (word: string) => {
    if (feedback !== 'idle' || round.type !== 'match') return;
    if (word === round.word) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setFeedback(roundIndex === rounds.length - 1 ? 'complete' : 'correct');
    } else {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setFeedback('tryAgain');
    }
  };

  const answerSound = (letter: string) => {
    if (feedback !== 'idle' || round.type !== 'sounds') return;
    const picture = round.items[soundItemIndex];
    if (picture.word.toUpperCase().startsWith(letter)) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (soundItemIndex === round.items.length - 1 && roundIndex === rounds.length - 1) {
        setFeedback('complete');
      } else {
        setFeedback('correct');
      }
    } else {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setFeedback('tryAgain');
    }
  };

  const chooseLetter = (index: number) => {
    if (feedback !== 'idle' || round.type !== 'build') return;
    const expectedLetter = round.word[selectedLetters.length];

    if (round.letters[index] !== expectedLetter) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setFeedback('tryAgain');
      return;
    }

    const nextLetters = [...selectedLetters, index];
    setSelectedLetters(nextLetters);
    void Haptics.selectionAsync();

    if (nextLetters.length === round.word.length) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setFeedback(roundIndex === rounds.length - 1 ? 'complete' : 'correct');
    }
  };

  const reset = () => {
    const nextRounds = createRounds(history.current);
    history.current = nextRounds.map(roundKey);
    setRounds(nextRounds);
    setRoundIndex(0);
    setFeedback('idle');
    setSoundItemIndex(0);
    setSelectedLetters([]);
  };

  const feedbackText = isComplete
    ? 'You did all the reading!'
    : feedback === 'correct'
      ? 'Nice reading!'
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
        </View>

        <View style={styles.instructions}>
          <View style={styles.questionRow}>
            <Text style={styles.question}>{feedbackText}</Text>
            {!isComplete && feedback === 'idle' && (
              <Pressable
                testID="reading-hear-prompt"
                accessibilityRole="button"
                accessibilityLabel="Hear the instructions"
                onPress={playPrompt}
                style={({ pressed }) => [styles.listenButton, pressed && styles.answerPressed]}
              >
                <Ionicons name="volume-high" size={22} color={COLORS.ink} />
              </Pressable>
            )}
          </View>
          {(isComplete || feedback === 'tryAgain') && (
            <Text style={styles.helper}>{isComplete ? 'You listened, found sounds, and built words.' : 'Listen again and try.'}</Text>
          )}
        </View>

        {!isComplete && round.type === 'match' && (
          <View style={styles.matchChoices}>
            {round.choices.map((picture, index) => (
              <Pressable
                key={`${picture.id}-${index}`}
                testID={`reading-picture-${picture.id}`}
                accessibilityRole="button"
                accessibilityLabel={`Picture of a ${picture.word}`}
                disabled={feedback !== 'idle'}
                onPress={() => answerMatch(picture.word)}
                style={({ pressed }) => [styles.pictureCard, { backgroundColor: picture.surface, borderColor: picture.color }, pressed && styles.picturePressed]}
              >
                <MemoryIllustration subject={picture.subject} size={64} />
              </Pressable>
            ))}
          </View>
        )}

        {!isComplete && round.type === 'sounds' && (
          <View style={styles.soundsArea}>
            <View
              accessibilityLabel={`Picture of a ${round.items[soundItemIndex].word}`}
              style={[styles.largePictureCard, { backgroundColor: round.items[soundItemIndex].surface, borderColor: round.items[soundItemIndex].color }]}
            >
              <MemoryIllustration subject={round.items[soundItemIndex].subject} size={84} />
            </View>
            <View style={styles.soundProgress} accessibilityLabel={`Picture ${soundItemIndex + 1} of ${round.items.length}`}>
              {round.items.map((item, index) => (
                <View key={item.id} style={[styles.soundProgressDot, index <= soundItemIndex && styles.soundProgressDotActive]} />
              ))}
            </View>
            <View style={styles.soundChoices}>
              {[round.firstSound, round.secondSound].map((letter) => (
                <Pressable
                  key={letter}
                  testID={`reading-sound-${letter}`}
                  accessibilityRole="button"
                  accessibilityLabel={`Letter ${letter}`}
                  disabled={feedback !== 'idle'}
                  onPress={() => answerSound(letter)}
                  style={({ pressed }) => [styles.soundButton, pressed && styles.answerPressed]}
                >
                  <Text style={styles.soundButtonText}>{letter}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {!isComplete && round.type === 'build' && (
          <>
            <View style={styles.buildArea}>
              <View style={[styles.wordPicture, { backgroundColor: round.picture.surface, borderColor: round.picture.color }]}>
                <MemoryIllustration subject={round.picture.subject} size={70} />
              </View>
            </View>
            <View style={styles.wordSlots} accessibilityLabel={`Word has ${round.word.length} letters`}>
              {Array.from({ length: round.word.length }).map((_, position) => {
                const selectedIndex = selectedLetters[position];
                return (
                  <View key={`${round.id}-slot-${position}`} style={[styles.wordSlot, selectedIndex !== undefined && styles.wordSlotFilled]}>
                    {selectedIndex !== undefined && <Text style={styles.slotLetter}>{round.letters[selectedIndex]}</Text>}
                  </View>
                );
              })}
            </View>
            <View style={styles.letterChoices}>
              {round.letters.map((letter, index) => {
                const isUsed = selectedLetters.includes(index);
                return (
                  <Pressable
                    key={`${round.id}-letter-${index}`}
                    testID={`reading-letter-${letter}`}
                    accessibilityRole="button"
                    accessibilityLabel={`Letter ${letter}`}
                    disabled={feedback !== 'idle' || isUsed}
                    onPress={() => chooseLetter(index)}
                    style={({ pressed }) => [
                      styles.letterButton,
                      isUsed && styles.letterButtonUsed,
                      pressed && !isUsed && styles.answerPressed,
                    ]}
                  >
                    <Text style={[styles.letterText, isUsed && styles.letterTextUsed]}>{letter}</Text>
                  </Pressable>
                );
              })}
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
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  resetButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.line,
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  progressHeader: { alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  progressDots: { flexDirection: 'row', gap: 5 },
  progressDot: { backgroundColor: COLORS.line, borderRadius: 3, height: 6, width: 6 },
  progressDotActive: { backgroundColor: COLORS.yellow },
  instructions: { alignItems: 'center', marginTop: 32, minHeight: 70 },
  questionRow: { alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'center' },
  question: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 25, textAlign: 'center' },
  listenButton: { alignItems: 'center', backgroundColor: COLORS.yellow, borderRadius: 20, height: 40, justifyContent: 'center', width: 40 },
  helper: { color: COLORS.muted, fontFamily: 'Inter_400Regular', fontSize: 14, marginTop: 7, textAlign: 'center' },
  matchChoices: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 50 },
  pictureCard: { alignItems: 'center', borderRadius: 26, borderWidth: 3, height: 112, justifyContent: 'center', width: 96 },
  picturePressed: { opacity: 0.78, transform: [{ scale: 0.94 }] },
  soundsArea: { alignItems: 'center', marginTop: 40 },
  largePictureCard: { alignItems: 'center', borderRadius: 34, borderWidth: 4, height: 160, justifyContent: 'center', width: 160 },
  soundProgress: { flexDirection: 'row', gap: 6, marginTop: 18 },
  soundProgressDot: { backgroundColor: COLORS.line, borderRadius: 4, height: 7, width: 16 },
  soundProgressDotActive: { backgroundColor: COLORS.coral },
  soundChoices: { flexDirection: 'row', gap: 24, justifyContent: 'center', marginTop: 24 },
  soundButton: { alignItems: 'center', backgroundColor: '#53C7C1', borderColor: '#205D67', borderRadius: 24, borderWidth: 2, height: 80, justifyContent: 'center', width: 100 },
  soundButtonText: { color: '#205D67', fontFamily: 'Inter_700Bold', fontSize: 36 },
  buildArea: { alignItems: 'center', marginTop: 30 },
  wordPicture: { alignItems: 'center', borderRadius: 32, borderWidth: 3, height: 130, justifyContent: 'center', width: 130 },
  wordSlots: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 30 },
  wordSlot: { alignItems: 'center', borderBottomColor: COLORS.line, borderBottomWidth: 4, height: 56, justifyContent: 'center', width: 50 },
  wordSlotFilled: { backgroundColor: '#FFF7D2', borderRadius: 12, borderBottomWidth: 0 },
  slotLetter: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 32 },
  letterChoices: { flexDirection: 'row', gap: 16, justifyContent: 'center', marginTop: 36 },
  letterButton: { alignItems: 'center', backgroundColor: '#53C7C1', borderColor: '#205D67', borderRadius: 20, borderWidth: 2, height: 68, justifyContent: 'center', width: 68 },
  letterButtonUsed: { backgroundColor: '#E9DFD2', borderColor: 'transparent', opacity: 0.5 },
  letterText: { color: '#205D67', fontFamily: 'Inter_700Bold', fontSize: 30 },
  letterTextUsed: { color: '#7E8A92' },
  answerPressed: { opacity: 0.75, transform: [{ scale: 0.97 }] },
  completeDots: { flexDirection: 'row', gap: 14, justifyContent: 'center', marginTop: 54 },
  completeDot: { borderRadius: 18, height: 36, width: 36 },
  playAgainBtn: { alignItems: 'center', alignSelf: 'center', backgroundColor: COLORS.yellow, borderRadius: 32, height: 64, justifyContent: 'center', marginTop: 26, width: 64 },
});
