import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme, withAlpha } from '../theme';

export default function TabBar({ items, selectedIndex, onSelected }) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;

          return (
            <Pressable
              key={item.label}
              accessibilityRole="button"
              android_disableSound
              android_ripple={{ color: withAlpha(colors.mint, 0.18), borderless: false }}
              onPress={() => onSelected(index)}
              style={[styles.tab, isSelected && styles.tabSelected]}
            >
              <Text style={[styles.tabIcon, isSelected && styles.tabIconSelected]}>
                {item.icon}
              </Text>
              <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    outer: {
      paddingHorizontal: 12,
      paddingTop: 8,
      paddingBottom: 12,
      backgroundColor: colors.background,
    },
    inner: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
      padding: 5,
      borderRadius: 24,
      gap: 4,
    },
    tab: {
      flex: 1,
      borderRadius: 19,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    tabSelected: {
      backgroundColor: withAlpha(colors.mint, colors.isDark ? 0.16 : 0.12),
    },
    tabIcon: {
      fontSize: 12,
      lineHeight: 12,
      marginBottom: 4,
      color: colors.paperSoft,
    },
    tabIconSelected: {
      color: colors.mint,
    },
    tabText: {
      fontFamily: 'Manrope_700Bold',
      color: colors.paperSoft,
      fontSize: 12,
    },
    tabTextSelected: {
      color: colors.mint,
    },
  });
}
