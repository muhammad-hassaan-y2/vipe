"use client"

import { trpc } from "@/trpc/server"
import { useSuspenseQuery } from "@tanstack/react-query"

export const Client = () => {
  const {data} = useSuspenseQuery(trpc.createAI.queryOptions({text: "Jia"}))

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}
