"use client";

import LoginButton from "@/app/login/page";
import { useAuth } from "@/context/auth-context";
import { auth } from "@/lib/firebase"
import { addTodo } from "@/app/actions/todos"

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p className="p-8">Loading session...</p>;

  return (
    <main className="p-8 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Todo App Test</h1>
      
      {!user ? (
        <div className="text-center">
          <p className="mb-4 text-gray-600">You are not logged in.</p>
          <LoginButton />
        </div>
      ) : (
        <div>
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
          <p className="text-green-700 font-medium">Logged in as:</p>
          <p className="text-sm text-green-600 mb-4">{user.email}</p>
          <p className="text-xs text-gray-400">UID: {user.uid}</p>
          <button 
            onClick={() => auth.signOut()} 
            className="mt-4 text-sm text-red-600 underline"
          >
            Sign Out
          </button>
        </div>

        <form 
            action={(formData) => addTodo(user.uid, formData)} 
            className="flex gap-2"
          >
            <input 
              name="content" 
              placeholder="What needs to be done?" 
              className="border p-2 rounded flex-1 text-black"
              required 
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Task
            </button>
          </form>

          {/* TODO LIST DISPLAY WILL GO BELOW HERE */}
          <div className="mt-8">
             <p className="text-gray-400 italic">Your tasks will appear here...</p>
          </div>
        </div>
      )}
    </main>
  );
}