import { Skeleton } from "../ui/skeleton"

interface Props {
  rowsNumber: number
}

export default function TableSkeleton({ rowsNumber }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {/* filter skeleton */}
      <div className="w-full flex items-center juestify-center">
        <Skeleton className="w-80 h-8" />

        <div className="flex items-center gap-2 ml-auto">
          <Skeleton className="w-28 h-8" />
          <Skeleton className="w-28 h-8" />
        </div>
      </div>

      {/* table skeleton */}
      <div className="w-full">
        {Array.from({ length: rowsNumber }).map((_, key) => <Skeleton key={key} className="w-full h-14 border-b border-background" />)}
      </div>

      {/* footer */}
      <div className="flex items-center justify-between w-full">
        <Skeleton className="w-28 h-8" />
        <Skeleton className="w-28 h-8" />
      </div>
    </div>
  )
}