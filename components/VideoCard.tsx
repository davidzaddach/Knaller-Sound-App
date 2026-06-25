import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Video } from '../data/videos';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.playerWrapper}>
        <YoutubePlayer
          height={210}
          videoId={video.youtubeId}
          play={playing}
          onChangeState={(state: string) => {
            if (state === 'ended') setPlaying(false);
          }}
          webViewProps={{
            allowsInlineMediaPlayback: true,
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.info}
        onPress={() => setPlaying(!playing)}
        activeOpacity={0.8}
      >
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.description}>{video.description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  playerWrapper: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  info: {
    padding: Spacing.md,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
});
