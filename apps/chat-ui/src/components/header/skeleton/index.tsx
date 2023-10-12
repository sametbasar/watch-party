export const HeaderSkeleton = () => {
  return (
    <div className="flex animate-pulse items-center justify-between border-b-2 border-b-border py-3">
      <div className="flex items-center gap-4">
        <div className="h-5 w-5 rounded bg-gray-600"></div>
        <span className="h-10 w-10 rounded bg-gray-600"></span>
      </div>
      <div className="flex h-[32px] w-10 items-center gap-1 rounded bg-gray-600 p-2"></div>
    </div>
  );
};
