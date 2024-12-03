import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Players</h1>
      <div className="rounded-md border">
        <div className="border-b px-4 py-3 bg-muted/50">
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="flex items-center p-4 gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[100px] ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
