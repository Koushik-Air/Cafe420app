import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../theme';

export default function MetricCard({ label, value, tone }) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const toneColor = tone || colors.mint;

  return (
    <View style={styles.card}>
      <View style={[styles.dot, { backgroundColor: toneColor }]} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    card: {
      flex: 1,
      minWidth: 100,
      backgroundColor: colors.surfaceStrong,
      borderRadius: 18,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.line,
    },
    dot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      marginBottom: 18,
    },
    value: {
      fontFamily: 'Manrope_800ExtraBold',
      fontSize: 24,
      color: colors.paper,
      letterSpacing: -0.8,
    },
    label: {
      marginTop: 4,
      fontFamily: 'Manrope_500Medium',
      fontSize: 13,
      lineHeight: 18,
      color: colors.mutedText,
    },
  });
}
