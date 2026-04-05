import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import HabitActionCard from '../components/HabitActionCard';
import MetricCard from '../components/MetricCard';
import SectionCard from '../components/SectionCard';
import DaySummaryRow from '../components/DaySummaryRow';
import { HABITS } from '../habits';
import { formatLongDate } from '../lib/date';
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
      <SectionCard
        title={formatLongDate(new Date())}
        subtitle="Fast thumb-friendly tracking with a bright layout and a one-tap switch to AMOLED dark."
        rightSlot={
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreValue}>{summary.todayTotalCount}</Text>
            <Text style={styles.scoreLabel}>today</Text>
          </View>
        }
      >
        <View style={styles.metricsRow}>
          <MetricCard label="Current streak" value={`${summary.streak} days`} />
          <MetricCard label="Active days" value={String(summary.activeDays)} tone={colors.blue} />
          <MetricCard
            label="Daily average"
            value={summary.averageDailyLogs}
            tone={colors.orange}
          />
        </View>
      </SectionCard>

      <View style={styles.sectionSpacing} />

      <View style={styles.cardStack}>
        {HABITS.map((habit) => (
          <HabitActionCard
            key={habit.id}
            habit={habit}
            countToday={summary.todayTotals[habit.id] || 0}
            isSaving={isSaving}
            onLog={() => onLogHabit(habit.id)}
            onUndo={() => onUndoLatest(habit.id)}
          />
        ))}
      </View>

      <View style={styles.sectionSpacing} />

      <SectionCard
        title="Recent rhythm"
        subtitle="A clean week-at-a-glance view so trends stay readable in both bright and dark modes."
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
      paddingBottom: 24,
    },
    scoreBadge: {
      backgroundColor: colors.mint,
      borderRadius: 18,
      paddingHorizontal: 12,
      paddingVertical: 8,
      alignItems: 'center',
      minWidth: 62,
    },
    scoreValue: {
      fontFamily: 'Manrope_800ExtraBold',
      fontSize: 22,
      color: colors.onAccent,
      lineHeight: 24,
    },
    scoreLabel: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 11,
      color: colors.onAccent,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    metricsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    cardStack: {
      gap: 12,
    },
    summaryList: {
      gap: 12,
    },
    sectionSpacing: {
      height: 12,
    },
  });
}
