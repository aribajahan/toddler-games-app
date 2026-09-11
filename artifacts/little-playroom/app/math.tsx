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

function getCompareAnswers(prompt: ComparePrompt): CompareAnswer[] {
  return prompt === 'same' ? ['yes', 'no'] : ['left', 'right'];
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

function getRoundLabel(round: Round) {
  if (round.type === 'compare') {
    return round.prompt === 'same' ? 'COMPARE' : round.prompt.toUpperCase();
  }
  if (round.type === 'fill') return 'FILL THE NUMBER';
  return 'ADD IT UP';
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
            <Text style={styles.eyebrow}>MATH MIX</Text>
            <Text style={styles.title}>Little number games</Text>
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
          <View>
            <Text style={styles.progressLabel}>ROUND</Text>
            <Text style={styles.progressValue}>
              {isComplete ? ROUNDS.length : roundNumber}{' '}
              <Text style={styles.progressTotal}>of {ROUNDS.length}</Text>
            </Text>
          </View>
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
          <Text style={styles.helper}>
            {isComplete
              ? 'You counted, compared, and added.'
              : feedback === 'tryAgain'
                ? 'The problem is still right here.'
                : 'Take your time. You can look again.'}
          </Text>
        </View>

        {round.type === 'compare' && (
          <View style={styles.gameCard}>
            <Text style={styles.cardLabel}>{getRoundLabel(round)}</Text>
            <View style={styles.compareGroups}>
              <View style={styles.groupPanel}>
                <Text style={styles.groupLabel}>LEFT</Text>
                <DotGroup count={round.left} color={COLORS.coral} />
              </View>
              <Text style={styles.versus}>and</Text>
              <View style={styles.groupPanel}>
                <Text style={styles.groupLabel}>RIGHT</Text>
                <DotGroup count={round.right} color={COLORS.blue} />
              </View>
            </View>
          </View>
        )}

        {round.type === 'fill' && (
          <View style={styles.gameCard}>
            <Text style={styles.cardLabel}>COUNT THE SHAPES</Text>
            <View style={styles.fillRow}>
              {Array.from({ length: round.target }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.fillSlot,
                    index < fillCount && styles.fillSlotFilled,
                  ]}
                >
                  {index < fillCount && <View style={styles.fillDot} />}
                </View>
              ))}
            </View>
            <Text style={styles.fillCount}>
              {fillCount} <Text style={styles.fillTarget}>of {round.target}</Text>
            </Text>
          </View>
        )}

        {round.type === 'add' && (
          <View style={styles.gameCard}>
            <Text style={styles.cardLabel}>ADD THE GROUPS</Text>
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

        {round.type === 'compare' && (
          <View style={styles.answerChoices}>
            {getCompareAnswers(round.prompt).map((answer) => (
              <Pressable
                key={answer}
                testID={`math-answer-${answer}`}
                accessibilityRole="button"
                accessibilityLabel={getCompareAnswerLabel(answer)}
                disabled={feedback !== 'idle'}
                onPress={() => answerCompare(answer)}
                style={({ pressed }) => [styles.answerButton, pressed && styles.answerPressed]}
              >
                <Text style={styles.answerText}>{getCompareAnswerLabel(answer)}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {round.type === 'fill' && (
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

        {round.type === 'add' && (
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
          <Pressable
            testID="math-play-again"
            accessibilityRole="button"
            accessibilityLabel="Play Math Mix again"
            onPress={reset}
            style={({ pressed }) => [styles.playAgain, pressed && styles.answerPressed]}
          >
            <Ionicons name="sparkles-outline" size={18} color="#B56A16" />
            <Text style={styles.playAgainText}>Play again</Text>
          </Pressable>
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
  eyebrow: {
    color: '#B4A99C',
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.4,
    marginBottom: 3,
  },
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
  progressLabel: {
    color: '#B4A99C',
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 5,
  },
  progressValue: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 25 },
  progressTotal: { color: '#9AA29E', fontFamily: 'Inter_500Medium', fontSize: 13 },
  progressDots: { flexDirection: 'row', gap: 5 },
  progressDot: { backgroundColor: COLORS.line, borderRadius: 3, height: 6, width: 6 },
  progressDotActive: { backgroundColor: COLORS.yellow },
  instructions: { alignItems: 'center', marginTop: 20 },
  question: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 23, textAlign: 'center' },
  helper: { color: COLORS.muted, fontFamily: 'Inter_400Regular', fontSize: 13, marginTop: 7, textAlign: 'center' },
  gameCard: {
    alignItems: 'center',
    backgroundColor: '#FFF9F1',
    borderColor: COLORS.line,
    borderRadius: 25,
    borderWidth: 1,
    marginTop: 28,
    paddingHorizontal: 14,
    paddingVertical: 20,
  },
  cardLabel: {
    color: '#B4A99C',
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 17,
  },
  compareGroups: { alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%' },
  groupPanel: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.line,
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 122,
    justifyContent: 'center',
    paddingHorizontal: 12,
    width: '40%',
  },
  groupLabel: { color: '#B4A99C', fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1, marginBottom: 12 },
  versus: { color: '#B4A99C', fontFamily: 'Inter_500Medium', fontSize: 12 },
  dotGroup: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 100 },
  dot: { borderRadius: 10, height: 18, width: 18 },
  fillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 290 },
  fillSlot: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D8CEC1',
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  fillSlotFilled: { backgroundColor: '#FFF0C6', borderColor: COLORS.yellow, borderStyle: 'solid' },
  fillDot: { backgroundColor: COLORS.yellow, borderRadius: 9, height: 18, width: 18 },
  fillCount: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 22, marginTop: 16 },
  fillTarget: { color: COLORS.muted, fontFamily: 'Inter_500Medium', fontSize: 13 },
  additionRow: { alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'center', minHeight: 92 },
  additionSign: { color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 24 },
  answerMark: { color: '#CFC5B8', fontFamily: 'Inter_700Bold', fontSize: 31 },
  additionEquation: { color: COLORS.muted, fontFamily: 'Inter_600SemiBold', fontSize: 16, marginTop: 10 },
  answerChoices: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 24 },
  answerButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.line,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: 16,
    width: '46%',
  },
  answerText: { color: COLORS.ink, fontFamily: 'Inter_600SemiBold', fontSize: 13, textAlign: 'center' },
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
    flexDirection: 'row',
    gap: 7,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  playAgainText: { color: '#B56A16', fontFamily: 'Inter_700Bold', fontSize: 13 },
});