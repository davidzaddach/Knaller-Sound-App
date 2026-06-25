import { useRef, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { Audio } from 'expo-av';
import { Sound as SoundType } from '../data/sounds';
import { Colors, BorderRadius, FontSize, Spacing } from '../constants/theme';

interface SoundPadProps {
  sound: SoundType;
}

export default function SoundPad({ sound }: SoundPadProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Audio.Sound | null>(null);

  const playSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound: audioSound } = await Audio.Sound.createAsync(
        getSoundFile(sound.id),
        { shouldPlay: true }
      );
      soundRef.current = audioSound;
      setIsPlaying(true);

      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 0.9,
          useNativeDriver: true,
          speed: 50,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
        }),
      ]).start();

      audioSound.setOnPlaybackStatusUpdate((status) => {
        if ('didJustFinish' in status && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.pad,
          { borderColor: sound.color, shadowColor: sound.color },
          isPlaying && styles.padActive,
        ]}
        onPress={playSound}
        activeOpacity={0.7}
      >
        <Text style={styles.emoji}>{sound.emoji}</Text>
        <Text style={[styles.label, { color: sound.color }]}>{sound.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function getSoundFile(id: string) {
  const soundFiles: Record<string, ReturnType<typeof require>> = {
    airhorn: require('../assets/sounds/airhorn.mp3'),
    siren: require('../assets/sounds/siren.mp3'),
    alarm: require('../assets/sounds/alarm.mp3'),
    gun_shot: require('../assets/sounds/gun_shot.mp3'),
    dj_rewind: require('../assets/sounds/dj_rewind.mp3'),
    pullup: require('../assets/sounds/pullup.mp3'),
    bass_drop: require('../assets/sounds/bass_drop.mp3'),
    reggae_horn: require('../assets/sounds/reggae_horn.mp3'),
    dancehall: require('../assets/sounds/dancehall.mp3'),
    crowd: require('../assets/sounds/crowd.mp3'),
    explosion: require('../assets/sounds/explosion.mp3'),
    whistle: require('../assets/sounds/whistle.mp3'),
    foghorn: require('../assets/sounds/foghorn.mp3'),
    lion_roar: require('../assets/sounds/lion_roar.mp3'),
    dubplate: require('../assets/sounds/dubplate.mp3'),
  };
  return soundFiles[id];
}

const styles = StyleSheet.create({
  pad: {
    aspectRatio: 1,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  padActive: {
    opacity: 0.9,
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 10,
  },
  emoji: {
    fontSize: FontSize.xxl,
    marginBottom: Spacing.xs,
  },
  label: {
    color: '#ffffff',
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
