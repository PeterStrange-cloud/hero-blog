import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 gap-4 text-center",
        className,
      )}
      data-ocid="page.error_state"
      role="alert"
    >
      <div className="p-3 rounded-full bg-destructive/10 border border-destructive/20">
        <AlertCircle className="size-6 text-destructive" />
      </div>
      <div className="space-y-1">
        <p className="font-display font-semibold text-foreground">{title}</p>
        <p className="type-body text-muted-foreground max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="gap-2"
          data-ocid="page.error_retry_button"
        >
          <RefreshCw className="size-4" />
          Try again
        </Button>
      )}
    </div>
  );
}

interface InlineErrorProps {
  message: string;
  className?: string;
}

export function InlineError({ message, className }: InlineErrorProps) {
  return (
    <p
      className={cn(
        "type-body text-destructive flex items-center gap-1.5",
        className,
      )}
      role="alert"
    >
      <AlertCircle className="size-3.5 shrink-0" />
      {message}
    </p>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 gap-4 text-center",
        className,
      )}
      data-ocid="page.empty_state"
    >
      {icon && (
        <div className="p-4 rounded-full bg-muted border border-border text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="font-display font-semibold text-foreground">{title}</p>
        {description && (
          <p className="type-body text-muted-foreground max-w-sm">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
