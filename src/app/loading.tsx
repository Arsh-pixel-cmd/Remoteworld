export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-4 border-[#03A1AC] border-t-transparent animate-spin" />
        </div>
        <p className="text-gray-400 text-sm font-medium">Loading…</p>
      </div>
    </div>
  );
}
