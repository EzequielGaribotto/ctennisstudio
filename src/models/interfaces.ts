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

export interface ClickableButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  tooltipText?: string;
  tooltipKey?: string;
}

export interface EmailButtonProps {
  email: string;
  className?: string;
}

export interface CVDownloadButtonProps {
  className?: string;
}

export interface ThemeToggleButtonProps {
  className?: string;
}

export interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  backgroundColor?: string;
  titleAlign?: 'left' | 'center' | 'right';
  maxWidth?: string;  // Added new prop for maxWidth
}
