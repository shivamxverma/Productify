import type { Config } from 'drizzle-kit';
/*
Why Use Drizzle Kit?
Type Safety: Drizzle Kit ensures that your SQL queries, models, and migrations are type-safe, reducing potential errors in production.
Modern Development: It leverages modern JavaScript and TypeScript features, making it more appealing to developers accustomed to these environments.
Efficient and Lightweight: If you need a performant ORM that doesn’t compromise on features but avoids the overhead of traditional ORMs, Drizzle Kit can be a good fit.
*/
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  console.log('🔴 Cannot find database url');
}

export default {
  schema: './src/lib/supabase/schema.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || '',
  },
} satisfies Config;