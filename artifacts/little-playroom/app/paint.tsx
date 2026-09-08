import React, { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
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
type Stroke = { points: Point[]; color: string; width: number; opacity: number };
type Tool = 'pen' | 'marker';

const STORAGE_KEY = 'little-playroom-paint-strokes';
const FAVORITE_COLORS = ['#F16E61', '#F0A83C', '#F6D65B', '#7DC7B6', '#6DB7D8', '#8F7BC7', '#24313D'];
const COLOR_GRID = [
  '#F16E61', '#EF8A5B', '#F0A83C', '#F6D65B', '#C9D84B',
  '#7DC7B6', '#58B8A4', '#6DB7D8', '#5F93D2', '#8F7BC7',
  '#D578A6', '#E86A82', '#8F6F5D', '#24313D', '#7E8A92',
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
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasHeight = Math.max(280, height - insets.top - insets.bottom - 194);

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

  const strokeOpacity = tool === 'marker' ? 1 : 0.58;
  const strokeWidth = tool === 'marker' ? thickness : Math.max(2, thickness * 0.45);
  const canvasBackground = '#FFFEFB';

  const finishStroke = () => {
    if (currentStroke.length > 1) {
      setStrokes((previous) => [
        ...previous,
        { points: currentStroke, color: selectedColor, width: strokeWidth, opacity: strokeOpacity },
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
    setStrokes([]);
  };

  const renderStroke = (stroke: Stroke, index: number) => (
    <Polyline
      key={`stroke-${index}`}
      points={stroke.points.map((point) => `${point.x},${point.y}`).join(' ')}
      fill="none"
      stroke={stroke.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={stroke.opacity}
      strokeWidth={stroke.width}
    />
  );

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Pressable
          testID="paint-back"
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-back" size={24} color="#24313D" />
        </Pressable>
        <View style={styles.topTitle}>
          <Text style={styles.screenEyebrow}>COLOR STUDIO</Text>
          <Text style={styles.screenTitle}>Make a picture</Text>
        </View>
        <Pressable
          testID="paint-clear"
          accessibilityRole="button"
          accessibilityLabel="Clear picture"
          onPress={clearCanvas}
          style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
        >
          <Ionicons name="refresh-outline" size={19} color="#7E8A92" />
          <Text style={styles.clearText}>Clear</Text>
        </Pressable>
      </View>

      <View
        testID="paint-canvas"
        style={[styles.canvas, { height: canvasHeight, backgroundColor: canvasBackground }]}
        {...panResponder.panHandlers}
      >
        <Svg height={canvasHeight} width={width}>
          {strokes.map(renderStroke)}
          {currentStroke.length > 1 && (
            <Polyline
              points={currentStroke.map((point) => `${point.x},${point.y}`).join(' ')}
              fill="none"
              stroke={selectedColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity={strokeOpacity}
              strokeWidth={strokeWidth}
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

      <View style={[styles.toolbar, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.colorRow}>
          <Text style={styles.toolLabel}>Colors</Text>
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
            <Text style={styles.toolLabel}>Tool</Text>
            <View style={styles.segmented}>
              <Pressable
                testID="paint-tool-marker"
                accessibilityRole="button"
                accessibilityLabel="Marker tool"
                onPress={() => {
                  setTool('marker');
                  setThickness((size) => Math.max(size, 10));
                }}
                style={[styles.segment, tool === 'marker' && styles.segmentSelected]}
              >
                <Ionicons name="brush-outline" size={19} color={tool === 'marker' ? '#24313D' : '#9AA29E'} />
                <Text style={[styles.segmentText, tool === 'marker' && styles.segmentTextSelected]}>Marker</Text>
              </Pressable>
              <Pressable
                testID="paint-tool-pen"
                accessibilityRole="button"
                accessibilityLabel="Pen tool"
                onPress={() => {
                  setTool('pen');
                  setThickness((size) => Math.min(size, 10));
                }}
                style={[styles.segment, tool === 'pen' && styles.segmentSelected]}
              >
                <Ionicons name="pencil-outline" size={19} color={tool === 'pen' ? '#24313D' : '#9AA29E'} />
                <Text style={[styles.segmentText, tool === 'pen' && styles.segmentTextSelected]}>Pen</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.sizeChoice}>
            <Text style={styles.toolLabel}>Size</Text>
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
  screenEyebrow: {
    color: '#B4A99C',
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.4,
    marginBottom: 4,
  },
  screenTitle: { color: '#24313D', fontFamily: 'Inter_700Bold', fontSize: 20 },
  clearButton: { alignItems: 'center', flexDirection: 'row', gap: 5, padding: 8 },
  clearText: { color: '#7E8A92', fontFamily: 'Inter_500Medium', fontSize: 13 },
  pressed: { opacity: 0.6 },
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
    backgroundColor: '#FFF9F1',
    borderTopColor: '#E9DFD2',
    borderTopWidth: 1,
    paddingHorizontal: 18,
    paddingTop: 11,
  },
  colorRow: { alignItems: 'center', flexDirection: 'row', marginBottom: 11 },
  toolLabel: { color: '#9AA29E', fontFamily: 'Inter_600SemiBold', fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' },
  colorChoices: { alignItems: 'center', flex: 1, flexDirection: 'row', gap: 10, justifyContent: 'flex-end' },
  colorButton: { borderColor: '#FFFFFF', borderRadius: 16, borderWidth: 2, height: 30, width: 30 },
  colorButtonSelected: { borderColor: '#24313D', borderWidth: 3, transform: [{ scale: 1.12 }] },
  colorPressed: { opacity: 0.72 },
  addColorButton: { alignItems: 'center', borderColor: '#CFC5B8', borderRadius: 16, borderStyle: 'dashed', borderWidth: 1.5, height: 30, justifyContent: 'center', width: 30 },
  controlsRow: { alignItems: 'flex-end', flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  toolChoice: { flex: 1 },
  segmented: { backgroundColor: '#F1E9DF', borderRadius: 17, flexDirection: 'row', marginTop: 6, padding: 3, width: 148 },
  segment: { alignItems: 'center', borderRadius: 14, flex: 1, flexDirection: 'row', gap: 4, justifyContent: 'center', paddingVertical: 7 },
  segmentSelected: { backgroundColor: '#FFFFFF' },
  segmentText: { color: '#9AA29E', fontFamily: 'Inter_500Medium', fontSize: 12 },
  segmentTextSelected: { color: '#24313D', fontFamily: 'Inter_600SemiBold' },
  sizeChoice: { alignItems: 'flex-end' },
  sizeRow: { flexDirection: 'row', gap: 5, marginTop: 6 },
  sizeButton: { alignItems: 'center', backgroundColor: '#F1E9DF', borderRadius: 15, height: 30, justifyContent: 'center', width: 30 },
  sizeButtonSelected: { backgroundColor: '#FFFFFF', borderColor: '#E9DFD2', borderWidth: 1 },
  sizeDot: { borderRadius: 12 },
  modalBackdrop: { alignItems: 'center', backgroundColor: 'rgba(36,49,61,0.28)', flex: 1, justifyContent: 'flex-end' },
  colorModal: { backgroundColor: '#FFF9F1', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 36, width: '100%' },
  modalHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { color: '#24313D', fontFamily: 'Inter_700Bold', fontSize: 20 },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  gridColor: { borderColor: '#FFFFFF', borderRadius: 24, borderWidth: 2, height: 46, width: 46 },
  gridColorSelected: { borderColor: '#24313D', borderWidth: 4 },
});