"use client";

import Image from "next/image";
import { icons } from "@/constants";
import { cn } from "@/lib/utils";

interface TryAiAdvisorButtonProps {
  className?: string;
}

const TryAiAdvisorButton = ({ className }: TryAiAdvisorButtonProps) => {
  return (
    <button
      className={cn(
        "shiny-button inline-flex items-center justify-center gap-2 relative z-10 font-medium transition-colors cursor-pointer",
        className
      )}
    >
      <span className="relative z-10">Try Our AI Advisor</span>
      <Image
        src={icons.star}
        alt="star"
        width={16}
        height={16}
        className="relative z-10"
      />
    </button>
  );
};

export default TryAiAdvisorButton;


