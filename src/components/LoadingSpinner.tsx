import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = "Analyzing player data..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        {/* Basketball spinning animation */}
        <div className="w-12 h-12 bg-basketball rounded-full animate-bounce-basketball relative">
          <div className="absolute inset-0 bg-basketball rounded-full"></div>
          {/* Basketball lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-background transform -translate-y-px"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-background transform -translate-x-px"></div>
          <div className="absolute top-1 left-1 right-1 h-0.5 bg-background rounded-full transform rotate-45"></div>
          <div className="absolute top-1 left-1 right-1 h-0.5 bg-background rounded-full transform -rotate-45"></div>
        </div>
        
        {/* Spinning indicator */}
        <Loader2 className="w-6 h-6 text-primary animate-spin absolute -top-1 -right-1" />
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-foreground font-medium">{message}</p>
        <p className="text-muted-foreground text-sm">This may take a few seconds...</p>
      </div>
      
      {/* Progress dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}