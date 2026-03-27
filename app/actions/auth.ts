"use server";

import { verifySession } from "@/lib/firebase-admin";
import { userService } from "@/services/user-service";

export async function syncUserWithPostgres(idToken: string) {
  try {

    const decodedToken = await verifySession(idToken);
    
    const user = await userService.getOrCreateUser(
      decodedToken.uid, 
      decodedToken.email!
    );

    return { success: true, user };
  } catch (error) {
    console.error("Sync Error:", error);
    return { success: false, error: "Failed to sync user" };
  }
}