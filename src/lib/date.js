export function getDayKey(input) {
  const date = new Date(input);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function isSameDay(left, right) {
  return getDayKey(left) === getDayKey(right);
}

export function formatLongDate(input) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date(input));
}

export function formatShortDate(input) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(input));
}

export function formatDayName(input) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
  }).format(new Date(input));
}

export function formatTime(input) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(input));
}

export function relativeDayLabel(input) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(input);
  const target = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  const diff = Math.round((today - target) / 86400000);

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return `${formatDayName(input)}, ${formatShortDate(input)}`;
}
