import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const KEYS = [
  { label: 'C', color: '#F16E61' },
  { label: 'D', color: '#F0A83C' },
  { label: 'E', color: '#F6D65B' },
  { label: 'F', color: '#7DC7B6' },
  { label: 'G', color: '#6DB7D8' },
  { label: 'A', color: '#8F7BC7' },
  { label: 'B', color: '#D578A6' },
  { label: 'C', color: '#F16E61' },
];
const TWINKLE = ['C', 'C', 'G', 'G', 'A', 'A', 'G', 'F', 'F', 'E', 'E', 'D', 'D', 'C'];

export default function PianoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [guided, setGuided] = useState(true);
  const [songIndex, setSongIndex] = useState(0);

  useEffect(() => {
    void ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      void ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  const pressKey = (key: string) => {
    setActiveKey(key);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (guided && key === TWINKLE[songIndex]) {
      setSongIndex((index) => (index + 1) % TWINKLE.length);
    }
  };

  const nextKey = guided ? TWINKLE[songIndex] : null;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <Pressable
          testID="piano-back"
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-back" size={22} color="#24313D" />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>LITTLE PIANO</Text>
          <Text style={styles.title}>Make a song</Text>
        </View>
        <Pressable
          testID="piano-guided-toggle"
          accessibilityRole="switch"
          accessibilityState={{ checked: guided }}
          accessibilityLabel="Guided song mode"
          onPress={() => setGuided((value) => !value)}
          style={[styles.modeToggle, guided && styles.modeToggleActive]}
        >
          <Ionicons name={guided ? 'sparkles' : 'sparkles-outline'} size={16} color={guided ? '#24313D' : '#7E8A92'} />
          <Text style={[styles.modeText, guided && styles.modeTextActive]}>Twinkle mode</Text>
        </Pressable>
      </View>

      <View style={styles.songPrompt}>
        <Text style={styles.songPromptText}>
          {guided ? `Tap the ${nextKey} key to play along` : 'Play any key you like'}
        </Text>
        <View style={styles.progressDots}>
          {TWINKLE.slice(0, 7).map((_, index) => (
            <View key={index} style={[styles.progressDot, index < songIndex % 7 && styles.progressDotDone]} />
          ))}
        </View>
      </View>

      <View style={[styles.keyboard, { paddingBottom: Math.max(insets.bottom, 10) }]}>
        {KEYS.map((key, index) => {
          const isActive = activeKey === key.label;
          const isNext = guided && nextKey === key.label;
          return (
            <Pressable
              key={`${key.label}-${index}`}
              testID={`piano-key-${index}`}
              accessibilityRole="button"
              accessibilityLabel={`${key.label} piano key`}
              onPressIn={() => pressKey(key.label)}
              onPressOut={() => setActiveKey(null)}
              style={({ pressed }) => [
                styles.key,
                { backgroundColor: isActive ? key.color : '#FFFFFF' },
                isNext && styles.keyNext,
                pressed && styles.keyPressed,
              ]}
            >
              <Text style={[styles.keyLabel, isActive && styles.keyLabelActive]}>{key.label}</Text>
              {isNext && <View style={[styles.keyGlow, { backgroundColor: key.color }]} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', paddingHorizontal: 18 },
  backButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderRadius: 20, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  pressed: { opacity: 0.65 },
  headerCopy: { flex: 1, marginLeft: 12 },
  eyebrow: { color: '#B4A99C', fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.4, marginBottom: 3 },
  title: { color: '#24313D', fontFamily: 'Inter_700Bold', fontSize: 20 },
  modeToggle: { alignItems: 'center', backgroundColor: '#F1E9DF', borderRadius: 18, flexDirection: 'row', gap: 6, paddingHorizontal: 12, paddingVertical: 9 },
  modeToggleActive: { backgroundColor: '#FFF0C6' },
  modeText: { color: '#7E8A92', fontFamily: 'Inter_500Medium', fontSize: 12 },
  modeTextActive: { color: '#24313D', fontFamily: 'Inter_600SemiBold' },
  songPrompt: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  songPromptText: { color: '#51606B', fontFamily: 'Inter_500Medium', fontSize: 14, marginBottom: 12 },
  progressDots: { flexDirection: 'row', gap: 5 },
  progressDot: { backgroundColor: '#E9DFD2', borderRadius: 3, height: 5, width: 5 },
  progressDotDone: { backgroundColor: '#F0A83C' },
  keyboard: { alignItems: 'stretch', flexDirection: 'row', gap: 5, paddingHorizontal: 15 },
  key: { alignItems: 'center', borderColor: '#E9DFD2', borderRadius: 14, borderWidth: 1, flex: 1, height: 150, justifyContent: 'flex-end', paddingBottom: 16 },
  keyNext: { borderColor: '#24313D', borderWidth: 2, transform: [{ translateY: -5 }] },
  keyPressed: { transform: [{ translateY: 3 }] },
  keyLabel: { color: '#9AA29E', fontFamily: 'Inter_700Bold', fontSize: 16 },
  keyLabelActive: { color: '#FFFFFF' },
  keyGlow: { borderRadius: 8, height: 8, marginBottom: 10, position: 'absolute', top: 12, width: 8 },
});