import dataSource from './ormconfig';

const revertMigrations = async () => {
  try {
    console.log('[Migration] Reverting last migration...');
    await dataSource.initialize();
    await dataSource.undoLastMigration();
    console.log('[Migration] Migration reverted successfully.');
    await dataSource.destroy();
  } catch (error) {
    console.error('[Migration] Error reverting migration:', error);
    process.exit(1);
  }
};

revertMigrations();
