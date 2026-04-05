import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../theme';

export default function SectionCard({ title, subtitle, children, rightSlot }) {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {rightSlot ? <View>{rightSlot}</View> : null}
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 22,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.line,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    copy: {
      flex: 1,
    },
    title: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 18,
      color: colors.paper,
    },
    subtitle: {
      marginTop: 6,
      fontFamily: 'Manrope_400Regular',
      fontSize: 13,
      lineHeight: 20,
      color: colors.mutedText,
    },
    body: {
      marginTop: 18,
    },
  });
}
