import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme, withAlpha } from '../theme';

export default function HabitActionCard({
  habit,
  countToday,
  isSaving,
  onLog,
  onUndo,
}) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const progressRatio = Math.min(countToday / habit.target, 1);

  return (
    <View style={[styles.card, { backgroundColor: withAlpha(habit.accent, colors.isDark ? 0.14 : 0.1) }]}>
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: withAlpha(habit.accent, colors.isDark ? 0.18 : 0.14) }]}>
          <Text style={styles.icon}>{habit.icon}</Text>
        </View>
        <View style={styles.topCopy}>
          <Text style={styles.title}>{habit.label}</Text>
          <Text style={styles.subtitle}>{habit.actionLabel}</Text>
        </View>
      </View>

      <View style={styles.metricRow}>
        <View>
          <Text style={styles.metricValue}>{countToday}</Text>
          <Text style={styles.metricLabel}>logged today</Text>
        </View>
        <View style={styles.targetPill}>
          <Text style={styles.targetText}>Target {habit.target}</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { backgroundColor: habit.accent, width: `${Math.max(progressRatio * 100, 8)}%` },
          ]}
        />
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={onUndo}
          disabled={!countToday || isSaving}
          android_disableSound
          android_ripple={{ color: withAlpha(colors.paper, colors.isDark ? 0.08 : 0.06), borderless: false }}
          style={({ pressed }) => [
            styles.secondaryButton,
            (!countToday || isSaving) && styles.disabledButton,
            pressed && countToday && !isSaving && styles.pressedButton,
          ]}
        >
          <Text style={[styles.secondaryText, (!countToday || isSaving) && styles.disabledText]}>
            Undo
          </Text>
        </Pressable>

        <Pressable
          onPress={onLog}
          disabled={isSaving}
          android_disableSound
          android_ripple={{ color: withAlpha(colors.black, 0.12), borderless: false }}
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: habit.accent },
            pressed && !isSaving && styles.pressedButton,
            isSaving && styles.disabledButton,
          ]}
        >
          <Text style={styles.primaryText}>{isSaving ? 'Saving' : 'Log now'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    card: {
      borderRadius: 24,
      padding: 16,
      borderWidth: 1,
      borderColor: withAlpha(colors.paper, colors.isDark ? 0.05 : 0.08),
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconWrap: {
      width: 54,
      height: 54,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 26,
    },
    topCopy: {
      flex: 1,
      marginLeft: 14,
    },
    title: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 18,
      color: colors.paper,
    },
    subtitle: {
      marginTop: 4,
      fontFamily: 'Manrope_400Regular',
      fontSize: 13,
      color: colors.mutedText,
    },
    metricRow: {
      marginTop: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    metricValue: {
      fontFamily: 'Manrope_800ExtraBold',
      fontSize: 32,
      color: colors.paper,
      letterSpacing: -1,
    },
    metricLabel: {
      fontFamily: 'Manrope_500Medium',
      fontSize: 13,
      color: colors.paperSoft,
    },
    targetPill: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: withAlpha(colors.black, colors.isDark ? 0.18 : 0.08),
    },
    targetText: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 12,
      color: colors.paper,
    },
    progressTrack: {
      marginTop: 12,
      height: 6,
      borderRadius: 999,
      backgroundColor: withAlpha(colors.paper, colors.isDark ? 0.08 : 0.1),
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 999,
    },
    actions: {
      flexDirection: 'row',
      marginTop: 16,
      gap: 10,
    },
    secondaryButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 13,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: withAlpha(colors.paper, colors.isDark ? 0.1 : 0.08),
      backgroundColor: withAlpha(colors.white, colors.isDark ? 0.03 : 0.55),
      overflow: 'hidden',
    },
    primaryButton: {
      flex: 1.2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 13,
      borderRadius: 16,
      overflow: 'hidden',
    },
    primaryText: {
      fontFamily: 'Manrope_800ExtraBold',
      fontSize: 14,
      color: colors.onAccent,
    },
    secondaryText: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 14,
      color: colors.paper,
    },
    disabledButton: {
      opacity: 0.45,
    },
    disabledText: {
      color: colors.mutedText,
    },
    pressedButton: {
      transform: [{ scale: 0.98 }],
    },
  });
}
