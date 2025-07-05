import { Sandbox } from "@e2b/code-interpreter";

import { getSandbox } from "./utils";

import { inngest } from "./client";
import { openai, createAgent} from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

     const sandboxId = await step.run("get-sandbox-id", async () => {
       const sandbox = await Sandbox.create("vibe-nextjs-test234355");
       return sandbox.sandboxId;
     })

   const summarizer = createAgent({
    name: "summarizer",
    system: `You are an expert summarizer. You summarize in 2 words`,
    model: openai({model: "gpt-4o"}),
   });
   
   const { output } = await summarizer.run(
     `Summarizer the following text: ${event.data.value}`
   );
   console.log(output)

   const sandboxUrl = await step.run("get-sandbox-url", async () => {
    const sandbox = await getSandbox(sandboxId);
    const host = sandbox.getHost(3000);
    return `http://${host}`;
   }) 

    return { output, sandboxUrl };

  },
);
