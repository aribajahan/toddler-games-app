import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
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
const NOTE_SOURCES: Record<string, number> = {
  C: require('../assets/audio/C.wav'),
  D: require('../assets/audio/D.wav'),
  E: require('../assets/audio/E.wav'),
  F: require('../assets/audio/F.wav'),
  G: require('../assets/audio/G.wav'),
  A: require('../assets/audio/A.wav'),
  B: require('../assets/audio/B.wav'),
};

export default function PianoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const { height, width } = useWindowDimensions();
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [guided, setGuided] = useState(true);
  const [songIndex, setSongIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const player = useAudioPlayer(NOTE_SOURCES.C);

  useEffect(() => {
    void ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    void setAudioModeAsync({ playsInSilentMode: true, shouldPlayInBackground: false });
    return () => {
      void ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  const pressKey = (key: string, index: number) => {
    setActiveKey(index);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (soundOn) {
      player.replace(NOTE_SOURCES[key] ?? NOTE_SOURCES.C);
      void player.seekTo(0);
      player.play();
    }
    if (guided && key === TWINKLE[songIndex]) {
      setSongIndex((index) => (index + 1) % TWINKLE.length);
    }
  };

  const nextKey = guided ? TWINKLE[songIndex] : null;
  const isPortrait = height > width;
  const landscapeInsets = isPortrait
    ? { top: insets.left, right: insets.top, bottom: insets.right, left: insets.bottom }
    : insets;

  return (
    <View style={[styles.orientationStage, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.screen,
          { backgroundColor: colors.background },
          isPortrait && {
            flex: 0,
            height: width,
            width: height,
            transform: [{ rotate: '90deg' }],
          },
        ]}
      >
      <View
        style={[
          styles.header,
          {
            paddingTop: landscapeInsets.top + 12,
            paddingBottom: 12,
            paddingLeft: landscapeInsets.left + 18,
            paddingRight: landscapeInsets.right + 18,
          },
        ]}
      >
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
        <Pressable
          testID="piano-sound-toggle"
          accessibilityRole="switch"
          accessibilityState={{ checked: soundOn }}
          accessibilityLabel={soundOn ? 'Turn sound off' : 'Turn sound on'}
          onPress={() => setSoundOn((value) => !value)}
          style={[styles.soundToggle, soundOn && styles.soundToggleActive]}
        >
          <Ionicons name={soundOn ? 'volume-high-outline' : 'volume-mute-outline'} size={18} color={soundOn ? '#24313D' : '#7E8A92'} />
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

      <View
        style={[
          styles.keyboard,
          {
            paddingBottom: Math.max(landscapeInsets.bottom, 10),
            paddingLeft: landscapeInsets.left + 15,
            paddingRight: landscapeInsets.right + 15,
          },
        ]}
      >
        {KEYS.map((key, index) => {
          const isActive = activeKey === index;
          const isNext = guided && nextKey === key.label && (key.label !== 'C' || index === 0);
          return (
            <Pressable
              key={`${key.label}-${index}`}
              testID={`piano-key-${index}`}
              accessibilityRole="button"
              accessibilityLabel={`${key.label} piano key`}
              onPressIn={() => pressKey(key.label, index)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  orientationStage: { alignItems: 'center', flex: 1, justifyContent: 'center', overflow: 'hidden' },
  screen: { flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', gap: 8, paddingHorizontal: 18 },
  backButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderRadius: 20, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  pressed: { opacity: 0.65 },
  headerCopy: { flex: 1, marginLeft: 4, minWidth: 0 },
  eyebrow: { color: '#B4A99C', fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.4, marginBottom: 3 },
  title: { color: '#24313D', fontFamily: 'Inter_700Bold', fontSize: 20 },
  modeToggle: { alignItems: 'center', backgroundColor: '#F1E9DF', borderRadius: 18, flexDirection: 'row', gap: 6, paddingHorizontal: 12, paddingVertical: 9 },
  modeToggleActive: { backgroundColor: '#FFF0C6' },
  modeText: { color: '#7E8A92', fontFamily: 'Inter_500Medium', fontSize: 12 },
  modeTextActive: { color: '#24313D', fontFamily: 'Inter_600SemiBold' },
  soundToggle: { alignItems: 'center', backgroundColor: '#F1E9DF', borderRadius: 18, height: 36, justifyContent: 'center', width: 36 },
  soundToggleActive: { backgroundColor: '#FFF0C6' },
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