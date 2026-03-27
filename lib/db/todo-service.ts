import { db } from "@/lib/db"
import { todos } from "@/lib/schema"
import { eq, desc } from "drizzle-orm"

export const todoService = {
    async create(userId: string, content: string) {
        return await db.insert(todos).values({
            userId,
            task: content,
        }).returning()
    },

    async getAll(userId: string) {
        return await db
        .select()
        .from(todos)
        .where(eq(todos.userId, userId))
        .returning()
    },

    async delete(id: number) {
        return await db.delete(todos).where(eq(todos.id, id))
    }
}