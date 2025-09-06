import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripHtmlTags(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, '').trim();
}

export function getCleanExcerpt(content: string, maxLength: number = 150): string {
  if (!content) return "";
  const cleanContent = stripHtmlTags(content);
  return cleanContent.length > maxLength ? cleanContent.substring(0, maxLength) + "..." : cleanContent;
}
