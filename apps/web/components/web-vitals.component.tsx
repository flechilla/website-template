'use client'

import { useReportWebVitals } from 'next/web-vitals'

/**
 * Web Vitals reporting component for monitoring Core Web Vitals
 *
 * This component automatically reports Web Vitals metrics to your analytics provider.
 * Supports the following metrics:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay)
 * - CLS (Cumulative Layout Shift)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 * - INP (Interaction to Next Paint)
 *
 * @example
 * ```tsx
 * import { WebVitals } from '@/components/web-vitals.component'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <WebVitals />
 *         {children}
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function WebVitals() {
    useReportWebVitals((metric) => {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('📊 Web Vitals:', {
                name: metric.name,
                value: metric.value,
                rating: metric.rating,
                delta: metric.delta,
                id: metric.id,
            })
        }

        // Send to analytics in production
        if (process.env.NODE_ENV === 'production') {
            // Example: Send to Google Analytics
            // window.gtag?.('event', metric.name, {
            //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            //     event_label: metric.id,
            //     non_interaction: true,
            // })
            // Example: Send to custom analytics endpoint
            // fetch('/api/analytics/web-vitals', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         name: metric.name,
            //         value: metric.value,
            //         rating: metric.rating,
            //         delta: metric.delta,
            //         id: metric.id,
            //         navigationType: metric.navigationType,
            //     }),
            //     keepalive: true,
            // }).catch((error) => {
            //     console.error('Failed to send web vitals:', error)
            // })
            // Example: Send to Vercel Analytics
            // if (window.va) {
            //     window.va('event', {
            //         name: 'web-vitals',
            //         data: {
            //             metric: metric.name,
            //             value: metric.value,
            //             rating: metric.rating,
            //         },
            //     })
            // }
        }
    })

    return null
}

/**
 * Type definitions for Web Vitals metrics
 */
export type WebVitalsMetric = {
    /**
     * The name of the metric (e.g., 'LCP', 'FID', 'CLS')
     */
    name: 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB'

    /**
     * The current value of the metric
     */
    value: number

    /**
     * The delta between the current value and the last-reported value
     */
    delta: number

    /**
     * A unique ID representing this particular metric instance
     */
    id: string

    /**
     * The rating as to how good or bad the value is
     */
    rating: 'good' | 'needs-improvement' | 'poor'

    /**
     * The type of navigation
     */
    navigationType: 'navigate' | 'reload' | 'back-forward' | 'prerender'
}

/**
 * Core Web Vitals thresholds
 */
export const WEB_VITALS_THRESHOLDS = {
    LCP: {
        good: 2500,
        needsImprovement: 4000,
    },
    FID: {
        good: 100,
        needsImprovement: 300,
    },
    CLS: {
        good: 0.1,
        needsImprovement: 0.25,
    },
    FCP: {
        good: 1800,
        needsImprovement: 3000,
    },
    TTFB: {
        good: 800,
        needsImprovement: 1800,
    },
    INP: {
        good: 200,
        needsImprovement: 500,
    },
} as const
