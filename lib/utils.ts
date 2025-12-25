import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export type GTMEvent = {
  event: string;
  [key: string]: any;
};
const pushToDataLayer = (event: GTMEvent) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
};
export default pushToDataLayer;