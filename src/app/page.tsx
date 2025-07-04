"use client"
import {Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client";
import { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {    
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const invokeMutation = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background job Started");
    }
  }));


  return (
   <div className="p-4 max-w-7xl mx-auto">
    <Input value={value} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setValue(e.target.value)} />
       <Button disabled={invokeMutation.isPending} onClick={() => invokeMutation.mutate({ text: "John"})} >

          Click Me
        
        </Button>
   </div>
  );
}
