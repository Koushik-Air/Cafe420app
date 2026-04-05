import React, { startTransition, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';

import ThemeToggle from './src/components/ThemeToggle';
import DashboardScreen from './src/screens/DashboardScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import TabBar from './src/components/TabBar';
import { getHabitById } from './src/habits';
import { buildTrackerSummary } from './src/lib/analytics';
import {
  deleteEventById,
  insertEvent,
  loadEvents,
  loadThemePreference,
  saveThemePreference,
} from './src/data/trackerStore';
import {
  AppThemeProvider,
  getThemeColors,
  THEME_MODES,
} from './src/theme';

const TABS = [
  { label: 'Today', icon: '●' },
  { label: 'Insights', icon: '▲' },
  { label: 'History', icon: '■' },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [events, setEvents] = useState([]);
  const [themeMode, setThemeMode] = useState(THEME_MODES.light);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
  const colors = useMemo(() => getThemeColors(themeMode), [themeMode]);
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const [nextEvents, savedThemeMode] = await Promise.all([
          loadEvents(),
          loadThemePreference(),
        ]);

        if (isMounted) {
          startTransition(() => {
            setEvents(nextEvents);
            setThemeMode(savedThemeMode);
          });
        }
      } catch (error) {
        console.warn('Failed to hydrate tracker data', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    NavigationBar.setBackgroundColorAsync(colors.background).catch(() => {});
    NavigationBar.setBorderColorAsync(colors.background).catch(() => {});
    NavigationBar.setButtonStyleAsync(colors.isDark ? 'light' : 'dark').catch(() => {});
  }, [colors]);

  const summary = useMemo(() => buildTrackerSummary(events), [events]);

  async function handleThemeChange(nextThemeMode) {
    if (nextThemeMode === themeMode) return;

    startTransition(() => {
      setThemeMode(nextThemeMode);
    });

    try {
      await saveThemePreference(nextThemeMode);
    } catch (error) {
      console.warn('Failed to save theme preference', error);
    }
  }

  async function handleLogHabit(habitId) {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const habit = getHabitById(habitId);
      const createdEvent = await insertEvent(habit.id, new Date().toISOString());
      startTransition(() => {
        setEvents((current) => [createdEvent, ...current]);
      });
    } catch (error) {
      console.warn('Failed to save event', error);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUndoLatest(habitId) {
    const target = events.find((event) => event.habitId === habitId);
    if (!target || isSaving) return;

    setIsSaving(true);
    try {
      await deleteEventById(target.id);
      startTransition(() => {
        setEvents((current) => current.filter((event) => event.id !== target.id));
      });
    } catch (error) {
      console.warn('Failed to delete event', error);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteEvent(eventId) {
    if (isSaving) return;

    setIsSaving(true);
    try {
      await deleteEventById(eventId);
      startTransition(() => {
        setEvents((current) => current.filter((event) => event.id !== eventId));
      });
    } catch (error) {
      console.warn('Failed to delete event', error);
    } finally {
      setIsSaving(false);
    }
  }

  const content = !fontsLoaded || isLoading ? (
    <View style={styles.loadingScreen}>
      <StatusBar
        barStyle={colors.statusBarStyle}
        backgroundColor={colors.statusBar}
        translucent={false}
      />
      <ActivityIndicator size="large" color={colors.mint} />
      <Text style={styles.loadingTitle}>Preparing your tracker</Text>
      <Text style={styles.loadingSubtitle}>
        Loading your habits, history, and theme preference.
      </Text>
    </View>
  ) : (
    <View style={styles.root}>
      <StatusBar
        barStyle={colors.statusBarStyle}
        backgroundColor={colors.statusBar}
        translucent={false}
      />
      <View style={styles.topAccent} />

      <View style={styles.safeArea}>
        <View style={[styles.header, { paddingTop: statusBarHeight + 14 }]}>
          <View style={styles.headerTopRow}>
            <Text style={styles.eyebrow}>Cafe 420 Daily</Text>
            <ThemeToggle />
          </View>
          <Text style={styles.title}>Track the rituals that shape your day.</Text>
          <Text style={styles.subtitle}>
            Bright white by day, pure black by night, and still tuned for quick Android logging.
          </Text>
        </View>

        <View style={styles.content}>
          {selectedTab === 0 ? (
            <DashboardScreen
              isSaving={isSaving}
              summary={summary}
              onLogHabit={handleLogHabit}
              onUndoLatest={handleUndoLatest}
            />
          ) : null}

          {selectedTab === 1 ? <InsightsScreen summary={summary} /> : null}

          {selectedTab === 2 ? (
            <HistoryScreen
              summary={summary}
              isSaving={isSaving}
              onDeleteEvent={handleDeleteEvent}
            />
          ) : null}
        </View>

        <TabBar
          items={TABS}
          selectedIndex={selectedTab}
          onSelected={setSelectedTab}
        />
      </View>
    </View>
  );

  return (
    <AppThemeProvider themeMode={themeMode} setThemeMode={handleThemeChange}>
      {content}
    </AppThemeProvider>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 20,
      paddingBottom: 12,
    },
    headerTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 12,
    },
    eyebrow: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 12,
      color: colors.mint,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    title: {
      fontFamily: 'Manrope_800ExtraBold',
      fontSize: 30,
      lineHeight: 36,
      color: colors.paper,
      letterSpacing: -0.8,
      maxWidth: 330,
    },
    subtitle: {
      marginTop: 10,
      fontFamily: 'Manrope_400Regular',
      fontSize: 15,
      lineHeight: 23,
      color: colors.paperSoft,
      maxWidth: 340,
    },
    content: {
      flex: 1,
    },
    topAccent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 164,
      backgroundColor: colors.topBand,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
    },
    loadingScreen: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    loadingTitle: {
      marginTop: 18,
      fontFamily: 'Manrope_700Bold',
      fontSize: 18,
      color: colors.paper,
    },
    loadingSubtitle: {
      marginTop: 8,
      fontFamily: 'Manrope_400Regular',
      fontSize: 14,
      lineHeight: 22,
      color: colors.mutedText,
      textAlign: 'center',
      maxWidth: 280,
    },
  });
}
