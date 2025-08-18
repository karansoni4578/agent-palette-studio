declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-1T3CB063Y1";

// Track page views
export function trackPageView(url: string) {
  if (window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

// Track custom events
export function trackEvent(
  action: string,
  params: { [key: string]: any } = {}
) {
  if (window.gtag) {
    window.gtag("event", action, params);
  }
}