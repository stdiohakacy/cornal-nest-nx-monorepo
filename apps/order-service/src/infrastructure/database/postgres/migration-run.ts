import dataSource from './ormconfig';

const runMigrations = async () => {
  try {
    console.log('[Migration] Running database migrations...');
    await dataSource.initialize();
    await dataSource.runMigrations();
    console.log('[Migration] Migrations completed successfully.');
    await dataSource.destroy();
  } catch (error) {
    console.error('[Migration] Error running migrations:', error);
    process.exit(1);
  }
};

runMigrations();
