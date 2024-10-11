'user server'

import { db } from "../../db";
import { users } from "../../db/schema";


export async function insertOneUser(name : String, isDrugDealer : boolean ) {
    await db.insert(users).values({name : name , isDrugDealer : isDrugDealer});
}
