export default function ProductCardSkeleton() {
  return (
    <div className="bg-white pb-6 animate-pulse">
      <div className="bg-gray-100 aspect-4/5" />
      <div className="pt-3 px-3 sm:px-4 space-y-2">
        <div className="h-3 bg-gray-100 w-1/4" />
        <div className="h-4 bg-gray-100 w-3/4" />
        <div className="h-4 bg-gray-100 w-1/3" />
      </div>
    </div>
  );
}
