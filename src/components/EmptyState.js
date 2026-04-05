import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme, withAlpha } from '../theme';

export default function EmptyState({ icon, title, description }) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingVertical: 26,
      paddingHorizontal: 14,
      borderRadius: 24,
      backgroundColor: colors.surfaceStrong,
      borderWidth: 1,
      borderColor: colors.line,
    },
    iconWrap: {
      width: 60,
      height: 60,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: withAlpha(colors.mint, colors.isDark ? 0.16 : 0.12),
      marginBottom: 16,
    },
    icon: {
      fontSize: 28,
    },
    title: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 18,
      color: colors.paper,
    },
    description: {
      marginTop: 8,
      fontFamily: 'Manrope_400Regular',
      fontSize: 14,
      lineHeight: 22,
      color: colors.mutedText,
      textAlign: 'center',
    },
  });
}
