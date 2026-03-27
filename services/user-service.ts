import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const userService = {
  async getOrCreateUser(firebaseUid: string, email: string) {

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.firebaseUid, firebaseUid));

    if (existingUser) return existingUser;

    const [newUser] = await db
      .insert(users)
      .values({
        firebaseUid,
        email,
      })
      .returning();

    return newUser;
  }
};