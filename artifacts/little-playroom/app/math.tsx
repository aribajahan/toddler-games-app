import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAudioPlayer } from 'expo-audio';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

type ComparePrompt = 'more' | 'less' | 'same';
type ArithmeticOperator = '+' | '-' | '×';
type Round =
  | { type: 'compare'; prompt: ComparePrompt; left: number; right: number }
  | { type: 'fill'; target: number }
  | { type: 'arithmetic'; first: number; second: number; operator: ArithmeticOperator };
type Feedback = 'idle' | 'correct' | 'tryAgain' | 'complete';
type CompareAnswer = 'left' | 'right' | 'yes' | 'no';

const COMPARE_ROUNDS: Round[] = [
  { type: 'compare', prompt: 'more', left: 1, right: 3 },
  { type: 'compare', prompt: 'more', left: 2, right: 5 },
  { type: 'compare', prompt: 'more', left: 4, right: 2 },
  { type: 'compare', prompt: 'same', left: 3, right: 3 },
  { type: 'compare', prompt: 'same', left: 4, right: 4 },
  { type: 'compare', prompt: 'less', left: 2, right: 5 },
];

const FILL_ROUNDS: Round[] = [
  { type: 'fill', target: 3 },
  { type: 'fill', target: 5 },
  { type: 'fill', target: 7 },
];

const ARITHMETIC_ROUNDS: Round[] = [
  { type: 'arithmetic', first: 1, second: 1, operator: '+' },
  { type: 'arithmetic', first: 3, second: 1, operator: '-' },
  { type: 'arithmetic', first: 2, second: 2, operator: '×' },
];

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function roundKey(round: Round): string {
  if (round.type === 'compare') return `compare:${round.prompt}:${round.left}:${round.right}`;
  if (round.type === 'fill') return `fill:${round.target}`;
  return `arithmetic:${round.first}:${round.operator}:${round.second}`;
}

function createRounds(previousKeys: string[] = []): Round[] {
  let nextRounds: Round[] = [];
  let nextKeys = '';

  for (let attempt = 0; attempt < 8; attempt += 1) {
    nextRounds = shuffle([
      ...shuffle(COMPARE_ROUNDS).slice(0, 3),
      ...shuffle(FILL_ROUNDS),
      ...shuffle(ARITHMETIC_ROUNDS),
    ]);
    nextKeys = nextRounds.map(roundKey).join('|');
    if (nextKeys !== previousKeys.join('|')) break;
  }

  return nextRounds;
}

const MATH_PROMPTS = {
  more: require('../assets/audio/math-more.mp3'),
  same: require('../assets/audio/math-same.mp3'),
  less: require('../assets/audio/math-less.mp3'),
  3: require('../assets/audio/math-make-three.mp3'),
  5: require('../assets/audio/math-make-five.mp3'),
  7: require('../assets/audio/math-make-seven.mp3'),
  add11: require('../assets/audio/math-one-plus-one.mp3'),
  subtract31: require('../assets/audio/math-three-minus-one.mp3'),
  multiply22: require('../assets/audio/math-two-times-two.mp3'),
};

const COLORS = {
  coral: '#FF6871',
  blue: '#53C7C1',
  yellow: '#FFE471',
  purple: '#205D67',
  ink: '#205D67',
  muted: '#7E8A92',
  line: '#E9DFD2',
};

function DotGroup({ count, color, compact = false }: { count: number; color: string; compact?: boolean }) {
  return (
    <View style={[styles.dotGroup, compact && styles.dotGroupCompact]} accessibilityLabel={`${count} shapes`}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={[compact ? styles.dotCompact : styles.dot, { backgroundColor: color }]} />
      ))}
    </View>
  );
}

function getCompareQuestion(prompt: ComparePrompt) {
  if (prompt === 'more') return 'Which group has more?';
  if (prompt === 'less') return 'Which group has less?';
  return 'Are the groups the same?';
}

function getCompareAnswerLabel(answer: CompareAnswer) {
  if (answer === 'left') return 'Left group';
  if (answer === 'right') return 'Right group';
  if (answer === 'yes') return 'Yes, same';
  return 'No, different';
}

function getArithmeticChoices(answer: number, roundIndex: number) {
  const choices = [Math.max(1, answer - 1), answer, answer + 1];
  const offset = roundIndex % choices.length;
  return choices.slice(offset).concat(choices.slice(0, offset));
}

