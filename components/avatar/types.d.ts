import { ButtonHTMLAttributes } from 'react';

export interface AvatarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  bgImage?: string;
}
