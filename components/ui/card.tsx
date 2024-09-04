import React from "react";
import { cn } from "@/lib/utils";

// Card 

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border border-blue-300 border-4 bg-black text-card-foreground shadow-2xl ", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Header card 

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// Title Card 

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight bg-gradient-to-r from-blue-500 via-yellow-500 to-pink-500 ", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// Description Card 

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground text-blue-200", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

// Content Card 

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

// Footer Card 

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// Export all 

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }