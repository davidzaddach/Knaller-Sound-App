import { TouchableOpacity, Text, View, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface LinkCardProps {
  platform: string;
  label: string;
  url: string;
  icon: string;
  color: string;
}

export default function LinkCard({ platform, label, url, icon, color }: LinkCardProps) {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons
          name={icon as React.ComponentProps<typeof Ionicons>['name']}
          size={24}
          color="#ffffff"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.platform}>{platform}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  platform: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
});
