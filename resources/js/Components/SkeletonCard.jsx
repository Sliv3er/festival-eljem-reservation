export default function SkeletonCard() {
  return (
    <div className="card animate-pulse" aria-hidden="true">
      <div className="aspect-[16/10] bg-sandstone/10" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 rounded skeleton" />
        <div className="h-4 w-1/2 rounded skeleton" />
        <div className="flex items-end justify-between pt-2">
          <div className="h-4 w-20 rounded skeleton" />
          <div className="h-10 w-24 rounded-lg skeleton" />
        </div>
      </div>
    </div>
  );
}