function solveArithmetic(first: number, second: number, operator: ArithmeticOperator) {
  if (operator === '+') return first + second;
  if (operator === '-') return first - second;
  return first * second;
}

export default function MathScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const roundHistory = useRef<string[]>([]);
  const [rounds, setRounds] = useState<Round[]>(() => {
    const nextRounds = createRounds();
    roundHistory.current = nextRounds.map(roundKey);
    return nextRounds;
  });
  const [roundIndex, setRoundIndex] = useState(0);
  const [fillCount, setFillCount] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>('idle');
  const promptPlayer = useAudioPlayer(MATH_PROMPTS.more);

  const round = rounds[roundIndex];
  const roundNumber = roundIndex + 1;
  const isComplete = feedback === 'complete';

  const playPrompt = () => {
    if (isComplete) return;
    const source =
      round.type === 'compare'
        ? MATH_PROMPTS[round.prompt]
        : round.type === 'fill'
          ? MATH_PROMPTS[round.target as 3 | 5 | 7]
          : round.operator === '+'
            ? MATH_PROMPTS.add11
            : round.operator === '-'
              ? MATH_PROMPTS.subtract31
              : MATH_PROMPTS.multiply22;
    promptPlayer.replace(source);
    void promptPlayer.seekTo(0);
    promptPlayer.play();
  };

  useEffect(() => {
    if (feedback !== 'correct' && feedback !== 'tryAgain') return undefined;

    const timer = setTimeout(() => {
      if (feedback === 'correct') {
        setRoundIndex((current) => current + 1);
        setFillCount(0);
      }
      setFeedback('idle');
    }, feedback === 'correct' ? 760 : 1050);

    return () => clearTimeout(timer);
  }, [feedback]);

  const finishRound = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setFeedback(roundIndex === rounds.length - 1 ? 'complete' : 'correct');
  };

  const answerCompare = (answer: CompareAnswer) => {
    if (feedback !== 'idle' || round.type !== 'compare') return;

    const expected: CompareAnswer =
      round.prompt === 'same'
        ? round.left === round.right
          ? 'yes'
          : 'no'
        : round.prompt === 'more'
          ? round.left > round.right
            ? 'left'
            : 'right'
          : round.left < round.right
            ? 'left'
            : 'right';

    if (answer === expected) {
      finishRound();
    } else {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setFeedback('tryAgain');
    }
  };

  const addOne = () => {
    if (feedback !== 'idle' || round.type !== 'fill' || fillCount >= round.target) return;

    const nextCount = fillCount + 1;
    setFillCount(nextCount);
    void Haptics.selectionAsync();
    if (nextCount === round.target) finishRound();
  };

  const answerArithmetic = (answer: number) => {
    if (feedback !== 'idle' || round.type !== 'arithmetic') return;
    if (answer === solveArithmetic(round.first, round.second, round.operator)) {
      finishRound();
    } else {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setFeedback('tryAgain');
    }
  };

  const reset = () => {
    const nextRounds = createRounds(roundHistory.current);
    roundHistory.current = nextRounds.map(roundKey);
    setRounds(nextRounds);
    setRoundIndex(0);
    setFillCount(0);
    setFeedback('idle');
  };

  const feedbackText = isComplete
    ? 'You did all the math!'
    : feedback === 'correct'
      ? 'Nice thinking!'
      : feedback === 'tryAgain'
        ? 'Take another look'
        : round.type === 'fill'
          ? `Make ${round.target}`
          : round.type === 'arithmetic'
            ? `What is ${round.first} ${round.operator} ${round.second}?`
            : getCompareQuestion(round.prompt);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 56, paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            testID="math-back"
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.ink} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Math mix</Text>
          </View>
          <Pressable
            testID="math-reset"
            accessibilityRole="button"
            accessibilityLabel="Start Math Mix again"
            onPress={reset}
            style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}
          >
            <Ionicons name="refresh-outline" size={19} color={COLORS.muted} />
          </Pressable>
        </View>

        <View style={styles.progressHeader}>
            <View style={styles.progressDots} accessibilityLabel={`Round ${roundNumber} of ${rounds.length}`}>
            {rounds.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index < (isComplete ? rounds.length : roundNumber) && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.instructions}>
          <View style={styles.questionRow}>
            <Text style={[styles.question, round.type === 'arithmetic' && feedback === 'idle' && styles.additionQuestion]}>
              {feedbackText}
            </Text>
            {!isComplete && feedback === 'idle' && (
              <Pressable
                testID="math-hear-prompt"
                accessibilityRole="button"
                accessibilityLabel="Hear the question"
                onPress={playPrompt}
                style={({ pressed }) => [styles.listenButton, pressed && styles.answerPressed]}
              >
                <Ionicons name="volume-high" size={22} color={COLORS.ink} />
              </Pressable>
            )}
          </View>
          {(isComplete || feedback === 'tryAgain') && (
            <Text style={styles.helper}>
              {isComplete ? 'You counted, compared, and solved.' : 'Try once more.'}
            </Text>
          )}
        </View>

        {!isComplete && round.type === 'compare' && (
          <View style={styles.problemArea}>
            <View style={styles.compareGroups}>
              <Pressable
                testID="math-answer-left"
                accessibilityRole="button"
                accessibilityLabel="Choose the red group"
                disabled={feedback !== 'idle' || round.prompt === 'same'}
                onPress={() => answerCompare('left')}
                style={({ pressed }) => [
                  styles.group,
                  round.prompt !== 'same' && styles.tappableGroup,
                  pressed && styles.groupPressed,
                ]}
              >
                <DotGroup count={round.left} color={COLORS.coral} />
              </Pressable>
              <Pressable
                testID="math-answer-right"
                accessibilityRole="button"
                accessibilityLabel="Choose the blue group"
                disabled={feedback !== 'idle' || round.prompt === 'same'}
                onPress={() => answerCompare('right')}
                style={({ pressed }) => [
                  styles.group,
                  round.prompt !== 'same' && styles.tappableGroup,
                  pressed && styles.groupPressed,
                ]}
              >
                <DotGroup count={round.right} color={COLORS.blue} />
              </Pressable>
            </View>
          </View>
        )}

        {!isComplete && round.type === 'fill' && (
          <View style={styles.problemArea}>
            <View style={styles.fillRow}>
              {Array.from({ length: round.target }).map((_, index) => {
                const isFilled = index < fillCount;
                return (
                  <Pressable
                    key={index}
                    testID={index === fillCount ? "math-add-one" : `math-slot-${index}`}
                    accessibilityRole="button"
                    accessibilityLabel={isFilled ? "Filled shape" : "Empty shape, tap to fill"}
                    disabled={feedback !== 'idle' || isFilled}
                    onPress={addOne}
                    style={({ pressed }) => [
                      styles.fillSlot,
                      isFilled && styles.fillSlotFilled,
                      pressed && !isFilled && styles.slotPressed,
                    ]}
                  >
                    {!isFilled && index === fillCount && (
                      <Ionicons name="add" size={20} color="#CFC5B8" />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {!isComplete && round.type === 'arithmetic' && (
          <View style={styles.problemArea}>
            <View style={styles.additionHint} accessibilityLabel="Picture hint">
              <DotGroup count={round.first} color={COLORS.yellow} compact />
              <Text style={styles.additionHintSign}>{round.operator}</Text>
              <DotGroup count={round.second} color={COLORS.blue} compact />
            </View>
          </View>
        )}

        {!isComplete && round.type === 'compare' && round.prompt === 'same' && (
          <View style={styles.symbolChoices}>
            {(['yes', 'no'] as CompareAnswer[]).map((answer) => (
              <Pressable
                key={answer}
                testID={`math-answer-${answer}`}
                accessibilityRole="button"
                accessibilityLabel={getCompareAnswerLabel(answer)}
                disabled={feedback !== 'idle'}
                onPress={() => answerCompare(answer)}
                style={({ pressed }) => [
                  styles.symbolButton,
                  answer === 'yes' ? styles.yesButton : styles.noButton,
                  pressed && styles.answerPressed,
                ]}
              >
                <Ionicons
                  name={answer === 'yes' ? 'checkmark' : 'close'}
                  size={38}
                  color={answer === 'yes' ? '#4C9274' : '#A66B66'}
                />
              </Pressable>
            ))}
          </View>
        )}

        {!isComplete && round.type === 'arithmetic' && (
          <View style={styles.answerChoices}>
            {getArithmeticChoices(solveArithmetic(round.first, round.second, round.operator), roundIndex).map((answer) => (
              <Pressable
                key={answer}
                testID={`math-answer-${answer}`}
                accessibilityRole="button"
                accessibilityLabel={`Answer ${answer}`}
                disabled={feedback !== 'idle'}
                onPress={() => answerArithmetic(answer)}
                style={({ pressed }) => [styles.numberButton, pressed && styles.answerPressed]}
              >
                <Text style={styles.numberText}>{answer}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {isComplete && (
          <>
            <View style={styles.completeDots}>
              <View style={[styles.completeDot, { backgroundColor: COLORS.coral }]} />
              <View style={[styles.completeDot, { backgroundColor: COLORS.yellow }]} />
              <View style={[styles.completeDot, { backgroundColor: COLORS.blue }]} />
            </View>
            <Pressable
              testID="math-play-again"
              accessibilityRole="button"
              accessibilityLabel="Play Math Mix again"
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
  progressHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  progressDots: { flexDirection: 'row', gap: 5 },
  progressDot: { backgroundColor: COLORS.line, borderRadius: 3, height: 6, width: 6 },
  progressDotActive: { backgroundColor: COLORS.yellow },
  instructions: { alignItems: 'center', marginTop: 38 },
  questionRow: { alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'center' },
  question: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 26, textAlign: 'center' },
  additionQuestion: { fontSize: 38 },
  listenButton: {
    alignItems: 'center',
    backgroundColor: '#FFE471',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  helper: { color: COLORS.muted, fontFamily: 'Inter_400Regular', fontSize: 13, marginTop: 7, textAlign: 'center' },
  problemArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 42,
    minHeight: 150,
    paddingHorizontal: 8,
  },
  compareGroups: { alignItems: 'center', flexDirection: 'row', gap: 24, justifyContent: 'center', width: '100%' },
  group: {
    alignItems: 'center',
    borderColor: 'rgba(32,93,103,0.18)',
    borderRadius: 28,
    borderWidth: 2,
    justifyContent: 'center',
    minHeight: 124,
    width: 132,
  },
  tappableGroup: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.blue,
    shadowColor: COLORS.ink,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  groupPressed: { backgroundColor: 'rgba(83,199,193,0.16)', opacity: 0.86, transform: [{ scale: 0.95 }] },
  dotGroup: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 110 },
  dotGroupCompact: { gap: 6, maxWidth: 64 },
  dot: { borderRadius: 15, height: 30, width: 30 },
  dotCompact: { borderRadius: 7, height: 14, width: 14 },
  fillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 290 },
  fillSlot: {
    alignItems: 'center',
    backgroundColor: '#EFE8DE',
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  fillSlotFilled: { backgroundColor: COLORS.yellow },
  slotPressed: { opacity: 0.7, transform: [{ scale: 0.9 }] },
  additionHint: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.66)',
    borderColor: 'rgba(32,93,103,0.12)',
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    minHeight: 62,
    paddingHorizontal: 20,
  },
  additionHintSign: { color: COLORS.muted, fontFamily: 'Inter_600SemiBold', fontSize: 18 },
  answerChoices: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 24 },
  symbolChoices: { flexDirection: 'row', gap: 20, justifyContent: 'center', marginTop: 20 },
  symbolButton: {
    alignItems: 'center',
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    width: 86,
  },
  yesButton: { backgroundColor: '#E1F2E9' },
  noButton: { backgroundColor: '#F7E7E4' },
  answerPressed: { opacity: 0.75, transform: [{ scale: 0.97 }] },
  numberButton: {
    alignItems: 'center',
    backgroundColor: '#53C7C1',
    borderColor: '#205D67',
    borderRadius: 20,
    borderWidth: 1,
    height: 62,
    justifyContent: 'center',
    width: 62,
  },
  numberText: { color: '#205D67', fontFamily: 'Inter_700Bold', fontSize: 22 },
  playAgainBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFE471',
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    marginTop: 26,
    width: 64,
  },
  completeDots: { flexDirection: 'row', gap: 14, justifyContent: 'center', marginTop: 54 },
  completeDot: { borderRadius: 18, height: 36, width: 36 },
});