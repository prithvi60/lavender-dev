import * as React from "react";

import { cn } from "../../lib/utils";
import { Delete, LucideIcon } from "lucide-react";
import GetIcon from "../../assets/Icon/icon";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: string;
  endIcon?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
 
    return (
      <div className="w-full relative">
        {startIcon && (
          <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
            <GetIcon iconName={startIcon} size={18} className="text-muted-foreground" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-8" : "",
            endIcon ? "pr-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <GetIcon iconName={endIcon} className="text-muted-foreground" size={18} />
          </div>
        )}

      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
