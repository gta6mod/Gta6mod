import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function withBasePath(path: string): string {
  if (!path || !path.startsWith('/') || path.startsWith('//') || path.startsWith('http')) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (base && !path.startsWith(base)) {
    return `${base}${path}`;
  }
  return path;
}
