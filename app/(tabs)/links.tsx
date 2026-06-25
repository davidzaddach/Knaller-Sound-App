import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LinkCard from '../../components/LinkCard';
import { socialLinks, musicLinks } from '../../data/links';
import SwipeableScreen from '../../components/SwipeableScreen';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';

function openSpotify(_uri: string, fallbackUrl: string) {
  Linking.openURL(fallbackUrl);
}

export default function LinksScreen() {
  return (
    <SwipeableScreen currentRoute="/links">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView edges={['top']}>
          <Text style={styles.header}>MUSIK & LINKS 🎶</Text>
          <Text style={styles.subtitle}>Streaming & Social Media</Text>

          <Text style={[styles.sectionTitle, { color: Colors.secondary }]}>Musik auf Spotify</Text>
          {musicLinks.map((link) => (
            <TouchableOpacity
              key={link.id}
              style={styles.musicCard}
              onPress={() => openSpotify(link.spotifyUri, link.spotifyUrl)}
              activeOpacity={0.7}
            >
              <View style={styles.musicCover}>
                <Text style={styles.musicEmoji}>{link.coverEmoji}</Text>
              </View>
              <View style={styles.musicInfo}>
                <Text style={styles.musicTitle}>{link.title}</Text>
                <Text style={styles.musicSubtitle}>{link.subtitle}</Text>
              </View>
              <View style={styles.spotifyBadge}>
                <Ionicons name="play" size={16} color="#1DB954" />
              </View>
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: Spacing.lg, color: Colors.secondary }]}>
            Social Media
          </Text>
          {socialLinks.map((link) => (
            <LinkCard
              key={link.id}
              platform={link.platform}
              label={link.label}
              url={link.url}
              icon={link.icon}
              color={link.color}
            />
          ))}
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
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
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
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  musicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  musicCover: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicEmoji: {
    fontSize: 24,
  },
  musicInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  musicTitle: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  musicSubtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  spotifyBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(29, 185, 84, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
