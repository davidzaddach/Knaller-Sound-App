import { useRef, type ReactNode } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const TAB_ORDER = ['/', '/soundboard', '/videos', '/links', '/events'];
const SWIPE_THRESHOLD = 50;
const SWIPE_VELOCITY = 0.3;

interface SwipeableScreenProps {
  children: ReactNode;
  currentRoute: string;
}

export default function SwipeableScreen({ children, currentRoute }: SwipeableScreenProps) {
  const router = useRouter();
  const currentIndex = TAB_ORDER.indexOf(currentRoute);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 15;
      },
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderRelease: (_, gestureState) => {
        const { dx, vx } = gestureState;
        const isSwipe = Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(vx) > SWIPE_VELOCITY;

        if (!isSwipe) return;

        if (dx < 0 && currentIndex < TAB_ORDER.length - 1) {
          router.push(TAB_ORDER[currentIndex + 1] as never);
        } else if (dx > 0 && currentIndex > 0) {
          router.push(TAB_ORDER[currentIndex - 1] as never);
        }
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
