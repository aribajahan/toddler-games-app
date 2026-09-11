import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const NOTE_SOURCES = {
  C4: require('../assets/audio/C.wav'),
  D4: require('../assets/audio/D.wav'),
  E4: require('../assets/audio/E.wav'),
  F4: require('../assets/audio/F.wav'),
  G4: require('../assets/audio/G.wav'),
  A4: require('../assets/audio/A.wav'),
  B4: require('../assets/audio/B.wav'),
  C5: require('../assets/audio/C5.wav'),
};

const KEYS = [
  { label: 'C', color: '#FF6871', source: NOTE_SOURCES.C4 },
  { label: 'D', color: '#FFE471', source: NOTE_SOURCES.D4 },
  { label: 'E', color: '#53C7C1', source: NOTE_SOURCES.E4 },
  { label: 'F', color: '#205D67', source: NOTE_SOURCES.F4 },
  { label: 'G', color: '#FF6871', source: NOTE_SOURCES.G4 },
  { label: 'A', color: '#FFE471', source: NOTE_SOURCES.A4 },
  { label: 'B', color: '#53C7C1', source: NOTE_SOURCES.B4 },
  { label: 'C', color: '#205D67', source: NOTE_SOURCES.C5 },
] as const;

const SONGS = [
  { name: 'Twinkle Twinkle', shortName: 'Twinkle', icon: 'star', notes: [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0] },
  { name: 'Mary Had a Little Lamb', shortName: 'Mary', icon: 'paw', notes: [2, 1, 0, 1, 2, 2, 2, 1, 1, 1, 2, 4, 4, 2, 1, 0, 1, 2, 2, 2, 2, 1, 1, 2, 1, 0] },
  { name: 'Row, Row, Row Your Boat', shortName: 'Row Boat', icon: 'boat', notes: [0, 0, 0, 1, 2, 2, 1, 2, 3, 4, 7, 7, 7, 4, 4, 4, 2, 2, 2, 0, 0, 0, 4, 3, 2, 1, 0] },
  { name: 'Ode to Joy', shortName: 'Ode to Joy', icon: 'happy', notes: [2, 2, 3, 4, 4, 3, 2, 1, 0, 0, 1, 2, 2, 1, 1, 2, 2, 3, 4, 4, 3, 2, 1, 0, 0, 1, 2, 1, 0, 0] },
  { name: 'Jingle Bells', shortName: 'Jingle Bells', icon: 'notifications', notes: [2, 2, 2, 2, 2, 2, 2, 4, 0, 1, 2, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 2, 1, 4] },
  { name: 'Old MacDonald', shortName: 'Old MacDonald', icon: 'leaf', notes: [0, 0, 0, 4, 5, 5, 4, 2, 2, 1, 1, 0, 4, 0, 0, 0, 4, 5, 5, 4, 2, 2, 1, 1, 0] },
  { name: 'Happy Birthday', shortName: 'Birthday', icon: 'gift', notes: [0, 0, 1, 0, 3, 2, 0, 0, 1, 0, 4, 3, 0, 0, 7, 5, 3, 2, 1, 6, 6, 5, 3, 4, 3] },
] as const;

export default function PianoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const { height, width } = useWindowDimensions();
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [guided, setGuided] = useState(true);
  const [songIndex, setSongIndex] = useState(0);
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [showSongMenu, setShowSongMenu] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const player = useAudioPlayer(NOTE_SOURCES.C4);
  const selectedSong = SONGS[selectedSongIndex];

  useEffect(() => {
    if (Platform.OS !== 'web') {
      void ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    void setAudioModeAsync({ playsInSilentMode: true, shouldPlayInBackground: false });
    return () => {
      if (Platform.OS !== 'web') {
        void ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      }
    };
  }, []);

  const pressKey = (index: number) => {
    setActiveKey(index);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (soundOn) {
      player.replace(KEYS[index]?.source ?? NOTE_SOURCES.C4);
      void player.seekTo(0);
      player.play();
    }
    if (guided && index === selectedSong.notes[songIndex]) {
      setSongIndex((index) => (index + 1) % selectedSong.notes.length);
    }
  };

  const nextKeyIndex = guided ? selectedSong.notes[songIndex] : null;
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
            left: 110,
            position: 'relative',
            width: height,
            transform: [{ rotate: '90deg' }],
          },
        ]}
      >
      <View
        style={[
          styles.header,
          isPortrait && styles.headerPortrait,
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
          <Ionicons name="chevron-back" size={22} color="#205D67" />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Little piano</Text>
        </View>
        <Pressable
          testID="piano-song-picker"
          accessibilityRole="button"
          accessibilityLabel={`Choose a song. Current selection: ${guided ? selectedSong.name : 'Free play'}`}
          accessibilityState={{ expanded: showSongMenu }}
          onPress={() => setShowSongMenu((value) => !value)}
          style={[styles.modeToggle, guided && styles.modeToggleActive]}
        >
          <Ionicons name={guided ? selectedSong.icon : 'musical-notes'} size={17} color={guided ? '#205D67' : '#7E8A92'} />
          <Text style={[styles.modeText, guided && styles.modeTextActive]}>{guided ? selectedSong.shortName : 'Free play'}</Text>
          <Ionicons name={showSongMenu ? 'chevron-up' : 'chevron-down'} size={14} color="#7E8A92" />
        </Pressable>
        <Pressable
          testID="piano-sound-toggle"
          accessibilityRole="switch"
          accessibilityState={{ checked: soundOn }}
          accessibilityLabel={soundOn ? 'Turn sound off' : 'Turn sound on'}
          onPress={() => setSoundOn((value) => !value)}
          style={[styles.soundToggle, soundOn && styles.soundToggleActive]}
        >
          <Ionicons name={soundOn ? 'volume-high-outline' : 'volume-mute-outline'} size={18} color={soundOn ? '#205D67' : '#7E8A92'} />
        </Pressable>
      </View>

      {showSongMenu && (
        <View
          style={[
            styles.songMenu,
            {
              right: landscapeInsets.right + 58,
              top: landscapeInsets.top + 55,
            },
          ]}
        >
          <Pressable
            testID="piano-song-free-play"
            accessibilityRole="button"
            accessibilityState={{ selected: !guided }}
            onPress={() => {
              setGuided(false);
              setSongIndex(0);
              setShowSongMenu(false);
            }}
            style={[styles.songMenuChoice, !guided && styles.songMenuChoiceSelected]}
          >
            <Ionicons name="musical-notes" size={18} color={!guided ? '#205D67' : '#7E8A92'} />
            <Text style={[styles.songMenuText, !guided && styles.songMenuTextSelected]}>Free play</Text>
          </Pressable>
          {SONGS.map((song, index) => {
            const selected = guided && selectedSongIndex === index;
            return (
              <Pressable
                key={song.name}
                testID={`piano-song-${index}`}
                accessibilityRole="button"
                accessibilityLabel={`Play ${song.name}`}
                accessibilityState={{ selected }}
                onPress={() => {
                  setSelectedSongIndex(index);
                  setSongIndex(0);
                  setGuided(true);
                  setShowSongMenu(false);
                }}
                style={[styles.songMenuChoice, selected && styles.songMenuChoiceSelected]}
              >
                <Ionicons name={song.icon} size={18} color={selected ? '#205D67' : '#7E8A92'} />
                <Text style={[styles.songMenuText, selected && styles.songMenuTextSelected]}>{song.shortName}</Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <View style={styles.songPrompt}>
        <Text style={styles.songPromptText}>
          {guided ? selectedSong.name : 'Free play'}
        </Text>
        <View style={[styles.progressDots, !guided && { opacity: 0 }]}>
          {selectedSong.notes.slice(0, 8).map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index < songIndex % 8 && styles.progressDotDone,
                index === songIndex % 8 && styles.progressDotCurrent,
              ]}
            />
          ))}
        </View>
      </View>

      <View
        style={[
          styles.keyboard,
          {
            paddingBottom: Math.max(landscapeInsets.bottom, 10) + 34,
            paddingLeft: landscapeInsets.left + (isPortrait ? 110 : 15),
            paddingRight: landscapeInsets.right + (isPortrait ? 45 : 15),
          },
        ]}
      >
        {KEYS.map((key, index) => {
          const isActive = activeKey === index;
          const isNext = guided && nextKeyIndex === index;
          return (
            <Pressable
              key={`${key.label}-${index}`}
              testID={`piano-key-${index}`}
              accessibilityRole="button"
              accessibilityLabel={`${key.label} piano key`}
              onPressIn={() => pressKey(index)}
              onPressOut={() => setActiveKey(null)}
              style={({ pressed }) => [
                styles.key,
                { backgroundColor: isActive ? key.color : '#FFFFFF' },
                isNext && styles.keyNext,
                pressed && styles.keyPressed,
              ]}
            >
              <Text style={[styles.keyLabel, isActive && styles.keyLabelActive]}>{key.label}</Text>
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
  headerPortrait: { transform: [{ translateY: -78 }] },
  backButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderRadius: 20, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  pressed: { opacity: 0.65 },
  headerCopy: { flex: 1, marginLeft: 4, minWidth: 0 },
  title: { color: '#205D67', fontFamily: 'Inter_700Bold', fontSize: 20 },
  modeToggle: { alignItems: 'center', backgroundColor: '#F1E9DF', borderRadius: 18, flexDirection: 'row', gap: 6, paddingHorizontal: 12, paddingVertical: 9 },
  modeToggleActive: { backgroundColor: '#FFE471' },
  modeText: { color: '#7E8A92', fontFamily: 'Inter_500Medium', fontSize: 12 },
  modeTextActive: { color: '#205D67', fontFamily: 'Inter_600SemiBold' },
  soundToggle: { alignItems: 'center', backgroundColor: '#F1E9DF', borderRadius: 18, height: 36, justifyContent: 'center', width: 36 },
  soundToggleActive: { backgroundColor: '#FFE471' },
  songMenu: { backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderRadius: 16, borderWidth: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 6, padding: 8, position: 'absolute', width: 290, zIndex: 10 },
  songMenuChoice: { alignItems: 'center', backgroundColor: '#F1E9DF', borderRadius: 12, flexDirection: 'row', gap: 6, paddingHorizontal: 10, paddingVertical: 7 },
  songMenuChoiceSelected: { backgroundColor: '#FFE471', borderColor: '#205D67', borderWidth: 1 },
  songMenuText: { color: '#7E8A92', fontFamily: 'Inter_500Medium', fontSize: 11 },
  songMenuTextSelected: { color: '#205D67', fontFamily: 'Inter_600SemiBold' },
  songPrompt: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  songPromptText: { color: '#51606B', fontFamily: 'Inter_500Medium', fontSize: 14, marginBottom: 12 },
  progressDots: { flexDirection: 'row', gap: 6 },
  progressDot: { backgroundColor: '#E9DFD2', borderRadius: 4, height: 6, width: 6 },
  progressDotDone: { backgroundColor: '#FF6871' },
  progressDotCurrent: { backgroundColor: '#53C7C1', height: 9, width: 9 },
  keyboard: { alignItems: 'stretch', flexDirection: 'row', gap: 5, paddingHorizontal: 15 },
  key: { alignItems: 'center', borderColor: '#E9DFD2', borderRadius: 14, borderWidth: 1, flex: 1, height: 190, justifyContent: 'flex-end', paddingBottom: 16 },
  keyNext: { borderColor: '#205D67', borderWidth: 3, transform: [{ translateY: -6 }] },
  keyPressed: { transform: [{ translateY: 3 }] },
  keyLabel: { color: '#9AA29E', fontFamily: 'Inter_700Bold', fontSize: 16 },
  keyLabelActive: { color: '#FFFFFF' },
});