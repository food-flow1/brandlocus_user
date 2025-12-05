"use client";

import Image from "next/image";
import { icons } from "@/constants";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/lib/api";

interface TryAiAdvisorButtonProps {
  className?: string;
}

const TryAiAdvisorButton = ({ className }: TryAiAdvisorButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    // Check if user is authenticated
    const isAuthenticated = tokenStorage.isAuthenticated();
    
    if (isAuthenticated) {
      // Navigate to chat box if authenticated
      router.push(ROUTES.CHAT_BOX);
    } else {
      // Navigate to login if not authenticated
      router.push(ROUTES.LOGIN);
    }
  };

  return (
    <button
      className={cn(
        "shiny-button inline-flex items-center justify-center gap-2 relative z-10 font-medium transition-all cursor-pointer hover:scale-105",
        className
      )}
      onClick={handleClick}
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


