import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

type PatternId = 'circle' | 'square' | 'triangle' | 'star';
type Phase = 'preview' | 'input' | 'success' | 'mistake' | 'complete';

const PATTERN_LENGTH_START = 3;
const MAX_ROUNDS = 6;
const PREVIEW_STEP_MS = 720;

const PATTERNS: Array<{
  id: PatternId;
  label: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  { id: 'circle', label: 'circle', color: '#F16E61', icon: 'ellipse' },
  { id: 'square', label: 'square', color: '#6DB7D8', icon: 'square' },
  { id: 'triangle', label: 'triangle', color: '#F0A83C', icon: 'triangle' },
  { id: 'star', label: 'star', color: '#8F7BC7', icon: 'star' },
];

function createPattern(length: number): PatternId[] {
  const pattern: PatternId[] = [];

  for (let index = 0; index < length; index += 1) {
    const choices = PATTERNS.filter((shape) => shape.id !== pattern[index - 1]);
    pattern.push(choices[Math.floor(Math.random() * choices.length)].id);
  }

  return pattern;
}

function getPattern(patternId: PatternId) {
  return PATTERNS.find((pattern) => pattern.id === patternId) ?? PATTERNS[0];
}

function PatternIcon({
  patternId,
  size = 22,
  color,
}: {
  patternId: PatternId;
  size?: number;
  color?: string;
}) {
  const pattern = getPattern(patternId);
  return <Ionicons name={pattern.icon} size={size} color={color ?? pattern.color} />;
}

