"use server"

import { todoService } from "@/lib/db/todo-service"
import { revalidatePath } from "next/cache"

export async function addTodo(userId: string, formData: FormData) {
    const content = formData.get("content") as string
    if (!content) return;

    await todoService.create(userId, content)
    revalidatePath("/")
}

export async function deleteTodo(id: number) {
    await todoService.delete(id)
    revalidatePath("/")
}