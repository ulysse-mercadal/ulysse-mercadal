import React from "react";
import { cn } from "@/lib/utils";

interface TimelineCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TimelineCard = React.forwardRef<HTMLDivElement, TimelineCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border border-white/20 rounded-lg p-4 transition-all shadow-md hover:scale-105 hover:shadow-lg",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TimelineCard.displayName = "TimelineCard";

export default TimelineCard;
