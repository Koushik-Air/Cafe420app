import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import HabitActionCard from '../components/HabitActionCard';
import LiveClockCard from '../components/LiveClockCard';
import SectionCard from '../components/SectionCard';
import DaySummaryRow from '../components/DaySummaryRow';
import { HABITS } from '../habits';
import { useAppTheme } from '../theme';

export default function DashboardScreen({
  summary,
  isSaving,
  onLogHabit,
  onUndoLatest,
}) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <LiveClockCard />

      <View style={styles.sectionSpacing} />

      <View style={styles.totalCard}>
        <View style={styles.totalHeader}>
          <Text style={styles.totalTitle}>Total</Text>
          <Text style={styles.totalCount}>{summary.totalLogs}</Text>
        </View>

        <View style={styles.metricsRow}>
          {HABITS.map((habit) => (
            <View key={habit.id} style={styles.totalItem}>
              <Text style={styles.totalItemValue}>
                {summary.habitTotals[habit.id] || 0}
              </Text>
              <Text numberOfLines={1} style={styles.totalItemLabel}>
                {habit.shortLabel || habit.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sectionSpacing} />

      <View style={styles.cardRow}>
        {HABITS.map((habit) => (
          <View key={habit.id} style={styles.cardSlot}>
            <HabitActionCard
              compact
              habit={habit}
              countToday={summary.todayTotals[habit.id] || 0}
              isSaving={isSaving}
              onLog={() => onLogHabit(habit.id)}
              onUndo={() => onUndoLatest(habit.id)}
            />
          </View>
        ))}
      </View>

      <View style={styles.sectionSpacing} />

      <SectionCard
        title="Week"
      >
        <View style={styles.summaryList}>
          {summary.weeklyEntries.map((entry) => (
            <DaySummaryRow key={entry.dayKey} entry={entry} />
          ))}
        </View>
      </SectionCard>
    </ScrollView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    scroll: {
      flex: 1,
    },
    content: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 120,
    },
    totalCard: {
      backgroundColor: colors.surface,
      borderRadius: 22,
      paddingHorizontal: 14,
      paddingVertical: 13,
      borderWidth: 1,
      borderColor: colors.line,
    },
    totalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 10,
    },
    totalTitle: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 17,
      lineHeight: 20,
      color: colors.paper,
      letterSpacing: -0.2,
    },
    totalCount: {
      fontFamily: 'Manrope_800ExtraBold',
      fontSize: 22,
      lineHeight: 24,
      color: colors.paper,
      letterSpacing: -0.8,
    },
    metricsRow: {
      flexDirection: 'row',
      gap: 8,
    },
    totalItem: {
      flex: 1,
      minWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 2,
    },
    totalItemLabel: {
      fontFamily: 'sans-serif-condensed',
      fontWeight: '700',
      fontSize: 12,
      lineHeight: 14,
      color: colors.mutedText,
      marginTop: 4,
      letterSpacing: 0.2,
      textAlign: 'center',
    },
    totalItemValue: {
      fontFamily: 'Manrope_800ExtraBold',
      fontSize: 26,
      lineHeight: 28,
      color: colors.paper,
      letterSpacing: -0.8,
      textAlign: 'center',
    },
    cardRow: {
      flexDirection: 'row',
      gap: 10,
    },
    cardSlot: {
      flex: 1,
      minWidth: 0,
    },
    summaryList: {
      gap: 12,
    },
    sectionSpacing: {
      height: 12,
    },
  });
}
