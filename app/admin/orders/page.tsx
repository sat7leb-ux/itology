export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <div className="mt-6 rounded-md border border-line bg-white p-10 text-center">
        <p className="text-sm text-text-muted">Order queue with status pipeline: pending, confirmed, processing, shipped, delivered, cancelled. Populates once checkout (Phase 3) is wired up.</p>
      </div>
    </div>
  );
}
