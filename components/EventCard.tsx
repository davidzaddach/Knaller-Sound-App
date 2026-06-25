import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Event } from '../data/events';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface EventCardProps {
  event: Event;
}

function formatDate(dateStr: string): { day: string; month: string; weekday: string } {
  const date = new Date(dateStr + 'T00:00:00');
  const day = date.getDate().toString().padStart(2, '0');
  const months = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'];
  const weekdays = ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'];
  return {
    day,
    month: months[date.getMonth()],
    weekday: weekdays[date.getDay()],
  };
}

export default function EventCard({ event }: EventCardProps) {
  const { day, month, weekday } = formatDate(event.date);

  const handleTicket = () => {
    if (event.ticketUrl) {
      Linking.openURL(event.ticketUrl);
    }
  };

  return (
    <View style={[styles.card, event.soldOut && styles.cardSoldOut]}>
      <View style={styles.dateBox}>
        <Text style={styles.dateMonth}>{month}</Text>
        <Text style={styles.dateDay}>{day}</Text>
        <Text style={styles.dateWeekday}>{weekday}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.venue}>{event.venue}</Text>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.city}>{event.city}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.time}>{event.time} Uhr</Text>
        </View>
      </View>

      {event.ticketUrl && (
        <TouchableOpacity
          style={[styles.ticketButton, event.soldOut && styles.ticketSoldOut]}
          onPress={handleTicket}
          disabled={event.soldOut}
          activeOpacity={0.7}
        >
          <Text style={styles.ticketText}>
            {event.soldOut ? 'Ausverkauft' : 'Tickets'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
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
    borderColor: Colors.accent,
  },
  cardSoldOut: {
    opacity: 0.6,
  },
  dateBox: {
    width: 56,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  dateMonth: {
    color: '#ffffff',
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 1,
  },
  dateDay: {
    color: '#ffffff',
    fontSize: FontSize.xl,
    fontWeight: '800',
    lineHeight: 28,
  },
  dateWeekday: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: '600',
  },
  info: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  venue: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '700',
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  city: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginLeft: 4,
  },
  time: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginLeft: 4,
  },
  ticketButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  ticketSoldOut: {
    backgroundColor: Colors.textMuted,
  },
  ticketText: {
    color: '#ffffff',
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
