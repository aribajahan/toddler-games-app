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
        { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 28 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <Text style={styles.heading}>MAKE & PLAY</Text>
        </View>
        <View style={styles.sunMark}>
          <View style={styles.sunCore} />
          <View style={styles.sunRayOne} />
          <View style={styles.sunRayTwo} />
          <View style={styles.sunRayThree} />
        </View>
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
    marginBottom: 30,
    minHeight: 58,
  },
  titleWrap: { flex: 1, minWidth: 0 },
  heading: {
    color: '#24313D',
    fontFamily: 'Inter_700Bold',
    fontSize: 34,
    letterSpacing: -1.2,
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
});