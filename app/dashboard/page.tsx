"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserProfile from "@/components/UserProfile";

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user) {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      }
    };

    fetchUserData();
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[100px] px-4 md:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0A0A1B] rounded-xl p-6 shadow-xl border border-[#232333]">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111122] p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Profile Information
              </h2>
              <div className="space-y-2">
                <p>Name: {userData?.name}</p>
                <p>Email: {userData?.email}</p>
                <p>
                  Member Since:{" "}
                  {userData?.createdAt &&
                    new Date(userData.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-[#111122] p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Account Status</h2>
              <div className="space-y-2">
                <p>Status: Active</p>
                <p>
                  Last Updated:{" "}
                  {userData?.updatedAt &&
                    new Date(userData.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserProfile />
    </div>
  );
}
