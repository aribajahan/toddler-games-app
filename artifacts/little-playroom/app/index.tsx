import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

type GameCardProps = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: readonly [string, string, ...string[]];
  onPress: () => void;
  testID: string;
};

function GameCard({
  title,
  description,
  icon,
  colors,
  onPress,
  testID,
}: GameCardProps) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
      onPress={() => {
        void Haptics.selectionAsync();
        onPress();
      }}
      style={({ pressed }) => [styles.gameCardPressable, pressed && styles.pressed]}
    >
      <LinearGradient colors={colors} style={styles.gameCard}>
        <View style={styles.gameIconBubble}>
          <Ionicons name={icon} size={30} color="#24313D" />
        </View>
        <View style={styles.gameCopy}>
          <Text style={styles.gameTitle}>{title}</Text>
          <Text style={styles.gameDescription}>{description}</Text>
        </View>
        <View style={styles.arrowBubble}>
          <Ionicons name="arrow-forward" size={18} color="#24313D" />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 14, paddingBottom: insets.bottom + 28 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>A little space to</Text>
          <Text style={styles.heading}>make & play</Text>
        </View>
        <View style={styles.sunMark}>
          <View style={styles.sunCore} />
          <View style={styles.sunRayOne} />
          <View style={styles.sunRayTwo} />
          <View style={styles.sunRayThree} />
        </View>
      </View>

      <View style={styles.welcomeNote}>
        <View style={styles.noteDot} />
        <Text style={styles.noteText}>Pick something fun to do.</Text>
        <Ionicons name="sparkles-outline" size={19} color="#F0A83C" />
      </View>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Playroom</Text>
        <Text style={styles.sectionHint}>3 things to try</Text>
      </View>

      <GameCard
        title="Color studio"
        description="Draw anything you can imagine"
        icon="color-palette-outline"
        colors={['#FFE8DF', '#FFD8C8']}
        onPress={() => router.push('/paint')}
        testID="home-paint-card"
      />
      <GameCard
        title="Little piano"
        description="Make a song with your fingers"
        icon="musical-notes-outline"
        colors={['#E5F4F1', '#CDEAE5']}
        onPress={() => router.push('/piano')}
        testID="home-piano-card"
      />
      <GameCard
        title="Find the pairs"
        description="Can you remember where they are?"
        icon="grid-outline"
        colors={['#FFF0C6', '#FFE5A1']}
        onPress={() => router.push('/memory')}
        testID="home-memory-card"
      />

      <View style={styles.footerTip}>
        <Ionicons name="heart-outline" size={17} color={colors.mutedForeground} />
        <Text style={styles.footerTipText}>There is no wrong way to play.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  eyebrow: {
    color: '#7E8A92',
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  heading: {
    color: '#24313D',
    fontFamily: 'Inter_700Bold',
    fontSize: 35,
    letterSpacing: -1.5,
  },
  sunMark: {
    alignItems: 'center',
    backgroundColor: '#FFF0C6',
    borderRadius: 27,
    height: 54,
    justifyContent: 'center',
    position: 'relative',
    width: 54,
  },
  sunCore: {
    backgroundColor: '#F0A83C',
    borderRadius: 14,
    height: 27,
    width: 27,
  },
  sunRayOne: {
    backgroundColor: '#F0A83C',
    borderRadius: 2,
    height: 5,
    position: 'absolute',
    top: 7,
    width: 4,
  },
  sunRayTwo: {
    backgroundColor: '#F0A83C',
    borderRadius: 2,
    height: 4,
    position: 'absolute',
    right: 8,
    transform: [{ rotate: '45deg' }],
    width: 6,
  },
  sunRayThree: {
    backgroundColor: '#F0A83C',
    borderRadius: 2,
    bottom: 7,
    height: 5,
    position: 'absolute',
    width: 4,
  },
  welcomeNote: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E9DFD2',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  noteDot: {
    backgroundColor: '#7DC7B6',
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  noteText: {
    color: '#51606B',
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
  },
  sectionHeading: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#24313D',
    fontFamily: 'Inter_700Bold',
    fontSize: 21,
    letterSpacing: -0.4,
  },
  sectionHint: {
    color: '#9AA29E',
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
  },
  gameCardPressable: {
    borderRadius: 24,
    marginBottom: 14,
    overflow: 'hidden',
  },
  gameCard: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 112,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  gameIconBubble: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.68)',
    borderRadius: 24,
    height: 62,
    justifyContent: 'center',
    width: 62,
  },
  gameCopy: { flex: 1, marginHorizontal: 15 },
  gameTitle: {
    color: '#24313D',
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    marginBottom: 6,
  },
  gameDescription: {
    color: '#51606B',
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  arrowBubble: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.56)',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  pressed: { opacity: 0.82, transform: [{ scale: 0.985 }] },
  footerTip: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'center',
    marginTop: 26,
  },
  footerTipText: {
    color: '#9AA29E',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
});