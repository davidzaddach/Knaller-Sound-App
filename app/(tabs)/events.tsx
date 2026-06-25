import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../../components/EventCard';
import { events } from '../../data/events';
import SwipeableScreen from '../../components/SwipeableScreen';
import { Colors, Spacing, FontSize } from '../../constants/theme';

export default function EventsScreen() {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const upcomingCount = sortedEvents.filter((e) => !e.soldOut).length;

  return (
    <SwipeableScreen currentRoute="/events">
      <SafeAreaView edges={['top']} style={styles.safe}>
        <Text style={styles.header}>LIVE 🌴</Text>
        <Text style={styles.subtitle}>
          {upcomingCount} Auftritte verfügbar
        </Text>

        <FlatList
          data={sortedEvents}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <EventCard event={item} />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                Keine Auftritte geplant
              </Text>
            </View>
          }
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
  empty: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
  },
});
