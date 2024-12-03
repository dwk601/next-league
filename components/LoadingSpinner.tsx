import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSpinner() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center p-8">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-24 mt-4" />
      </CardContent>
    </Card>
  );
}
