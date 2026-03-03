"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <TooltipProvider delayDuration={300}>{children}</TooltipProvider>;
}
