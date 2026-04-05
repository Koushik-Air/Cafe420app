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
        </View>
      </View>

      <View style={styles.metricRow}>
        <View>
          <Text style={styles.metricValue}>{countToday}</Text>
        </View>
        <View style={styles.targetPill}>
          <Text style={styles.targetText}>{habit.target}/day</Text>
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
          accessibilityRole="button"
          accessibilityLabel={`Remove one ${habit.label} log`}
          android_disableSound
          android_ripple={{ color: withAlpha(colors.paper, colors.isDark ? 0.08 : 0.06), borderless: false }}
          style={({ pressed }) => [
            styles.secondaryButton,
            (!countToday || isSaving) && styles.disabledButton,
            pressed && countToday && !isSaving && styles.pressedButton,
          ]}
        >
          <Text style={[styles.secondaryText, styles.iconText, (!countToday || isSaving) && styles.disabledText]}>-</Text>
        </Pressable>

        <Pressable
          onPress={onLog}
          disabled={isSaving}
          accessibilityRole="button"
          accessibilityLabel={`Add one ${habit.label} log`}
          android_disableSound
          android_ripple={{ color: withAlpha(colors.black, 0.12), borderless: false }}
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: habit.accent },
            pressed && !isSaving && styles.pressedButton,
            isSaving && styles.disabledButton,
          ]}
        >
          <Text style={[styles.primaryText, styles.iconText]}>+</Text>
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
      justifyContent: 'center',
    },
    title: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 18,
      color: colors.paper,
    },
    metricRow: {
      marginTop: 16,
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
    iconText: {
      fontSize: 24,
      lineHeight: 24,
      letterSpacing: 0,
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
