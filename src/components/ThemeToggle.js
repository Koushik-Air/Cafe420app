import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { THEME_MODES, useAppTheme, withAlpha } from '../theme';

const OPTIONS = [
  { id: THEME_MODES.light, label: 'Light' },
  { id: THEME_MODES.amoled, label: 'Black' },
];

export default function ThemeToggle() {
  const { colors, setThemeMode, themeMode } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.track}>
      {OPTIONS.map((option) => {
        const isSelected = option.id === themeMode;

        return (
          <Pressable
            key={option.id}
            android_disableSound
            android_ripple={{
              color: withAlpha(colors.paper, colors.isDark ? 0.1 : 0.06),
              borderless: false,
            }}
            onPress={() => setThemeMode(option.id)}
            style={[styles.option, isSelected && styles.optionSelected]}
          >
            <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    track: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 4,
      borderWidth: 1,
      borderColor: colors.line,
      gap: 4,
    },
    option: {
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 9,
      overflow: 'hidden',
    },
    optionSelected: {
      backgroundColor: withAlpha(colors.mint, colors.isDark ? 0.18 : 0.12),
    },
    optionText: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 11,
      color: colors.mutedText,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
    },
    optionTextSelected: {
      color: colors.paper,
    },
  });
}
