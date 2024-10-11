import 'dotenv/config';
import { drizzle, eq } from 'drizzle-orm';
import { usersTable } from './db/schema';

async function main() {
  const db = await drizzle("vercel-postgres");

  const user: typeof usersTable.$inferInsert = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
      isDrugDealer: false
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!')
}

main();