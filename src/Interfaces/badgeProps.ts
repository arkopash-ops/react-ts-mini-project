import type { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  color?: string;
  pill?: boolean;
  className?: string;
}