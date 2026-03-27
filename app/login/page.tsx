"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { syncUserWithPostgres } from "@/app/actions/auth";

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const idToken = await result.user.getIdToken();
      
      await syncUserWithPostgres(idToken);
      
      console.log("Logged in and synced!");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
      Sign in with Google
    </button>
  );
}