import * as SQLite from 'expo-sqlite';

let databasePromise;

async function getDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync('cafe420_daily.db');
  }

  const db = await databasePromise;
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS tracker_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habit_id TEXT NOT NULL,
      logged_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_tracker_events_logged_at
      ON tracker_events(logged_at DESC);
  `);
  return db;
}

export async function loadEvents() {
  const db = await getDatabase();
  const rows = await db.getAllAsync(
    'SELECT id, habit_id, logged_at FROM tracker_events ORDER BY logged_at DESC, id DESC'
  );

  return rows.map((row) => ({
    id: row.id,
    habitId: row.habit_id,
    loggedAt: row.logged_at,
  }));
}

export async function insertEvent(habitId, loggedAt) {
  const db = await getDatabase();
  const result = await db.runAsync(
    'INSERT INTO tracker_events (habit_id, logged_at) VALUES (?, ?)',
    [habitId, loggedAt]
  );

  return {
    id: result.lastInsertRowId,
    habitId,
    loggedAt,
  };
}

export async function deleteEventById(eventId) {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM tracker_events WHERE id = ?', [eventId]);
}

export async function loadThemePreference() {
  const db = await getDatabase();
  const row = await db.getFirstAsync(
    'SELECT value FROM app_settings WHERE key = ?',
    ['theme_mode']
  );

  if (row?.value === 'amoled') return 'amoled';
  return 'light';
}

export async function saveThemePreference(themeMode) {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO app_settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    ['theme_mode', themeMode]
  );
}
