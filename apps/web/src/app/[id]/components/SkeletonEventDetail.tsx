"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonEventDetail = () => {
  return (
    <div className="flex flex-col space-y-3 mx-auto px-4 py-16" style={{ maxWidth: "800px" }}>
      <div className="mt-4 space-y-4 items-center">
        <Skeleton className="h-10 max-w-[200px]" />

        <div>
          <Skeleton className="h-[500px] max-w-[800px]" />
        </div>

        <div className="space-y-4 py-12">
          <Skeleton className="h-7 max-w-[200px]" />
          <Skeleton className="h-7 max-w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonEventDetail;
