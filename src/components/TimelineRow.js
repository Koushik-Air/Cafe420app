import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatTime } from '../lib/date';
import { useAppTheme, withAlpha } from '../theme';

function TimelineRow({ item, onDelete, isSaving }) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      <View style={[styles.iconWrap, { backgroundColor: withAlpha(item.habit.accent, 0.16) }]}>
        <Text style={styles.icon}>{item.habit.icon}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.dayLabel}</Text>
      </View>
      <View style={styles.side}>
        <Text style={styles.time}>{formatTime(item.loggedAt)}</Text>
        <Pressable
          disabled={isSaving}
          android_disableSound
          android_ripple={{ color: withAlpha(item.habit.accent, 0.14), borderless: false }}
          onPress={() => onDelete(item.id)}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && !isSaving && styles.pressedButton,
            isSaving && styles.disabledButton,
          ]}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default memo(TimelineRow);

function createStyles(colors) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: 14,
      alignItems: 'center',
      minHeight: 72,
      backgroundColor: colors.surface,
      borderRadius: 18,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: colors.line,
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 21,
    },
    copy: {
      flex: 1,
    },
    title: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 15,
      color: colors.paper,
    },
    subtitle: {
      marginTop: 4,
      fontFamily: 'Manrope_400Regular',
      fontSize: 12,
      lineHeight: 18,
      color: colors.mutedText,
    },
    side: {
      alignItems: 'flex-end',
      gap: 8,
    },
    time: {
      fontFamily: 'Manrope_600SemiBold',
      fontSize: 12,
      color: colors.paperSoft,
    },
    deleteButton: {
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 999,
      backgroundColor: withAlpha(colors.red, colors.isDark ? 0.18 : 0.12),
      overflow: 'hidden',
    },
    deleteText: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 11,
      color: colors.red,
    },
    pressedButton: {
      opacity: 0.8,
    },
    disabledButton: {
      opacity: 0.45,
    },
  });
}
