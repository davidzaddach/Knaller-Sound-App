import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SwipeableScreen from '../../components/SwipeableScreen';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';


export default function HomeScreen() {
  const router = useRouter();

  return (
    <SwipeableScreen currentRoute="/">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.hero}>
            <View style={styles.heroImageContainer}>
              <Text style={styles.heroEmoji}>💥</Text>
              <View style={styles.sparkle1}><Text style={styles.sparkleEmoji}>✨</Text></View>
              <View style={styles.sparkle2}><Text style={styles.sparkleEmoji}>🔥</Text></View>
              <View style={styles.sparkle3}><Text style={styles.sparkleEmoji}>💫</Text></View>
            </View>
            <Text style={styles.appName}>KNALLER</Text>
            <Text style={styles.appNameSub}>SOUND APP</Text>
            <Text style={styles.tagline}>Reggae. Dancehall. Vibes. ⚡</Text>
          </View>

          <View style={styles.bioCard}>
            <Text style={[styles.sectionTitle, { color: Colors.secondary }]}>Willkommen!</Text>
            <Text style={styles.bioText}>
              Dein Knaller Soundboard mit den heftigsten Reggae & Dancehall 
              Sounds! Sirenen, Alarme, Airhorns und mehr -- alles was du 
              brauchst, um die Party zu starten! 🏖️🎶
            </Text>

            <Text style={[styles.sectionTitle, { color: Colors.secondary, marginTop: Spacing.md }]}>Neueste Single</Text>
            <TouchableOpacity
              style={styles.releaseCard}
              onPress={() => {
                Linking.openURL('https://open.spotify.com/album/488lsEklK9nq10SGajLkTc');
              }}
              activeOpacity={0.7}
            >
              <View style={styles.releaseCover}>
                <Text style={styles.releaseEmoji}>💥</Text>
              </View>
              <View style={styles.releaseInfo}>
                <Text style={styles.releaseTitle}>Shit ist Knaller</Text>
                <Text style={styles.releaseSubtitle}>Jetzt auf Spotify streamen</Text>
              </View>
              <Ionicons name="play" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <TouchableOpacity style={styles.stat} onPress={() => router.push('/soundboard' as never)} activeOpacity={0.7}>
              <Text style={styles.statNumber}>🔊</Text>
              <Text style={styles.statLabel}>15 Sounds</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity style={styles.stat} onPress={() => router.push('/videos' as never)} activeOpacity={0.7}>
              <Text style={styles.statNumber}>🎬</Text>
              <Text style={styles.statLabel}>Videos</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity style={styles.stat} onPress={() => router.push('/events' as never)} activeOpacity={0.7}>
              <Text style={styles.statNumber}>🌴</Text>
              <Text style={styles.statLabel}>Shows</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SwipeableScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  hero: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  heroImageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 4,
    borderColor: Colors.secondary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  heroEmoji: {
    fontSize: 80,
  },
  sparkle1: {
    position: 'absolute',
    top: -8,
    right: -4,
  },
  sparkle2: {
    position: 'absolute',
    bottom: -4,
    left: -8,
  },
  sparkle3: {
    position: 'absolute',
    top: 10,
    left: -12,
  },
  sparkleEmoji: {
    fontSize: 24,
  },
  appName: {
    fontSize: FontSize.hero,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 6,
    marginBottom: -4,
  },
  appNameSub: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.secondary,
    letterSpacing: 8,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSize.xl,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  bioCard: {
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  bioText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 22,
  },
  latestRelease: {
    marginHorizontal: Spacing.md,
  },
  releaseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  releaseCover: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  releaseEmoji: {
    fontSize: 28,
  },
  releaseInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  releaseTitle: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  releaseSubtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
});
