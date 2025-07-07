"use client"
import {Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client";
import {  useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {    
  const [value, setValue] = useState("");
  const router = useRouter();

  const trpc = useTRPC();
  const createProject = useMutation(trpc.projects.create.mutationOptions({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: ( data, variables, context) => {
      router.push(`/projects/${data.id}`);
    },
  }));

  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () => {
      toast.success("Message created");
    }
  }));


  return (
   <div className="h-screen w-screen flex itemscenter justify-center ">
      <div className="max-w-7xl mx-auto flex items-center flex-col gap-y-4 justify-center">
    <Input value={value} onChange={(e) => setValue(e.target.value)} />
       <Button
        disabled={createProject.isPending} 
        onClick={() => createProject.mutate({ value: value})}
        >

         Submit

        </Button>
        </div>
   </div>
  );
}
