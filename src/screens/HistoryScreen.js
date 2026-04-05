import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import DaySummaryRow from '../components/DaySummaryRow';
import EmptyState from '../components/EmptyState';
import SectionCard from '../components/SectionCard';
import TimelineRow from '../components/TimelineRow';
import { useAppTheme } from '../theme';

export default function HistoryScreen({
  summary,
  isSaving,
  onDeleteEvent,
}) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  function renderHeader() {
    return (
      <View>
        <SectionCard
          title="All activity"
          subtitle="A virtualized feed that stays smooth even when you keep years of daily records."
        >
          <View style={styles.archivePreview}>
            {summary.dailyEntries.slice(0, 5).map((entry) => (
              <DaySummaryRow key={entry.dayKey} entry={entry} />
            ))}
          </View>
        </SectionCard>

        <View style={styles.sectionSpacing} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.scroll}
      contentContainerStyle={styles.content}
      data={summary.timeline}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TimelineRow
          item={item}
          isSaving={isSaving}
          onDelete={onDeleteEvent}
        />
      )}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={
        <EmptyState
          icon="🗂️"
          title="No activity yet"
          description="Your saved logs will appear here once you start tracking."
        />
      }
      ItemSeparatorComponent={() => <View style={styles.rowSpacer} />}
      overScrollMode="never"
      removeClippedSubviews
      initialNumToRender={10}
      maxToRenderPerBatch={12}
      windowSize={7}
      showsVerticalScrollIndicator={false}
    />
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
    archivePreview: {
      gap: 12,
    },
    sectionSpacing: {
      height: 12,
    },
    rowSpacer: {
      height: 10,
    },
  });
}
