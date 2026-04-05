import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../theme';

function formatTime(input) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(input);
}

function formatDate(input) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(input);
}

function formatDay(input) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(input);
}

export default function LiveClockCard() {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.day}>{formatDay(now)}</Text>
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      <Text style={styles.time}>{formatTime(now)}</Text>
      <Text style={styles.date}>{formatDate(now)}</Text>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    card: {
      alignSelf: 'flex-start',
      width: '52%',
      minWidth: 220,
      maxWidth: 260,
      marginBottom: 4,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 22,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    },
    day: {
      flex: 1,
      fontFamily: 'Manrope_800ExtraBold',
      fontSize: 18,
      lineHeight: 22,
      color: colors.paper,
      letterSpacing: -0.4,
    },
    livePill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: colors.surfaceStrong,
    },
    liveDot: {
      width: 8,
      height: 8,
      borderRadius: 999,
      backgroundColor: colors.mint,
    },
    liveText: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 11,
      lineHeight: 14,
      color: colors.paperSoft,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    time: {
      marginTop: 12,
      fontFamily: 'Manrope_800ExtraBold',
      fontSize: 34,
      lineHeight: 38,
      color: colors.paper,
      letterSpacing: -1.4,
      fontVariant: ['tabular-nums'],
    },
    date: {
      marginTop: 6,
      fontFamily: 'Manrope_500Medium',
      fontSize: 14,
      lineHeight: 18,
      color: colors.mutedText,
    },
  });
}
