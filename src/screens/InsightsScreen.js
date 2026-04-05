import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import EmptyState from '../components/EmptyState';
import SectionCard from '../components/SectionCard';
import { HABITS } from '../habits';
import { useAppTheme, withAlpha } from '../theme';

function InsightRow({ habit, total, peakDay }) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createRowStyles(colors), [colors]);

  return (
    <View style={styles.insightRow}>
      <View style={[styles.insightIconWrap, { backgroundColor: withAlpha(habit.accent, 0.14) }]}>
        <Text style={styles.insightIcon}>{habit.icon}</Text>
      </View>
      <View style={styles.insightCopy}>
        <Text style={styles.insightTitle}>{habit.label}</Text>
        <Text style={styles.insightSubtitle}>{total} total logs</Text>
      </View>
      <View style={styles.insightSide}>
        <Text style={styles.insightSideLabel}>Best day</Text>
        <Text style={styles.insightSideValue}>{peakDay}</Text>
      </View>
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
          title="No insights yet"
          description="Start logging habits and this screen will turn your streaks and totals into patterns you can actually use."
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
        title="Performance snapshot"
        subtitle="Readable at full brightness and equally comfortable in true black AMOLED mode."
      >
        <View style={styles.heroStats}>
          <View style={styles.heroBlock}>
            <Text style={styles.heroValue}>{summary.totalLogs}</Text>
            <Text style={styles.heroLabel}>Lifetime logs</Text>
          </View>
          <View style={styles.heroBlock}>
            <Text style={styles.heroValue}>{summary.bestDayCount}</Text>
            <Text style={styles.heroLabel}>Best day this week</Text>
          </View>
        </View>
      </SectionCard>

      <View style={styles.sectionSpacing} />

      <SectionCard
        title="Habit totals"
        subtitle="Which rituals are doing the heaviest lifting across your current routine."
      >
        <View style={styles.rows}>
          {HABITS.map((habit) => (
            <InsightRow
              key={habit.id}
              habit={habit}
              total={summary.habitTotals[habit.id] || 0}
              peakDay={`${Math.max(
                ...summary.dailyEntries.map((entry) => entry.totals[habit.id] || 0),
                0
              )} logs`}
            />
          ))}
        </View>
      </SectionCard>

      <View style={styles.sectionSpacing} />

      <SectionCard
        title="Coach notes"
        subtitle="Helpful interpretation that still feels calm in either theme."
      >
        <View style={styles.notesList}>
          <Text style={styles.note}>
            {summary.streak >= 3
              ? `You are on a ${summary.streak}-day streak. Keep your first log early to protect it.`
              : 'Your streak is still early. Logging one habit before lunch is the easiest way to make it stick.'}
          </Text>
          <Text style={styles.note}>
            {summary.todayTotalCount >= 3
              ? 'Today already looks strong. A quick final check-in tonight can close the loop cleanly.'
              : 'Today is still light. One quick tap on your next habit will noticeably improve your daily momentum.'}
          </Text>
          <Text style={styles.note}>
            Coffee leads overall right now, so the app stays optimized for fast repeated logging without clutter.
          </Text>
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
      paddingBottom: 24,
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
    notesList: {
      gap: 10,
    },
    note: {
      fontFamily: 'Manrope_500Medium',
      fontSize: 14,
      lineHeight: 22,
      color: colors.paperSoft,
      padding: 14,
      borderRadius: 16,
      backgroundColor: colors.surfaceStrong,
      borderWidth: 1,
      borderColor: colors.line,
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
    insightCopy: {
      flex: 1,
    },
    insightTitle: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 15,
      color: colors.paper,
    },
    insightSubtitle: {
      marginTop: 4,
      fontFamily: 'Manrope_400Regular',
      fontSize: 12,
      color: colors.mutedText,
    },
    insightSide: {
      alignItems: 'flex-end',
    },
    insightSideLabel: {
      fontFamily: 'Manrope_500Medium',
      fontSize: 11,
      color: colors.mutedText,
    },
    insightSideValue: {
      marginTop: 4,
      fontFamily: 'Manrope_700Bold',
      fontSize: 12,
      color: colors.paper,
    },
  });
}
