
import Loader from "@/components/UI/Loader";
import Skeleton from "@/components/UI/Skeleton";
import type { LoadingProps } from "@/types/loading";

export default function Loading({
  showLoader = true,
  loaderLabel = "Cargando...",
  skeletonItems = 3,
}: Readonly<LoadingProps>) {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {showLoader && (
        <Loader label={loaderLabel} className="mb-4" />
      )}
      {skeletonItems > 0 && (
        <div className="space-y-3 w-full max-w-md">
          {[...Array(skeletonItems)].map((_, index) => (
            <Skeleton key={index} height="1.5rem" width="100%" rounded="rounded-md" />
          ))}
        </div>
      )}
    </div>
  );
}