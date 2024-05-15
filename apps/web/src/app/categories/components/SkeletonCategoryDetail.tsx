"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCategoryDetail = () => {
  return (
    <div className="flex flex-col">
        <div>
          <Skeleton className="h-[500px] w-full" />
        </div>

        <div className="space-y-4 py-12">
          <Skeleton className="h-7 max-w-[200px]" />
          <Skeleton className="h-7 max-w-[200px]" />
        </div>
      </div>
  );
};

export default SkeletonCategoryDetail;
