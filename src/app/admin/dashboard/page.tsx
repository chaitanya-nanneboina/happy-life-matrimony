import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Happy Life Matrimony",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <AdminDashboard adminName={String(session.username)} />;
}
