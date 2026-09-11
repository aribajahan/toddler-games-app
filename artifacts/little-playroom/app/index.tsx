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
  foreground?: string;
  iconForeground?: string;
};

function GameCard({
  title,
  description,
  icon,
  colors,
  onPress,
  testID,
  foreground = '#205D67',
  iconForeground = foreground,
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
          <Ionicons name={icon} size={32} color={iconForeground} />
        </View>
        <View style={styles.gameCopy}>
          <Text style={[styles.gameTitle, { color: foreground }]}>{title}</Text>
          <Text style={[styles.gameDescription, { color: foreground }]}>{description}</Text>
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
          <Text style={styles.heading}>Little Playroom</Text>
        </View>
        <View style={styles.sunMark}>
          <View style={styles.sunCore} />
          <View style={styles.sunRayOne} />
          <View style={styles.sunRayTwo} />
          <View style={styles.sunRayThree} />
        </View>
      </View>

      <GameCard
        title="Color studio"
        description="Draw anything you can imagine"
        icon="color-palette-outline"
        colors={['#FF6871', '#FF6871']}
        onPress={() => router.push('/paint')}
        testID="home-paint-card"
      />
      <GameCard
        title="Little piano"
        description="Make a song with your fingers"
        icon="musical-notes-outline"
        colors={['#53C7C1', '#53C7C1']}
        onPress={() => router.push('/piano')}
        testID="home-piano-card"
      />
      <GameCard
        title="Find the pairs"
        description="Can you remember where they are?"
        icon="grid-outline"
        colors={['#FFE471', '#FFE471']}
        onPress={() => router.push('/memory')}
        testID="home-memory-card"
      />
      <GameCard
        title="Math mix"
        description="More, less, and little sums"
        icon="calculator-outline"
        colors={['#205D67', '#205D67']}
        foreground="#F7FBF5"
        iconForeground="#205D67"
        onPress={() => router.push('/math')}
        testID="home-math-card"
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
    color: '#205D67',
    fontFamily: 'Inter_700Bold',
    fontSize: 34,
    letterSpacing: -1.2,
  },
  sunMark: {
    alignItems: 'center',
    backgroundColor: '#FFE471',
    borderRadius: 27,
    height: 54,
    justifyContent: 'center',
    position: 'relative',
    width: 54,
  },
  sunCore: {
    backgroundColor: '#FF6871',
    borderRadius: 14,
    height: 27,
    width: 27,
  },
  sunRayOne: {
    backgroundColor: '#FF6871',
    borderRadius: 2,
    height: 5,
    position: 'absolute',
    top: 7,
    width: 4,
  },
  sunRayTwo: {
    backgroundColor: '#FF6871',
    borderRadius: 2,
    height: 4,
    position: 'absolute',
    right: 8,
    transform: [{ rotate: '45deg' }],
    width: 6,
  },
  sunRayThree: {
    backgroundColor: '#FF6871',
    borderRadius: 2,
    bottom: 7,
    height: 5,
    position: 'absolute',
    width: 4,
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
    backgroundColor: '#F7FBF5',
    borderColor: 'rgba(32,93,103,0.12)',
    borderRadius: 24,
    borderWidth: 1,
    height: 62,
    justifyContent: 'center',
    width: 62,
  },
  gameCopy: { flex: 1, marginHorizontal: 15 },
  gameTitle: {
    color: '#205D67',
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
  pressed: { opacity: 0.82, transform: [{ scale: 0.985 }] },
});