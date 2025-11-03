// Common component interfaces

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  forcePosition?: boolean;
  alternateText?: string;
  showAlternate?: boolean;
}

export interface ThemeToggleButtonProps {
  className?: string;
}
