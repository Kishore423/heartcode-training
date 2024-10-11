import { pgTable, uuid, varchar, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const heartcodeTrainingUser = pgTable("heartcodeTraining_user", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 32 }).notNull(),
	isDrugDealer: boolean().notNull(),
});