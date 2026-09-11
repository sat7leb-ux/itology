export default function Page() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-text-primary">Services</h1>
      <p className="mt-1 text-sm text-text-muted mb-6">Manage your IT service offerings</p>
      <div className="rounded-xl border border-line bg-white p-10 text-center">
        <p className="text-sm text-text-muted">Create and edit IT service packages.</p>
        <p className="text-xs text-text-muted mt-1">Full CRUD coming in the next build phase.</p>
      </div>
    </div>
  );
}
