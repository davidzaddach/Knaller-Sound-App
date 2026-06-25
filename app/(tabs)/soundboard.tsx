import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { useEffect } from 'react';
import SoundPad from '../../components/SoundPad';
import { sounds } from '../../data/sounds';
import SwipeableScreen from '../../components/SwipeableScreen';
import { Colors, Spacing, FontSize } from '../../constants/theme';

export default function SoundboardScreen() {
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
  }, []);

  return (
    <SwipeableScreen currentRoute="/soundboard">
      <SafeAreaView edges={['top']} style={styles.safe}>
        <Text style={styles.header}>KNALLER BOARD</Text>
        <Text style={styles.subtitle}>Tap to play ⚡🔮</Text>

        <FlatList
          data={sounds}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.padContainer}>
              <SoundPad sound={item} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SwipeableScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
  },
  header: {
    fontSize: FontSize.xxl,
    fontWeight: '900',
    color: Colors.primary,
    textAlign: 'center',
    letterSpacing: 4,
    marginTop: Spacing.md,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  grid: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  padContainer: {
    width: '31%',
  },
});
