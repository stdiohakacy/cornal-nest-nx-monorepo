import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();
console.log(process.env.DB_HOST);
export const postgresConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'cornal_order_db',
  // entities: [__dirname + '/*.orm-entity.{ts,js}'],
  // migrations: [__dirname + '/migrations/*.{ts,js}'],
  entities: [join(__dirname, 'entities', '*.orm-entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: true,
  logging: true,
};

export default new DataSource({ ...postgresConfig, synchronize: false });