export default function PatternScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [round, setRound] = useState(1);
  const [sequence, setSequence] = useState<PatternId[]>(() => createPattern(PATTERN_LENGTH_START));
  const [input, setInput] = useState<PatternId[]>([]);
  const [phase, setPhase] = useState<Phase>('preview');
  const [previewIndex, setPreviewIndex] = useState(-1);

  const startRound = useCallback((nextRound: number) => {
    setRound(nextRound);
    setSequence(createPattern(Math.min(PATTERN_LENGTH_START + nextRound - 1, 8)));
    setInput([]);
    setPhase('preview');
  }, []);

  useEffect(() => {
    if (phase !== 'preview') return undefined;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let index = 0;
    setPreviewIndex(-1);

    const showNext = () => {
      if (cancelled) return;
      if (index >= sequence.length) {
        setPreviewIndex(-1);
        setPhase('input');
        return;
      }

      setPreviewIndex(index);
      void Haptics.selectionAsync();
      index += 1;
      timer = setTimeout(showNext, PREVIEW_STEP_MS);
    };

    timer = setTimeout(showNext, 460);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [phase, sequence]);

  useEffect(() => {
    if (phase !== 'success' && phase !== 'mistake') return undefined;

    const timer = setTimeout(() => {
      if (phase === 'success') {
        startRound(round + 1);
      } else {
        setInput([]);
        setPhase('preview');
      }
    }, phase === 'success' ? 900 : 1050);

    return () => clearTimeout(timer);
  }, [phase, round, startRound]);

  const choosePattern = (patternId: PatternId) => {
    if (phase !== 'input') return;

    const position = input.length;
    if (sequence[position] !== patternId) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setPhase('mistake');
      return;
    }

    const nextInput = [...input, patternId];
    setInput(nextInput);
    void Haptics.selectionAsync();

    if (nextInput.length === sequence.length) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setPhase(round === MAX_ROUNDS ? 'complete' : 'success');
    }
  };

  const isPreviewing = phase === 'preview';
  const isComplete = phase === 'complete';
  const statusText = isComplete
    ? 'Pattern master!'
    : phase === 'success'
      ? 'Nice pattern!'
      : phase === 'mistake'
        ? 'Almost! Watch it once more'
        : isPreviewing
          ? 'Watch the shapes'
          : 'Your turn';

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 56 }]}>
        <Pressable
          testID="pattern-back"
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-back" size={24} color="#24313D" />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>PATTERN PARADE</Text>
          <Text style={styles.title}>Remember the order</Text>
        </View>
        <Pressable
          testID="pattern-reset"
          accessibilityRole="button"
          accessibilityLabel="Start a new pattern"
          onPress={() => startRound(1)}
          style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}
        >
          <Ionicons name="refresh-outline" size={19} color="#7E8A92" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressLabel}>ROUND</Text>
            <Text style={styles.progressValue}>
              {isComplete ? MAX_ROUNDS : round} <Text style={styles.progressTotal}>of {MAX_ROUNDS}</Text>
            </Text>
          </View>
          <View style={styles.roundDots} accessibilityLabel={`Round ${round} of ${MAX_ROUNDS}`}>
            {Array.from({ length: MAX_ROUNDS }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.roundDot,
                  index < (isComplete ? MAX_ROUNDS : round) && styles.roundDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.status}>{statusText}</Text>
          <Text style={styles.helper}>
            {isComplete
              ? 'You remembered every parade.'
              : isPreviewing
                ? 'Look closely, then tap them back.'
                : 'Tap the shapes in the same order.'}
          </Text>
        </View>

        <View style={styles.patternCard}>
          <Text style={styles.patternLabel}>{isPreviewing ? 'THE PATTERN' : 'YOUR PATTERN'}</Text>
          <View style={styles.patternRow}>
            {sequence.map((patternId, index) => {
              const revealed = isPreviewing || index < input.length || isComplete;
              const isCurrent = isPreviewing && index === previewIndex;
              return (
                <View
                  key={`${patternId}-${index}`}
                  style={[
                    styles.patternSlot,
                    revealed && styles.patternSlotRevealed,
                    isCurrent && styles.patternSlotCurrent,
                  ]}
                >
                  {revealed ? (
                    <PatternIcon patternId={patternId} size={24} />
                  ) : (
                    <Text style={styles.patternQuestion}>?</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.choices}>
          {PATTERNS.map((pattern) => {
            const isCurrent = isPreviewing && sequence[previewIndex] === pattern.id;
            return (
              <Pressable
                key={pattern.id}
                testID={`pattern-choice-${pattern.id}`}
                accessibilityRole="button"
                accessibilityLabel={`Choose ${pattern.label}`}
                accessibilityState={{ disabled: phase !== 'input' }}
                disabled={phase !== 'input'}
                onPress={() => choosePattern(pattern.id)}
                style={({ pressed }) => [
                  styles.choice,
                  { backgroundColor: `${pattern.color}18`, borderColor: `${pattern.color}55` },
                  isCurrent && { backgroundColor: pattern.color, borderColor: pattern.color },
                  pressed && styles.choicePressed,
                ]}
              >
                <PatternIcon patternId={pattern.id} size={42} color={isCurrent ? '#FFFFFF' : pattern.color} />
                <Text style={[styles.choiceLabel, { color: isCurrent ? '#FFFFFF' : pattern.color }]}>
                  {pattern.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {isComplete && (
          <Pressable
            testID="pattern-play-again"
            accessibilityRole="button"
            accessibilityLabel="Play Pattern Parade again"
            onPress={() => startRound(1)}
            style={({ pressed }) => [styles.playAgain, pressed && styles.choicePressed]}
          >
            <Ionicons name="sparkles-outline" size={18} color="#B56A16" />
            <Text style={styles.playAgainText}>Play again</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 18,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E9DFD2',
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
  title: { color: '#24313D', fontFamily: 'Inter_700Bold', fontSize: 20 },
  resetButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E9DFD2',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  progressHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  progressLabel: {
    color: '#B4A99C',
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 5,
  },
  progressValue: { color: '#24313D', fontFamily: 'Inter_700Bold', fontSize: 25 },
  progressTotal: { color: '#9AA29E', fontFamily: 'Inter_500Medium', fontSize: 13 },
  roundDots: { flexDirection: 'row', gap: 6 },
  roundDot: { backgroundColor: '#E9DFD2', borderRadius: 4, height: 8, width: 8 },
  roundDotActive: { backgroundColor: '#F0A83C' },
  instructions: { alignItems: 'center', marginTop: 20 },
  status: { color: '#24313D', fontFamily: 'Inter_700Bold', fontSize: 23, textAlign: 'center' },
  helper: { color: '#7E8A92', fontFamily: 'Inter_400Regular', fontSize: 13, marginTop: 7 },
  patternCard: {
    alignItems: 'center',
    backgroundColor: '#FFF9F1',
    borderColor: '#E9DFD2',
    borderRadius: 25,
    borderWidth: 1,
    marginTop: 26,
    paddingHorizontal: 12,
    paddingVertical: 18,
  },
  patternLabel: {
    color: '#B4A99C',
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  patternRow: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  patternSlot: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E9DFD2',
    borderRadius: 13,
    borderWidth: 1,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  patternSlotRevealed: { backgroundColor: '#FFFEFB' },
  patternSlotCurrent: { borderColor: '#F0A83C', borderWidth: 2, transform: [{ scale: 1.08 }] },
  patternQuestion: { color: '#CFC5B8', fontFamily: 'Inter_700Bold', fontSize: 22 },
  choices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginTop: 30,
  },
  choice: {
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1.5,
    height: 116,
    justifyContent: 'center',
    width: '46%',
  },
  choicePressed: { opacity: 0.75, transform: [{ scale: 0.97 }] },
  choiceLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 12, marginTop: 8 },
  playAgain: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFF0C6',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 7,
    marginTop: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  playAgainText: { color: '#B56A16', fontFamily: 'Inter_700Bold', fontSize: 13 },
});