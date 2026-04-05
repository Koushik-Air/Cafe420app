export const HABITS = [
  {
    id: 'coffee',
    label: 'Coffee',
    shortLabel: 'Coffee',
    actionLabel: 'Brewed coffee',
    icon: '☕',
    accent: '#DE8540',
    target: 2,
  },
  {
    id: 'egg',
    label: 'Boiled Egg',
    shortLabel: 'Boiled Egg',
    actionLabel: 'Made boiled egg',
    icon: '🥚',
    accent: '#D9A328',
    target: 2,
  },
  {
    id: 'egg_fry',
    label: 'Egg Fry',
    shortLabel: 'Egg Fry',
    actionLabel: 'Made egg fry',
    icon: '🍳',
    accent: '#E46B58',
    target: 1,
  },
];

export function getHabitById(habitId) {
  return HABITS.find((habit) => habit.id === habitId) || HABITS[0];
}
