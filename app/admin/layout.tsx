import { AdminSidebar } from "@/components/admin-sidebar";

// TODO(Phase 4): wrap with an auth check that redirects non-admin/staff
// users, using the `role` claim on the Supabase session — see
// lib/supabase/server.ts and supabase/migrations/0001_init.sql (users.role).
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-paper min-h-screen">
      <AdminSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
