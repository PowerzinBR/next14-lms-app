import React from "react";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface CourseProgressProps {
  value: number;
  variant?: "success" | "default";
  size?: "sm" | "default";
}
const colorByVariant = {
  default: "bg-sky-700",
  success: "bg-green-500",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({
  value,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2" value={value} />
      <p
        className={
          (cn("font-medium mt-2 text-sky-700"),
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"])
        }
      >
        {Math.round(value)}% Completado
      </p>
    </div>
  );
};