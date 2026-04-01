import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

//TODO: Should complete the landing page
export const Hero = () => {

  return (
    <div className="max-w-6xl mx-auto  flex flex-col justify-center items-center space-y-6 min-h-screen">
      <h1 className="font-medium text-6xl text-center max-w-xl mx-auto tracking-tight leading-16">
        The payment system for global agencies
      </h1>
      <p className="text-center max-w-sm mx-auto text-neutral-400">
        Invoice clients. Pay contractors worldwide. Settle in USDC on Solana —
        in seconds, not days.
      </p>
      <div className="flex items-center gap-3">
        <Button size="lg" className="px-4">Get Started</Button>
        <Button size="lg" variant={"outline"} className="px-4">
          View Demo
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
