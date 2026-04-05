import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import EmptyState from '../components/EmptyState';
import SectionCard from '../components/SectionCard';
import { HABITS } from '../habits';
import { useAppTheme, withAlpha } from '../theme';

function InsightRow({ habit, total }) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createRowStyles(colors), [colors]);

  return (
    <View style={styles.insightRow}>
      <View style={[styles.insightIconWrap, { backgroundColor: withAlpha(habit.accent, 0.14) }]}>
        <Text style={styles.insightIcon}>{habit.icon}</Text>
      </View>
      <Text style={styles.insightTitle}>{habit.label}</Text>
      <Text style={styles.insightSideValue}>{total}</Text>
    </View>
  );
}

export default function InsightsScreen({ summary }) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  if (!summary.totalLogs) {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <EmptyState
          icon="📈"
          title="No stats"
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <SectionCard
        title="Stats"
      >
        <View style={styles.heroStats}>
          <View style={styles.heroBlock}>
            <Text style={styles.heroValue}>{summary.totalLogs}</Text>
            <Text style={styles.heroLabel}>Logs</Text>
          </View>
          <View style={styles.heroBlock}>
            <Text style={styles.heroValue}>{summary.bestDayCount}</Text>
            <Text style={styles.heroLabel}>Best</Text>
          </View>
        </View>
      </SectionCard>

      <View style={styles.sectionSpacing} />

      <SectionCard
        title="Habits"
      >
        <View style={styles.rows}>
          {HABITS.map((habit) => (
            <InsightRow
              key={habit.id}
              habit={habit}
              total={summary.habitTotals[habit.id] || 0}
            />
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
      backgroundColor: colors.background,
    },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 120,
  },
    sectionSpacing: {
      height: 12,
    },
    heroStats: {
      flexDirection: 'row',
      gap: 10,
    },
    heroBlock: {
      flex: 1,
      padding: 16,
      borderRadius: 18,
      backgroundColor: colors.surfaceStrong,
      borderWidth: 1,
      borderColor: colors.line,
    },
    heroValue: {
      fontFamily: 'Manrope_800ExtraBold',
      fontSize: 32,
      color: colors.paper,
      letterSpacing: -1,
    },
    heroLabel: {
      marginTop: 6,
      fontFamily: 'Manrope_500Medium',
      fontSize: 13,
      color: colors.mutedText,
    },
    rows: {
      gap: 10,
    },
  });
}

function createRowStyles(colors) {
  return StyleSheet.create({
    insightRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      borderRadius: 18,
      backgroundColor: colors.surfaceStrong,
      borderWidth: 1,
      borderColor: colors.line,
    },
    insightIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    insightIcon: {
      fontSize: 20,
    },
    insightTitle: {
      flex: 1,
      fontFamily: 'Manrope_700Bold',
      fontSize: 15,
      color: colors.paper,
    },
    insightSideValue: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 13,
      color: colors.paper,
    },
  });
}
