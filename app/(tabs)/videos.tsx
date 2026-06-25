import { Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from '../../components/VideoCard';
import { videos } from '../../data/videos';
import SwipeableScreen from '../../components/SwipeableScreen';
import { Colors, Spacing, FontSize } from '../../constants/theme';

export default function VideosScreen() {
  return (
    <SwipeableScreen currentRoute="/videos">
      <SafeAreaView edges={['top']} style={styles.safe}>
        <Text style={styles.header}>VIDEOS 🎬</Text>
        <Text style={styles.subtitle}>{videos.length} Videos</Text>

        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <VideoCard video={item} />
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
  list: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
});
