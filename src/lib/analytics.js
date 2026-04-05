import { HABITS, getHabitById } from '../habits';
import { getDayKey, isSameDay, relativeDayLabel, formatTime } from './date';

function createHabitTotals() {
  return HABITS.reduce((accumulator, habit) => {
    accumulator[habit.id] = 0;
    return accumulator;
  }, {});
}

export function buildTrackerSummary(events) {
  const sortedEvents = [...events].sort(
    (left, right) => new Date(right.loggedAt) - new Date(left.loggedAt)
  );
  const today = new Date();
  const habitTotals = createHabitTotals();
  const todayTotals = createHabitTotals();
  const dailyMap = new Map();

  for (const event of sortedEvents) {
    habitTotals[event.habitId] = (habitTotals[event.habitId] || 0) + 1;

    if (isSameDay(event.loggedAt, today)) {
      todayTotals[event.habitId] = (todayTotals[event.habitId] || 0) + 1;
    }

    const dayKey = getDayKey(event.loggedAt);
    if (!dailyMap.has(dayKey)) {
      dailyMap.set(dayKey, {
        dayKey,
        date: event.loggedAt,
        totals: createHabitTotals(),
        totalCount: 0,
      });
    }

    const dayEntry = dailyMap.get(dayKey);
    dayEntry.totals[event.habitId] = (dayEntry.totals[event.habitId] || 0) + 1;
    dayEntry.totalCount += 1;
  }

  const dailyEntries = Array.from(dailyMap.values()).sort(
    (left, right) => new Date(right.date) - new Date(left.date)
  );

  const streak = calculateStreak(dailyEntries);
  const weeklyEntries = dailyEntries.slice(0, 7);
  const todayTotalCount = Object.values(todayTotals).reduce(
    (sum, value) => sum + value,
    0
  );
  const averageDailyLogs = dailyEntries.length
    ? (events.length / dailyEntries.length).toFixed(1)
    : '0.0';

  const timeline = sortedEvents.map((event) => {
    const habit = getHabitById(event.habitId);
    return {
      ...event,
      habit,
      title: habit.label,
      dayLabel: relativeDayLabel(event.loggedAt),
    };
  });

  return {
    sortedEvents,
    todayTotals,
    todayTotalCount,
    habitTotals,
    dailyEntries,
    weeklyEntries,
    timeline,
    streak,
    averageDailyLogs,
    activeDays: dailyEntries.length,
    totalLogs: events.length,
    bestDayCount: weeklyEntries[0]?.totalCount || 0,
  };
}

function calculateStreak(dailyEntries) {
  if (!dailyEntries.length) return 0;

  let streak = 0;
  let cursor = new Date();

  for (const entry of dailyEntries) {
    if (!isSameDay(entry.date, cursor)) {
      const previous = new Date(cursor);
      previous.setDate(previous.getDate() - 1);
      if (!isSameDay(entry.date, previous)) break;
      cursor = previous;
    }

    streak += 1;
    cursor = new Date(new Date(entry.date).setDate(new Date(entry.date).getDate() - 1));
  }

  return streak;
}
