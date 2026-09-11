export default function Page() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-text-primary">Media Library</h1>
      <p className="mt-1 text-sm text-text-muted mb-6">Manage images and files</p>
      <div className="rounded-xl border border-line bg-white p-10 text-center">
        <p className="text-sm text-text-muted">Upload, organize, and manage your product images and files.</p>
        <p className="text-xs text-text-muted mt-1">Connect Supabase Storage for file uploads.</p>
      </div>
    </div>
  );
}
