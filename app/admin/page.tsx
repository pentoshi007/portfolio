import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import AdminDashboard from "./AdminDashboard";

interface AdminPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login");
  }

  const { tab } = await searchParams;
  const initialTab = tab === "blogs" ? "blogs" : "messages";

  return <AdminDashboard initialTab={initialTab} />;
}
