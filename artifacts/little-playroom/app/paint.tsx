import React, { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

type Point = { x: number; y: number };
type Stroke = { points: Point[]; color: string; width: number; opacity: number; tool?: Tool };
type Tool = 'pen' | 'marker' | 'watercolor';

const STORAGE_KEY = 'little-playroom-paint-strokes';
const FAVORITE_COLORS = ['#F16E61', '#F0A83C', '#F6D65B', '#7DC7B6', '#6DB7D8', '#8F7BC7', '#24313D'];
const COLOR_GRID = [
  '#F16E61', '#EF8A5B', '#F0A83C', '#F6D65B', '#C9D84B',
  '#7DC7B6', '#58B8A4', '#6DB7D8', '#5F93D2', '#8F7BC7',
  '#D578A6', '#E86A82', '#8F6F5D', '#24313D', '#7E8A92',
  '#FF6871', '#FFE471', '#53C7C1', '#205D67', '#F7FBF5',
  '#F4B6A8', '#B8E3D7', '#A8D4E8', '#C6B8E8',
];

export default function PaintScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [selectedColor, setSelectedColor] = useState(FAVORITE_COLORS[0]);
  const [tool, setTool] = useState<Tool>('marker');
  const [thickness, setThickness] = useState(14);
  const [showColors, setShowColors] = useState(false);
  const [scrollMode, setScrollMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clearedStrokes, setClearedStrokes] = useState<Stroke[] | null>(null);
  const canvasHeight = Math.max(280, height - insets.top - insets.bottom - 222);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          try {
            setStrokes(JSON.parse(stored) as Stroke[]);
          } catch {
            setStrokes([]);
          }
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (isLoaded) {
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(strokes));
    }
  }, [isLoaded, strokes]);

  const strokeOpacity = tool === 'marker' ? 1 : tool === 'watercolor' ? 0.2 : 0.58;
  const strokeWidth =
    tool === 'marker'
      ? thickness
      : tool === 'watercolor'
        ? Math.max(12, thickness * 1.35)
        : Math.max(2, thickness * 0.45);
  const canvasBackground = '#F7FBF5';

  const finishStroke = () => {
    if (currentStroke.length > 1) {
      setClearedStrokes(null);
      setStrokes((previous) => [
        ...previous,
        { points: currentStroke, color: selectedColor, width: strokeWidth, opacity: strokeOpacity, tool },
      ]);
      void Haptics.selectionAsync();
    }
    setCurrentStroke([]);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          setCurrentStroke([{ x: event.nativeEvent.locationX, y: event.nativeEvent.locationY }]);
        },
        onPanResponderMove: (event) => {
          setCurrentStroke((points) => [
            ...points,
            { x: event.nativeEvent.locationX, y: event.nativeEvent.locationY },
          ]);
        },
        onPanResponderRelease: finishStroke,
        onPanResponderTerminate: finishStroke,
      }),
    [currentStroke, finishStroke],
  );

  const clearCanvas = () => {
    if (strokes.length === 0) return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setClearedStrokes(strokes);
    setStrokes([]);
  };

  const undoClear = () => {
    if (!clearedStrokes) return;
    void Haptics.selectionAsync();
    setStrokes(clearedStrokes);
    setClearedStrokes(null);
  };

  const renderStroke = (stroke: Stroke, index: number) => (
    <StrokeVisual
      key={`stroke-${index}`}
      points={stroke.points}
      color={stroke.color}
      width={stroke.width}
      opacity={stroke.opacity}
      tool={stroke.tool}
    />
  );

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { paddingTop: insets.top + 56 }]}>
        <Pressable
          testID="paint-back"
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-back" size={24} color="#205D67" />
        </Pressable>
        <View style={styles.topTitle}>
          <Text style={styles.screenTitle}>Color studio</Text>
        </View>
        <Pressable
          testID="paint-clear"
          accessibilityRole="button"
          accessibilityLabel={clearedStrokes ? 'Undo clear picture' : 'Clear picture'}
          onPress={clearedStrokes ? undoClear : clearCanvas}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        >
          <Ionicons name={clearedStrokes ? 'arrow-undo' : 'trash-outline'} size={20} color="#7E8A92" />
        </Pressable>
      </View>

      <View style={[styles.canvasViewport, { height: canvasHeight }]}>
        <ScrollView
          style={styles.canvasScroll}
          contentContainerStyle={{ minHeight: canvasHeight * 2 }}
          scrollEnabled={scrollMode}
          showsVerticalScrollIndicator={scrollMode}
          bounces={scrollMode}
        >
          <View
            testID="paint-canvas"
            style={[styles.canvas, { height: canvasHeight * 2, backgroundColor: canvasBackground }]}
            {...(scrollMode ? {} : panResponder.panHandlers)}
          >
            <Svg height={canvasHeight * 2} width={width}>
              {strokes.map(renderStroke)}
              {currentStroke.length > 1 && (
                <StrokeVisual
                  points={currentStroke}
                  color={selectedColor}
                  width={strokeWidth}
                  opacity={strokeOpacity}
                  tool={tool}
                />
              )}
            </Svg>
            {strokes.length === 0 && currentStroke.length === 0 && (
              <View pointerEvents="none" style={styles.canvasHint}>
                <Ionicons name="color-wand-outline" size={26} color="#D6CEC2" />
                <Text style={styles.canvasHintText}>Draw something wonderful</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <View style={[styles.toolbar, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.colorRow}>
          <View style={styles.colorChoices}>
            {FAVORITE_COLORS.map((color) => (
              <Pressable
                key={color}
                testID={`paint-color-${color}`}
                accessibilityRole="button"
                accessibilityLabel={`Choose ${color}`}
                onPress={() => setSelectedColor(color)}
                style={({ pressed }) => [
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorButtonSelected,
                  pressed && styles.colorPressed,
                ]}
              />
            ))}
            <Pressable
              testID="paint-color-picker"
              accessibilityRole="button"
              accessibilityLabel="Open all colors"
              onPress={() => setShowColors(true)}
              style={({ pressed }) => [styles.addColorButton, pressed && styles.colorPressed]}
            >
              <Ionicons name="add" size={23} color="#7E8A92" />
            </Pressable>
          </View>
        </View>

        <View style={styles.controlsRow}>
          <View style={styles.toolChoice}>
            <View style={styles.segmented}>
              <Pressable
                testID="paint-tool-marker"
                accessibilityRole="button"
                accessibilityLabel="Marker tool"
                onPress={() => {
                  setTool('marker');
                  setThickness((size) => Math.max(size, 10));
                }}
                style={({ pressed }) => [
                  styles.segment,
                  tool === 'marker' && styles.segmentSelected,
                  pressed && styles.segmentPressed,
                ]}
              >
                <Ionicons name={tool === 'marker' ? "brush" : "brush-outline"} size={22} color={tool === 'marker' ? '#205D67' : '#9AA29E'} />
              </Pressable>
              <Pressable
                testID="paint-tool-pen"
                accessibilityRole="button"
                accessibilityLabel="Pen tool"
                onPress={() => {
                  setTool('pen');
                  setThickness((size) => Math.min(size, 10));
                }}
                style={({ pressed }) => [
                  styles.segment,
                  tool === 'pen' && styles.segmentSelected,
                  pressed && styles.segmentPressed,
                ]}
              >
                <Ionicons name={tool === 'pen' ? "pencil" : "pencil-outline"} size={22} color={tool === 'pen' ? '#205D67' : '#9AA29E'} />
              </Pressable>
              <Pressable
                testID="paint-tool-watercolor"
                accessibilityRole="button"
                accessibilityLabel="Watercolor brush"
                onPress={() => {
                  setTool('watercolor');
                  setThickness((size) => Math.max(size, 14));
                }}
                style={({ pressed }) => [
                  styles.segment,
                  tool === 'watercolor' && styles.segmentSelected,
                  pressed && styles.segmentPressed,
                ]}
              >
                <Ionicons name={tool === 'watercolor' ? "water" : "water-outline"} size={21} color={tool === 'watercolor' ? '#205D67' : '#9AA29E'} />
              </Pressable>
            </View>
          </View>
          <View style={styles.sizeChoice}>
            <View style={styles.sizeRow}>
              {[6, 14, 22].map((size) => (
                <Pressable
                  key={size}
                  testID={`paint-size-${size}`}
                  accessibilityRole="button"
                  accessibilityLabel={`${size} pixel stroke`}
                  onPress={() => setThickness(size)}
                  style={[styles.sizeButton, thickness === size && styles.sizeButtonSelected]}
                >
                  <View style={[styles.sizeDot, { height: size / 1.5, width: size / 1.5, backgroundColor: selectedColor }]} />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </View>

      <Modal
        transparent
        visible={showColors}
        animationType="fade"
        onRequestClose={() => setShowColors(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setShowColors(false)}>
          <Pressable style={styles.colorModal} onPress={(event) => event.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pick a color</Text>
              <Pressable
                testID="paint-close-picker"
                accessibilityRole="button"
                accessibilityLabel="Close color picker"
                onPress={() => setShowColors(false)}
              >
                <Ionicons name="close" size={23} color="#7E8A92" />
              </Pressable>
            </View>
            <View style={styles.colorGrid}>
              {COLOR_GRID.map((color) => (
                <Pressable
                  key={color}
                  testID={`paint-grid-color-${color}`}
                  accessibilityRole="button"
                  accessibilityLabel={`Choose ${color}`}
                  onPress={() => {
                    setSelectedColor(color);
                    setShowColors(false);
                  }}
                  style={[styles.gridColor, { backgroundColor: color }, selectedColor === color && styles.gridColorSelected]}
                />
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function StrokeVisual({
  points,
  color,
  width,
  opacity,
  tool,
}: {
  points: Point[];
  color: string;
  width: number;
  opacity: number;
  tool?: Tool;
}) {
  const pointString = points.map((point) => `${point.x},${point.y}`).join(' ');
  if (tool !== 'watercolor') {
    return (
      <Polyline
        points={pointString}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={opacity}
        strokeWidth={width}
      />
    );
  }

  return (
    <>
      <Polyline points={pointString} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={0.08} strokeWidth={width * 1.8} />
      <Polyline points={pointString} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={0.14} strokeWidth={width * 1.35} />
      <Polyline points={pointString} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={0.1} strokeWidth={width * 0.82} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 67,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E9DFD2',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  topTitle: { flex: 1, marginLeft: 13, minWidth: 0 },
  screenTitle: { color: '#205D67', fontFamily: 'Inter_700Bold', fontSize: 20 },
  pressed: { opacity: 0.6 },
  canvasViewport: { borderBottomColor: '#E9DFD2', borderBottomWidth: 1, overflow: 'hidden' },
  canvasScroll: { flex: 1 },
  canvas: { overflow: 'hidden', position: 'relative' },
  canvasHint: {
    alignItems: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: '43%',
  },
  canvasHintText: { color: '#D6CEC2', fontFamily: 'Inter_500Medium', fontSize: 14, marginTop: 10 },
  toolbar: {
    backgroundColor: '#F7FBF5',
    borderTopColor: '#E9DFD2',
    borderTopWidth: 1,
    paddingHorizontal: 18,
    paddingTop: 11,
  },
  colorRow: { alignItems: 'center', flexDirection: 'row', marginBottom: 14 },
  colorChoices: { alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  colorButton: { borderColor: '#FFFFFF', borderRadius: 16, borderWidth: 2, height: 30, width: 30 },
  colorButtonSelected: { borderColor: '#205D67', borderWidth: 3, transform: [{ scale: 1.12 }] },
  colorPressed: { opacity: 0.72 },
  addColorButton: { alignItems: 'center', borderColor: '#CFC5B8', borderRadius: 16, borderStyle: 'dashed', borderWidth: 1.5, height: 30, justifyContent: 'center', width: 30 },
  controlsRow: { alignItems: 'flex-end', flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  toolChoice: { flex: 1 },
  segmented: { backgroundColor: '#F1E9DF', borderRadius: 17, flexDirection: 'row', padding: 3, width: 164 },
  segment: { alignItems: 'center', borderRadius: 14, flex: 1, flexDirection: 'row', gap: 4, justifyContent: 'center', paddingVertical: 7 },
  segmentSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#205D67',
    borderWidth: 1,
    shadowColor: '#205D67',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentPressed: { opacity: 0.7, transform: [{ scale: 0.96 }] },
  sizeChoice: { alignItems: 'flex-end' },
  sizeRow: { flexDirection: 'row', gap: 5 },
  sizeButton: { alignItems: 'center', backgroundColor: '#F1E9DF', borderRadius: 15, height: 30, justifyContent: 'center', width: 30 },
  sizeButtonSelected: { backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderWidth: 1 },
  sizeDot: { borderRadius: 12 },
  modalBackdrop: { alignItems: 'center', backgroundColor: 'rgba(36,49,61,0.28)', flex: 1, justifyContent: 'flex-end' },
  colorModal: { backgroundColor: '#F7FBF5', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 36, width: '100%' },
  modalHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { color: '#205D67', fontFamily: 'Inter_700Bold', fontSize: 20 },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridColor: { borderColor: '#FFFFFF', borderRadius: 19, borderWidth: 2, height: 38, width: 38 },
  gridColorSelected: { borderColor: '#205D67', borderWidth: 3 },
});