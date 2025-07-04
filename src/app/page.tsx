"use client"
import {Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client";

export default function Home() {            
  const trpc = useTRPC();
  const invokeMutation = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background job Started");
    }
  }));

  

  return (
   <div className="p-4 max-w-7xl mx-auto">
       <Button>
          Click Me
        </Button>
   </div>
  );
}
