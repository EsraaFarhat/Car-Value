import { DataSource } from 'typeorm';

const options: any = {
  synchronize: false,
  migrations: ['src/migrations/*.ts'], // assuming you're using TypeScript
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(options, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['src/**/*.entity.ts'],
    });
    break;
  case 'test':
    Object.assign(options, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['src/**/*.entity.ts'],
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(options, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['dist/**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('Unknown environment');
}

export const AppDataSource = new DataSource(options);
