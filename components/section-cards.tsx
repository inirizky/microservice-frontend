import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Links } from "@/types/link"
import { Skeleton } from "./ui/skeleton"

export function SectionCards(
  {
    data,
    isLoading
  }:
    { data: Links, isLoading: boolean }
) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {!isLoading ? <Card className="@container/card flex ">
        <CardHeader>

          <CardDescription>Total Link</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.length}
          </CardTitle>
        </CardHeader>

      </Card> : (
        <Skeleton className="h-24 w-full" />
      )
      }

    </div>
  )
}
