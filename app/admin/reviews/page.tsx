export default function Page() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-text-primary">Reviews</h1>
      <p className="mt-1 text-sm text-text-muted mb-6">Manage customer product reviews</p>
      <div className="rounded-xl border border-line bg-white p-10 text-center">
        <p className="text-sm text-text-muted">Approve, edit, and respond to customer reviews.</p>
        <p className="text-xs text-text-muted mt-1">Full CRUD coming in the next build phase.</p>
      </div>
    </div>
  );
}
