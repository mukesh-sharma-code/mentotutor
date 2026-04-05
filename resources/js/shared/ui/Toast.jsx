export function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed right-4 top-22 z-[80] max-w-sm rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 shadow-lg">
      {message}
    </div>
  );
}
