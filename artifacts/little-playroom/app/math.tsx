import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

type ComparePrompt = 'more' | 'less' | 'same';
type Round =
  | { type: 'compare'; prompt: ComparePrompt; left: number; right: number }
  | { type: 'fill'; target: number }
  | { type: 'add'; first: number; second: number };
type Feedback = 'idle' | 'correct' | 'tryAgain' | 'complete';
type CompareAnswer = 'left' | 'right' | 'yes' | 'no';

const ROUNDS: Round[] = [
  { type: 'compare', prompt: 'more', left: 1, right: 3 },
  { type: 'fill', target: 3 },
  { type: 'add', first: 1, second: 1 },
  { type: 'compare', prompt: 'same', left: 3, right: 3 },
  { type: 'fill', target: 5 },
  { type: 'add', first: 2, second: 2 },
  { type: 'compare', prompt: 'less', left: 4, right: 5 },
  { type: 'fill', target: 7 },
  { type: 'add', first: 3, second: 2 },
];

const COLORS = {
  coral: '#F16E61',
  blue: '#6DB7D8',
  yellow: '#F0A83C',
  purple: '#8F7BC7',
  ink: '#24313D',
  muted: '#7E8A92',
  line: '#E9DFD2',
};

function DotGroup({ count, color }: { count: number; color: string }) {
  return (
    <View style={styles.dotGroup} accessibilityLabel={`${count} shapes`}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={[styles.dot, { backgroundColor: color }]} />
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

export default function MathScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [roundIndex, setRoundIndex] = useState(0);
  const [fillCount, setFillCount] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>('idle');

  const round = ROUNDS[roundIndex];
  const roundNumber = roundIndex + 1;
  const isComplete = feedback === 'complete';

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
    setFeedback(roundIndex === ROUNDS.length - 1 ? 'complete' : 'correct');
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
    if (feedback !== 'idle' || round.type !== 'add') return;
    if (answer === round.first + round.second) {
      finishRound();
    } else {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setFeedback('tryAgain');
    }
  };

  const reset = () => {
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
          : round.type === 'add'
            ? 'What is the total?'
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
          <Text style={styles.progressValue}>
            {isComplete ? ROUNDS.length : roundNumber}
            <Text style={styles.progressTotal}> / {ROUNDS.length}</Text>
          </Text>
          <View style={styles.progressDots} accessibilityLabel={`Round ${roundNumber} of ${ROUNDS.length}`}>
            {ROUNDS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index < (isComplete ? ROUNDS.length : roundNumber) && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.question}>{feedbackText}</Text>
          {(isComplete || feedback === 'tryAgain') && (
            <Text style={styles.helper}>
              {isComplete ? 'You counted, compared, and added.' : 'Try once more.'}
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
              <Text style={styles.versus}>or</Text>
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
              {Array.from({ length: round.target }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.fillSlot,
                    index < fillCount && styles.fillSlotFilled,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.fillCount}>
              {fillCount} <Text style={styles.fillTarget}>/ {round.target}</Text>
            </Text>
          </View>
        )}

        {!isComplete && round.type === 'add' && (
          <View style={styles.problemArea}>
            <View style={styles.additionRow}>
              <DotGroup count={round.first} color={COLORS.yellow} />
              <Text style={styles.additionSign}>+</Text>
              <DotGroup count={round.second} color={COLORS.purple} />
              <Text style={styles.additionSign}>=</Text>
              <Text style={styles.answerMark}>?</Text>
            </View>
            <Text style={styles.additionEquation}>
              {round.first} + {round.second} = ?
            </Text>
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

        {!isComplete && round.type === 'fill' && (
          <Pressable
            testID="math-add-one"
            accessibilityRole="button"
            accessibilityLabel="Add one shape"
            disabled={feedback !== 'idle'}
            onPress={addOne}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.answerPressed]}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Add one</Text>
          </Pressable>
        )}

        {!isComplete && round.type === 'add' && (
          <View style={styles.answerChoices}>
            {getArithmeticChoices(round.first + round.second, roundIndex).map((answer) => (
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
              style={({ pressed }) => [styles.playAgain, pressed && styles.answerPressed]}
            >
              <Text style={styles.playAgainText}>Play again</Text>
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
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  progressValue: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 15 },
  progressTotal: { color: '#9AA29E', fontFamily: 'Inter_500Medium', fontSize: 13 },
  progressDots: { flexDirection: 'row', gap: 5 },
  progressDot: { backgroundColor: COLORS.line, borderRadius: 3, height: 6, width: 6 },
  progressDotActive: { backgroundColor: COLORS.yellow },
  instructions: { alignItems: 'center', marginTop: 38 },
  question: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 26, textAlign: 'center' },
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
    borderRadius: 28,
    justifyContent: 'center',
    minHeight: 110,
    width: 120,
  },
  tappableGroup: { backgroundColor: 'rgba(255,255,255,0.52)' },
  groupPressed: { opacity: 0.72, transform: [{ scale: 0.92 }] },
  versus: { color: '#B4A99C', fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  dotGroup: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 110 },
  dot: { borderRadius: 15, height: 30, width: 30 },
  fillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 290 },
  fillSlot: {
    backgroundColor: '#EFE8DE',
    borderRadius: 17,
    height: 34,
    width: 34,
  },
  fillSlotFilled: { backgroundColor: COLORS.yellow },
  fillCount: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 22, marginTop: 22 },
  fillTarget: { color: COLORS.muted, fontFamily: 'Inter_500Medium', fontSize: 13 },
  additionRow: { alignItems: 'center', flexDirection: 'row', gap: 14, justifyContent: 'center', minHeight: 92 },
  additionSign: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 24 },
  answerMark: { color: '#CFC5B8', fontFamily: 'Inter_700Bold', fontSize: 31 },
  additionEquation: { color: COLORS.muted, fontFamily: 'Inter_600SemiBold', fontSize: 16, marginTop: 10 },
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
  primaryButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.ink,
    borderRadius: 18,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: 24,
    minHeight: 54,
    paddingHorizontal: 24,
  },
  primaryButtonText: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 14 },
  numberButton: {
    alignItems: 'center',
    backgroundColor: '#EEE8FF',
    borderColor: '#D9CFFF',
    borderRadius: 20,
    borderWidth: 1,
    height: 62,
    justifyContent: 'center',
    width: 62,
  },
  numberText: { color: '#6C59A8', fontFamily: 'Inter_700Bold', fontSize: 22 },
  playAgain: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFF0C6',
    borderRadius: 18,
    marginTop: 26,
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  playAgainText: { color: '#B56A16', fontFamily: 'Inter_700Bold', fontSize: 13 },
  completeDots: { flexDirection: 'row', gap: 14, justifyContent: 'center', marginTop: 54 },
  completeDot: { borderRadius: 18, height: 36, width: 36 },
});