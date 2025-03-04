"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen mt-16 p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      {session && (
        <div className="bg-[#0a0118] p-6 rounded-lg border border-[#7042f861]">
          <p className="text-white">Welcome, {session.user?.name}!</p>
          <p className="text-gray-400">You are now signed in.</p>
        </div>
      )}
    </div>
  );
}
