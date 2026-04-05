import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { HABITS } from '../habits';
import { relativeDayLabel } from '../lib/date';
import { useAppTheme, withAlpha } from '../theme';

function DaySummaryRow({ entry }) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      <View style={styles.leading}>
        <Text style={styles.dayLabel}>{relativeDayLabel(entry.date)}</Text>
        <Text style={styles.totalLabel}>{entry.totalCount} logs</Text>
      </View>
      <View style={styles.counts}>
        {HABITS.map((habit) => (
          <View
            key={habit.id}
            style={[styles.countPill, { backgroundColor: withAlpha(habit.accent, 0.14) }]}
          >
            <Text style={styles.countIcon}>{habit.icon}</Text>
            <Text style={styles.countValue}>{entry.totals[habit.id] || 0}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default memo(DaySummaryRow);

function createStyles(colors) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    },
    leading: {
      flex: 1,
    },
    dayLabel: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 15,
      color: colors.paper,
    },
    totalLabel: {
      marginTop: 4,
      fontFamily: 'Manrope_400Regular',
      fontSize: 12,
      color: colors.mutedText,
    },
    counts: {
      flexDirection: 'row',
      gap: 8,
    },
    countPill: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 999,
      paddingHorizontal: 8,
      paddingVertical: 6,
      gap: 5,
    },
    countIcon: {
      fontSize: 14,
    },
    countValue: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 12,
      color: colors.paper,
    },
  });
}
