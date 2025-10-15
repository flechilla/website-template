# SEO Best Practices Implementation Plan for Next.js 15 Marketing Website Template

**Date:** 2025-10-15
**Version:** 1.0
**Project:** Next.js 15 Marketing Website Template with Turborepo

---

## Executive Summary

This implementation plan outlines a comprehensive approach to integrate SEO best practices into a Next.js 15 marketing website template built with Turborepo, React Server Components, and TypeScript. The implementation will leverage Next.js 15's native Metadata API, provide type-safe SEO utilities, implement JSON-LD structured data for rich search results, and ensure optimal Core Web Vitals performance.

The SEO system will be built as a dedicated `@workspace/seo` package to maximize reusability across multiple marketing websites within the monorepo architecture. This approach ensures:

- Centralized SEO configuration and utilities
- Type-safe metadata generation
- Reusable JSON-LD schema components
- Environment-based configuration
- Easy integration with future website templates

**Estimated Total Effort:** 4-6 weeks for full implementation and testing
**Complexity:** Medium to High

---

## Table of Contents

1. [Technical Analysis](#technical-analysis)
2. [Dependencies & Prerequisites](#dependencies--prerequisites)
3. [Architecture Overview](#architecture-overview)
4. [Folder Structure](#folder-structure)
5. [Implementation Phases](#implementation-phases)
6. [Configuration Strategy](#configuration-strategy)
7. [JSON-LD Schema Types](#json-ld-schema-types)
8. [Performance Optimizations](#performance-optimizations)
9. [Risk Assessment](#risk-assessment)
10. [Success Metrics](#success-metrics)
11. [References](#references)

---

## Technical Analysis

### Current State Assessment

**Existing Stack:**

- Next.js 15.4.5 with App Router and React Server Components
- React 19.1.1
- Turborepo 2.5.5 monorepo architecture
- TypeScript 5.7.3 (root) / 5.9.2 (packages)
- Tailwind CSS v4.1.11
- PostgreSQL with Drizzle ORM
- Existing packages: `@workspace/ui`, `@workspace/db`

**Current SEO Implementation:**

- No structured metadata implementation
- No JSON-LD structured data
- No sitemap generation
- No robots.txt configuration
- Basic layout.tsx with fonts but no metadata
- No Open Graph or Twitter Card implementation

**Gaps to Address:**

1. **Metadata Management**
    - No centralized metadata configuration
    - Missing dynamic metadata generation utilities
    - No type-safe metadata helpers

2. **Structured Data**
    - No JSON-LD implementation
    - Missing schema.org types for rich search results
    - No reusable structured data components

3. **Technical SEO**
    - No dynamic sitemap generation
    - No robots.txt configuration
    - No canonical URL management
    - Missing social media meta tags

4. **Performance**
    - Need optimization strategies for Core Web Vitals
    - Image optimization patterns not documented
    - Font loading already optimized (Geist fonts)

### Requirements Summary

1. **Dynamic Metadata System**
    - Static metadata objects for fixed pages
    - `generateMetadata` patterns for dynamic content
    - Hierarchical metadata inheritance
    - Type-safe metadata helpers

2. **JSON-LD Structured Data**
    - Organization, WebSite, WebPage schemas
    - Article, BlogPosting for content pages
    - FAQPage, BreadcrumbList for navigation
    - Product, Review for e-commerce features
    - LocalBusiness for location-based sites

3. **Technical SEO Infrastructure**
    - Dynamic sitemap.xml generation
    - Environment-aware robots.txt
    - Canonical URL management
    - Open Graph and Twitter Card tags

4. **Performance & Optimization**
    - Core Web Vitals optimization
    - Image loading strategies
    - Server-side rendering patterns
    - Streaming and Suspense patterns

---

## Dependencies & Prerequisites

### Required Dependencies

```json
{
    "dependencies": {
        "schema-dts": "^1.1.2"
    },
    "devDependencies": {
        "@types/node": "^20.19.9"
    }
}
```

**Dependency Breakdown:**

- **schema-dts**: TypeScript definitions for schema.org JSON-LD types
    - Provides type safety for structured data
    - Prevents schema markup errors
    - Enables IntelliSense for schema properties

### Environment Variables

Add to `.env.example` and `.env`:

```bash
# SEO Configuration
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_SITE_NAME="Your Marketing Site"
NEXT_PUBLIC_SITE_DESCRIPTION="Default site description"
NEXT_PUBLIC_TWITTER_HANDLE=@yourbrand
NEXT_PUBLIC_FACEBOOK_APP_ID=123456789

# Environment
NODE_ENV=development
```

### Prerequisites

- Node.js >= 20
- pnpm 10.4.1
- Existing Next.js 15 app in `apps/web`
- Database connection for dynamic content (already configured)

---

## Architecture Overview

### Package Structure Decision

**Decision: Create `@workspace/seo` Package**

**Rationale:**

1. **Reusability**: Multiple marketing websites can use the same SEO utilities
2. **Separation of Concerns**: SEO logic is isolated from application code
3. **Type Safety**: Centralized TypeScript types for SEO entities
4. **Testing**: Easier to unit test isolated SEO utilities
5. **Maintenance**: Updates to SEO best practices affect all sites consistently

**Alternative Considered:**

- Keep SEO utilities in `apps/web/lib/seo`
- **Rejected because**: Limited reusability, harder to share across multiple sites

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        apps/web                              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  App Router Pages (page.tsx, layout.tsx)            │  │
│  │  - Import metadata utilities from @workspace/seo    │  │
│  │  - Use generateMetadata for dynamic pages           │  │
│  │  - Render JSON-LD components                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│                           ▼                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Route Handlers (sitemap.ts, robots.ts)             │  │
│  │  - Generate dynamic sitemap                          │  │
│  │  - Generate robots.txt                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ imports
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   packages/seo (@workspace/seo)             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Core Utilities                                      │  │
│  │  - metadata-generator.ts (generateSiteMetadata)     │  │
│  │  - sitemap-generator.ts (generateSitemap)           │  │
│  │  - robots-generator.ts (generateRobots)             │  │
│  │  - url-utils.ts (canonical URLs, absolute URLs)     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  JSON-LD Components                                  │  │
│  │  - OrganizationSchema.tsx                           │  │
│  │  - WebSiteSchema.tsx                                │  │
│  │  - BreadcrumbSchema.tsx                             │  │
│  │  - FAQSchema.tsx                                    │  │
│  │  - ArticleSchema.tsx                                │  │
│  │  - ProductSchema.tsx                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Configuration & Types                               │  │
│  │  - config.ts (site-wide SEO config)                 │  │
│  │  - types.ts (TypeScript types)                      │  │
│  │  - constants.ts (default values, schema.org URLs)   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns

1. **Configuration-First Approach**
    - Central `seoConfig` object for site-wide defaults
    - Environment-based configuration overrides
    - Per-page metadata overrides

2. **Component-Based JSON-LD**
    - React Server Components for JSON-LD rendering
    - Type-safe props using `schema-dts`
    - Sanitization for XSS prevention

3. **Utility-First Metadata**
    - Helper functions for generating metadata objects
    - Reusable patterns for common metadata scenarios
    - Automatic defaults with override capability

4. **Performance-Optimized**
    - Server-side generation for all SEO elements
    - Static generation where possible
    - Minimal client-side JavaScript

---

## Folder Structure

### New `@workspace/seo` Package Structure

```
packages/seo/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                                    # Main exports
│   ├── config/
│   │   ├── index.ts                                # Re-exports
│   │   ├── seo.config.ts                           # SEO configuration
│   │   ├── schema-org.constant.ts                  # Constants (schema.org URLs, etc.)
│   │   └── seo-config.type.ts                      # Configuration types
│   ├── utils/
│   │   ├── index.ts                                # Re-exports
│   │   ├── metadata-generator.util.ts              # Metadata generation utilities
│   │   ├── sitemap-generator.util.ts               # Sitemap generation
│   │   ├── robots-generator.util.ts                # Robots.txt generation
│   │   ├── url.util.ts                             # URL utilities (canonical, absolute)
│   │   ├── sanitize.util.ts                        # XSS sanitization for JSON-LD
│   │   └── image.util.ts                           # Image metadata helpers
│   ├── schemas/
│   │   ├── index.ts                                # Export all schemas
│   │   ├── OrganizationSchema.tsx                  # Organization JSON-LD
│   │   ├── WebSiteSchema.tsx                       # WebSite JSON-LD
│   │   ├── WebPageSchema.tsx                       # WebPage JSON-LD
│   │   ├── ArticleSchema.tsx                       # Article/BlogPosting JSON-LD
│   │   ├── BreadcrumbSchema.tsx                    # BreadcrumbList JSON-LD
│   │   ├── FAQSchema.tsx                           # FAQPage JSON-LD
│   │   ├── ProductSchema.tsx                       # Product JSON-LD
│   │   ├── ReviewSchema.tsx                        # Review JSON-LD
│   │   ├── LocalBusinessSchema.tsx                 # LocalBusiness JSON-LD
│   │   └── schema-props.type.ts                    # Schema component prop types
│   └── types/
│       ├── index.ts                                # Export all types
│       ├── metadata/
│       │   ├── index.ts                            # Re-exports
│       │   ├── seo-config.type.ts                  # SEO configuration type
│       │   ├── page-metadata.type.ts               # Page metadata type
│       │   ├── open-graph.type.ts                  # Open Graph types
│       │   ├── twitter-card.type.ts                # Twitter Card types
│       │   └── image-metadata.type.ts              # Image metadata types
│       ├── sitemap/
│       │   ├── index.ts                            # Re-exports
│       │   ├── sitemap-entry.type.ts               # Sitemap entry type
│       │   ├── sitemap-route.type.ts               # Sitemap route type
│       │   └── sitemap-config.type.ts              # Sitemap config type
│       └── schema/
│           ├── index.ts                            # Re-exports
│           ├── organization.type.ts                # Organization schema type
│           ├── website.type.ts                     # Website schema type
│           ├── article.type.ts                     # Article schema type
│           ├── product.type.ts                     # Product schema type
│           ├── breadcrumb.type.ts                  # Breadcrumb schema type
│           ├── faq.type.ts                         # FAQ schema type
│           ├── review.type.ts                      # Review schema type
│           └── local-business.type.ts              # LocalBusiness schema type
└── README.md                                        # Package documentation
```

### Modified `apps/web` Structure

```
apps/web/
├── app/
│   ├── layout.tsx                        # Root layout with metadata
│   ├── page.tsx                          # Homepage with JSON-LD
│   ├── sitemap.ts                        # Dynamic sitemap generation
│   ├── robots.ts                         # Robots.txt generation
│   ├── opengraph-image.tsx               # OG image generation (optional)
│   ├── blog/
│   │   ├── page.tsx                      # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx                  # Blog post with generateMetadata
│   ├── products/
│   │   ├── page.tsx                      # Products listing
│   │   └── [slug]/
│   │       └── page.tsx                  # Product detail with schema
│   └── about/
│       └── page.tsx                      # About page with Organization schema
├── lib/
│   └── seo-config.ts                     # App-specific SEO configuration
└── config/
    └── seo.ts                            # Site-specific SEO constants
```

### Integration with Existing Packages

```
packages/
├── seo/                                  # New package
├── ui/                                   # Existing - may add SEO-friendly components
├── db/                                   # Existing - query data for SEO
├── eslint-config/                        # Existing
└── typescript-config/                    # Existing
```

---

## Implementation Phases

### Phase 1: Foundation & Package Setup (DONE)

**Objective:** Create the `@workspace/seo` package with core infrastructure and configuration system.

**Estimated Effort:** 4-5 days
**Complexity:** Medium

**Tasks:**

1. **Create SEO Package Structure** (DONE)
    - Create `packages/seo/` directory
    - Initialize `package.json` with proper exports map
    - Configure `tsconfig.json` for TypeScript compilation
    - Set up package exports for utilities, schemas, and types

2. **Install Dependencies** (DONE)
    - Add `schema-dts` for TypeScript schema.org types
    - Update `pnpm-workspace.yaml` if needed
    - Run `pnpm install` to link workspace packages

3. **Create Core Configuration System** (DONE)
    - Implement `packages/seo/src/config/seo.config.ts` with `SEOConfig` type
    - Create `packages/seo/src/config/schema-org.constant.ts` with schema.org URLs (use SCREAMING_SNAKE_CASE)
    - Define TypeScript types in `packages/seo/src/config/seo-config.type.ts`
    - Add environment variable reading utilities
    - Create `packages/seo/src/config/index.ts` for re-exports

4. **Create Base Types**
    - Create type folder structure: `metadata/`, `sitemap/`, `schema/`
    - Define metadata types in separate files (one type per file):
        - `packages/seo/src/types/metadata/seo-config.type.ts`
        - `packages/seo/src/types/metadata/page-metadata.type.ts`
        - `packages/seo/src/types/metadata/open-graph.type.ts`
        - `packages/seo/src/types/metadata/twitter-card.type.ts`
    - Define sitemap types:
        - `packages/seo/src/types/sitemap/sitemap-entry.type.ts`
        - `packages/seo/src/types/sitemap/sitemap-route.type.ts`
    - Define schema types:
        - `packages/seo/src/types/schema/organization.type.ts`
        - `packages/seo/src/types/schema/article.type.ts`
        - Additional schema types as needed
    - Create index.ts files in each folder for re-exports
    - Export all types from `packages/seo/src/types/index.ts`

5. **Update Turbo Configuration**
    - Add build task for `@workspace/seo` in `turbo.json`
    - Ensure proper build dependencies

6. **Add Package to Web App**
    - Add `@workspace/seo` dependency to `apps/web/package.json`
    - Run `pnpm install` to link the package

**Deliverables:**

- Functional `@workspace/seo` package
- Type-safe configuration system
- Package properly integrated into monorepo

**Testing:**

- Import configuration in `apps/web` to verify package linking
- Validate TypeScript compilation
- Ensure Turborepo recognizes the new package

**Dependencies:** None

---

### Phase 2: Metadata Generation Utilities (DONE)

**Objective:** Build utilities for generating Next.js 15 Metadata API objects with type safety and defaults.

**Estimated Effort:** 5-6 days
**Complexity:** Medium

**Tasks:**

1. **Create URL Utilities**
    - Implement `packages/seo/src/utils/url.util.ts`
    - Functions: `getAbsoluteUrl()`, `getCanonicalUrl()`, `buildUrl()`
    - Handle environment-based base URL
    - Support locale and path parameter handling
    - Add JSDoc comments for all functions

2. **Create Metadata Generator**
    - Implement `packages/seo/src/utils/metadata-generator.util.ts`
    - Function: `generateSiteMetadata(overrides)`
    - Generate Next.js 15 `Metadata` object
    - Support title templates, descriptions, Open Graph, Twitter Cards
    - Handle robots meta tags
    - Implement metadata inheritance pattern
    - Add JSDoc comments with usage examples

3. **Create Image Metadata Helpers**
    - Implement `packages/seo/src/utils/image.util.ts`
    - Function: `generateImageMetadata(image)`
    - Handle Open Graph image generation
    - Support image alt text, dimensions, type
    - Generate secure URLs for images
    - Add JSDoc comments

4. **Create Sanitization Utilities**
    - Implement `packages/seo/src/utils/sanitize.util.ts`
    - Function: `sanitizeForJsonLd(obj)`
    - Prevent XSS by escaping HTML characters
    - Replace `<` with `\u003c` in JSON-LD strings
    - Handle nested objects and arrays
    - Add security-focused JSDoc comments

5. **Update Main Package Exports**
    - Create `packages/seo/src/utils/index.ts` for re-exports
    - Export all utilities from `packages/seo/src/index.ts`
    - Ensure proper TypeScript types are exported

6. **Integrate with Web App**
    - Create `apps/web/lib/seo-config.ts` with site-specific config
    - Update `apps/web/app/layout.tsx` with metadata export
    - Add metadata to root layout using `generateSiteMetadata`

**Deliverables:**

- Complete metadata generation utilities
- Type-safe helpers for all metadata types
- Root layout with proper metadata

**Testing:**

- Verify metadata appears in HTML `<head>`
- Test Open Graph tags with Facebook Sharing Debugger
- Test Twitter Cards with Twitter Card Validator
- Validate canonical URLs are correct

**Dependencies:** Phase 1

---

### Phase 3: JSON-LD Structured Data Components (DONE)

**Objective:** Create reusable React Server Components for all major schema.org types with type safety.

**Estimated Effort:** 7-9 days
**Complexity:** Medium-High

**Tasks:**

1. **Create Base JSON-LD Component**
    - Implement `packages/seo/src/schemas/schema-props.type.ts` with base types
    - Create helper function `JsonLd<T extends Thing>(json: WithContext<T>):` (https://www.npmjs.com/package/schema-dts)
    - Handle sanitization automatically
    - Use `dangerouslySetInnerHTML` with sanitized content
    - Add JSDoc comments

2. **Implement Organization Schema**
    - Create `packages/seo/src/schemas/OrganizationSchema.tsx`
    - Define `OrganizationSchemaProps` type (use `type`, not `interface`)
    - Props: name, logo, url, contactPoint, socialLinks
    - Use `schema-dts` types for type safety
    - Support nested address and contact info
    - Add JSDoc comments

3. **Implement WebSite Schema**
    - Create `packages/seo/src/schemas/WebSiteSchema.tsx`
    - Define `WebSiteSchemaProps` type
    - Props: name, url, description, searchAction
    - Enable sitelinks searchbox
    - Support potential actions
    - Add JSDoc comments

4. **Implement WebPage Schema**
    - Create `packages/seo/src/schemas/WebPageSchema.tsx`
    - Define `WebPageSchemaProps` type
    - Props: name, description, url, breadcrumb
    - Link to Organization schema
    - Add JSDoc comments

5. **Implement Article/BlogPosting Schema**
    - Create `packages/seo/src/schemas/ArticleSchema.tsx`
    - Define `ArticleSchemaProps` type
    - Props: headline, author, datePublished, dateModified, image
    - Support Article and BlogPosting types via prop
    - Include publisher information
    - Add JSDoc comments

6. **Implement BreadcrumbList Schema**
    - Create `packages/seo/src/schemas/BreadcrumbSchema.tsx`
    - Define `BreadcrumbSchemaProps` type
    - Props: items (array of breadcrumb items)
    - Auto-generate position numbers
    - Support dynamic breadcrumb generation
    - Add JSDoc comments

7. **Implement FAQPage Schema**
    - Create `packages/seo/src/schemas/FAQSchema.tsx`
    - Define `FAQSchemaProps` type
    - Props: questions (array of Q&A objects)
    - Format according to FAQPage schema
    - Validate question/answer structure
    - Add JSDoc comments

8. **Implement Product Schema**
    - Create `packages/seo/src/schemas/ProductSchema.tsx`
    - Define `ProductSchemaProps` type
    - Props: name, description, image, offers, aggregateRating
    - Support price, availability, currency
    - Include brand and SKU
    - Add JSDoc comments

9. **Implement Review Schema**
    - Create `packages/seo/src/schemas/ReviewSchema.tsx`
    - Define `ReviewSchemaProps` type
    - Props: itemReviewed, author, reviewRating, reviewBody
    - Support aggregate reviews
    - Link to product or service
    - Add JSDoc comments

10. **Implement LocalBusiness Schema**
    - Create `packages/seo/src/schemas/LocalBusinessSchema.tsx`
    - Define `LocalBusinessSchemaProps` type
    - Props: name, address, geo, openingHours, telephone
    - Support business type selection
    - Include service areas
    - Add JSDoc comments

11. **Export All Schemas**
    - Update `packages/seo/src/schemas/index.ts`
    - Export all schema components
    - Document usage patterns

12. **Integration Examples**
    - Add Organization schema to homepage
    - Add Article schema to blog post template
    - Add BreadcrumbList to layouts
    - Add FAQPage schema to FAQ page

**Deliverables:**

- 10 JSON-LD schema components
- Type-safe implementation with `schema-dts`
- XSS-safe rendering
- Usage examples in web app

**Testing:**

- Validate all schemas with Google Rich Results Test
- Test with Schema.org Validator
- Verify no XSS vulnerabilities
- Check schema nesting and references

**Dependencies:** Phase 2

---

### Phase 4: Dynamic Metadata for Content Pages

**Objective:** Implement `generateMetadata` patterns for dynamic routes like blog posts, products, and case studies.

**Estimated Effort:** 4-5 days
**Complexity:** Medium

**Tasks:**

1. **Create Dynamic Metadata Helpers**
    - Implement `packages/seo/src/utils/dynamic-metadata.ts`
    - Function: `generateDynamicMetadata(pageData, type)`
    - Support blog, product, author page types
    - Handle missing data with fallbacks

2. **Add JSON-LD to Dynamic Pages**
    - Add ArticleSchema to blog post pages
    - Add ProductSchema to product pages
    - Add BreadcrumbSchema to all dynamic pages
    - Ensure data consistency between metadata and JSON-LD

3. **Implement Metadata Caching Strategy**
    - Use Next.js caching for metadata generation
    - Implement ISR for frequently accessed pages
    - Cache database queries in generateMetadata

**Deliverables:**

- Dynamic metadata for all content types
- Consistent metadata patterns
- JSON-LD on dynamic pages
- Optimized caching strategy

**Testing:**

- Verify dynamic titles appear correctly
- Test with various content types
- Validate Open Graph tags show correct images
- Check metadata performance (no N+1 queries)

**Dependencies:** Phase 3

---

### Phase 5: Sitemap & Robots.txt Generation

**Objective:** Implement dynamic sitemap.xml and robots.txt generation with support for multi-page sitemaps.

**Estimated Effort:** 3-4 days
**Complexity:** Medium

**Tasks:**

1. **Create Sitemap Generation Utility**
    - Implement `packages/seo/src/utils/sitemap-generator.util.ts`
    - Function: `generateSitemapEntries(routes)`
    - Support priority, changeFrequency, lastModified
    - Handle dynamic routes
    - Support sitemap index for large sites
    - Add JSDoc comments

2. **Implement Sitemap Route Handler**
    - Create `apps/web/app/sitemap.ts`
    - Export async function returning MetadataRoute.Sitemap
    - Fetch dynamic routes from database
    - Include blog posts, products, pages
    - Set appropriate priorities and frequencies

3. **Create Robots.txt Generator**
    - Implement `packages/seo/src/utils/robots-generator.util.ts`
    - Function: `generateRobots(env)`
    - Support environment-based rules
    - Include sitemap URL
    - Handle staging vs production
    - Add JSDoc comments

4. **Implement Robots.txt Route Handler**
    - Create `apps/web/app/robots.ts`
    - Export function returning MetadataRoute.Robots
    - Block indexing in non-production environments
    - Include sitemap reference
    - Set crawl delay if needed

5. **Add Sitemap to Layout**
    - Reference sitemap in root layout metadata
    - Add link to sitemap in footer or appropriate location

6. **Implement Sitemap Index (if needed)**
    - For large sites, create `apps/web/app/sitemap-[id].ts`
    - Split sitemap into multiple files
    - Generate sitemap index file

**Deliverables:**

- Dynamic sitemap.xml generation
- Environment-aware robots.txt
- Sitemap utilities in SEO package
- Multi-sitemap support for scaling

**Testing:**

- Access /sitemap.xml and verify structure
- Access /robots.txt and verify rules
- Validate sitemap with Google Search Console
- Test environment-based blocking
- Verify all dynamic routes are included

**Dependencies:** Phase 4

---

### Phase 6: Performance Optimization & Core Web Vitals

**Objective:** Optimize SEO-related performance, ensure fast loading times, and optimize Core Web Vitals metrics.

**Estimated Effort:** 5-6 days
**Complexity:** Medium-High

**Tasks:**

2. **Font Loading Optimization**
    - Already using `next/font` with Geist (optimized)
    - Verify font display strategy (swap, optional, etc.)
    - Minimize font weights loaded
    - Preload critical fonts if needed

3. **Metadata Performance**
    - Implement static metadata where possible
    - Cache database queries in `generateMetadata`
    - Use Suspense boundaries for metadata loading
    - Avoid blocking metadata generation

4. **Critical CSS Strategy**
    - Ensure Tailwind CSS is optimized
    - Remove unused CSS classes
    - Inline critical CSS for above-the-fold content
    - Defer non-critical styles

5. **Server Component Optimization**
    - Use Server Components for all SEO components
    - Minimize client-side JavaScript
    - Stream content when possible
    - Use Suspense for slow data fetching

6. **Implement Resource Hints**
    - Add `dns-prefetch` for external resources
    - Add `preconnect` for critical origins
    - Use `preload` for critical resources
    - Implement `fetchPriority` for important images

7. **Core Web Vitals Monitoring Setup**
    - Add Web Vitals reporting (optional, using Next.js built-in)
    - Monitor LCP (Largest Contentful Paint)
    - Monitor FID (First Input Delay) / INP (Interaction to Next Paint)
    - Monitor CLS (Cumulative Layout Shift)

8. **Create Performance Documentation**
    - Document image optimization patterns
    - Document font loading strategy
    - Document caching strategies
    - Create performance checklist

**Deliverables:**

- Optimized images with `next/image`
- Fast metadata generation
- Minimal JavaScript for SEO
- Core Web Vitals documentation
- Performance checklist

**Testing:**

- Run Lighthouse audit (aim for 90+ SEO score)
- Test Core Web Vitals with PageSpeed Insights
- Verify LCP < 2.5s
- Verify CLS < 0.1
- Test on slow network conditions

**Dependencies:** Phases 1-5

---

### Phase 7: Advanced SEO Features

**Objective:** Implement advanced SEO features like hreflang tags, canonical URLs, and pagination handling.

**Estimated Effort:** 4-5 days
**Complexity:** Medium

**Tasks:**

1. **Canonical URL Implementation**
    - Add canonical URL to all metadata
    - Handle query parameters correctly
    - Implement self-referencing canonical
    - Handle pagination canonical tags

2. **Hreflang Tags (if multi-language)**
    - Implement hreflang tag generation
    - Support multiple language versions
    - Add x-default fallback
    - Handle regional variations

3. **Pagination SEO**
    - Implement rel="next" and rel="prev" for paginated content
    - Add page numbers to titles for paginated pages
    - Update canonical for pagination
    - Handle "View All" pages if applicable

4. **404 and Error Page SEO**
    - Create `apps/web/app/not-found.tsx` with metadata
    - Set proper 404 status
    - Add suggestions or search
    - Include helpful links

5. **Redirect Handling**
    - Document redirect patterns for moved content
    - Implement 301 redirects for old URLs
    - Create redirect utilities if needed

6. **Duplicate Content Prevention**
    - Audit potential duplicate content issues
    - Implement canonical tags consistently
    - Use robots meta tags where appropriate
    - Add noindex to admin or private pages

7. **Social Media Sharing Optimization**
    - Add Twitter Card meta tags to all pages
    - Add Open Graph tags to all pages
    - Create social sharing image templates
    - Implement dynamic OG image generation (optional)

**Deliverables:**

- Canonical URLs on all pages
- Hreflang support (if needed)
- Pagination handling
- 404 page optimization
- Social sharing optimization

**Testing:**

- Verify canonical URLs are correct
- Test social media sharing on Twitter/Facebook
- Check hreflang implementation (if applicable)
- Test pagination SEO
- Verify 404 page returns correct status

**Dependencies:** Phases 1-6

---

### Phase 8: Testing & Validation

**Objective:** Comprehensive testing and validation of all SEO implementations using industry-standard tools.

**Estimated Effort:** 5-6 days
**Complexity:** Medium

**Tasks:**

1. **Schema Validation**
    - Test all JSON-LD schemas with Google Rich Results Test
    - Validate with Schema.org validator
    - Check for schema errors and warnings
    - Test schema nesting and references
    - Document validation results

2. **Metadata Validation**
    - Verify all pages have unique titles and descriptions
    - Check title length (< 60 characters)
    - Check description length (< 160 characters)
    - Validate Open Graph tags with Facebook Debugger
    - Validate Twitter Cards with Twitter Validator

3. **SEO Audit**
    - Run Lighthouse SEO audit on all major pages
    - Aim for 90+ SEO score
    - Fix any identified issues
    - Document audit results

4. **Technical SEO Testing**
    - Verify sitemap.xml is accessible and valid
    - Test robots.txt rules
    - Check canonical URLs
    - Verify mobile responsiveness
    - Test page load speed

5. **Accessibility Testing**
    - Run WAVE accessibility checker
    - Verify proper heading hierarchy
    - Check alt text on images
    - Ensure keyboard navigation
    - Test screen reader compatibility

6. **Cross-Browser Testing**
    - Test metadata rendering in Chrome, Firefox, Safari
    - Verify JSON-LD parsing
    - Check social media previews
    - Test mobile rendering

7. **Create Testing Checklist**
    - Document all testing steps
    - Create reusable testing checklist
    - Include tool links and guides
    - Add to project documentation

8. **Performance Testing**
    - Run PageSpeed Insights on all pages
    - Measure Core Web Vitals
    - Test on slow 3G connection
    - Verify server response times

**Deliverables:**

- All schemas validated
- SEO audit passed (90+ score)
- Testing checklist
- Performance report
- Bug fixes for identified issues

**Testing Tools:**

- Google Rich Results Test
- Schema.org Validator
- Facebook Sharing Debugger
- Twitter Card Validator
- Google Lighthouse
- PageSpeed Insights
- WAVE Accessibility Checker

**Dependencies:** Phases 1-7

---

### Phase 9: Unit Testing & Test Coverage

**Objective:** Implement comprehensive unit tests for all SEO utilities, components, and edge cases to ensure reliability and maintainability.

**Estimated Effort:** 6-7 days
**Complexity:** Medium-High

**Tasks:**

1. **Set Up Testing Infrastructure**
    - Add Vitest to `packages/seo/package.json`
    - Configure `vitest.config.ts` for the SEO package
    - Set up test coverage reporting (aim for 80%+ coverage)
    - Add test scripts to package.json
    - Configure TypeScript for test files

2. **Test Metadata Generation Utilities**
    - Create `packages/seo/src/utils/__tests__/metadata-generator.test.ts`
    - Test `generateSiteMetadata()` with various inputs
    - Test title template generation
    - Test default fallbacks for missing data
    - Test metadata merging and inheritance
    - Test Open Graph and Twitter Card generation
    - Mock environment variables for testing

3. **Test URL Utilities**
    - Create `packages/seo/src/utils/__tests__/url-utils.test.ts`
    - Test `getAbsoluteUrl()` with various paths
    - Test `getCanonicalUrl()` behavior
    - Test query parameter handling
    - Test trailing slash handling
    - Test URL encoding edge cases

4. **Test Sanitization Utilities**
    - Create `packages/seo/src/utils/__tests__/sanitize.test.ts`
    - Test XSS prevention in JSON-LD
    - Test HTML entity escaping
    - Test nested object sanitization
    - Test array sanitization
    - Test malicious script injection prevention

5. **Test Sitemap Generation**
    - Create `packages/seo/src/utils/__tests__/sitemap-generator.test.ts`
    - Test sitemap entry generation
    - Test priority assignment
    - Test change frequency calculation
    - Test lastModified date formatting
    - Test large sitemap splitting

6. **Test Robots.txt Generation**
    - Create `packages/seo/src/utils/__tests__/robots-generator.test.ts`
    - Test environment-based rules (dev, staging, production)
    - Test crawl delay settings
    - Test sitemap URL inclusion
    - Test user-agent specific rules

7. **Test JSON-LD Schema Components**
    - Create test files for each schema component
    - Test schema rendering with valid props
    - Test required vs optional properties
    - Test type safety with TypeScript
    - Test sanitization in schema output
    - Mock `schema-dts` types for testing

8. **Integration Tests for Web App**
    - Create `apps/web/app/__tests__/metadata.test.ts`
    - Test root layout metadata
    - Test dynamic page metadata generation
    - Mock database calls for testing
    - Test error handling for missing data

9. **Test Coverage Analysis**
    - Run coverage reports: `pnpm --filter @workspace/seo test:coverage`
    - Identify untested code paths
    - Add tests for edge cases
    - Achieve minimum 80% coverage for SEO package

10. **CI/CD Integration**
    - Add test task to `turbo.json`
    - Update CI pipeline to run tests
    - Add coverage reporting to CI
    - Set up quality gates for PRs

11. **Create Test Documentation**
    - Document testing strategy in `packages/seo/README.md`
    - Provide test examples for common scenarios
    - Document mocking patterns
    - Create testing best practices guide

**Deliverables:**

- Comprehensive test suite for all SEO utilities
- 80%+ test coverage for `@workspace/seo` package
- Integration tests for web app
- Testing documentation
- CI/CD integration for automated testing

**Testing Strategy:**

- Unit tests for all utility functions
- Component tests for JSON-LD schemas
- Integration tests for metadata generation
- Mock external dependencies (database, environment)
- Test edge cases and error handling

**Note:** Leverage the `unit-testing` agent for expert guidance on testing patterns and best practices.

**Dependencies:** Phases 1-8

---

### Phase 10: Documentation & Knowledge Transfer

**Objective:** Create comprehensive documentation for the SEO implementation, including usage guides, best practices, and examples.

**Estimated Effort:** 4-5 days
**Complexity:** Medium

**Tasks:**

1. **Create SEO Package README**
    - Write `packages/seo/README.md`
    - Document all exported utilities
    - Provide usage examples for each function
    - Include TypeScript type documentation
    - Add troubleshooting section

2. **Create Implementation Guide**
    - Write implementation guide in `docs/seo-implementation-guide.md`
    - Step-by-step setup instructions
    - Configuration examples
    - Integration patterns with Next.js 15
    - Environment setup guide

3. **Document JSON-LD Schemas**
    - Create schema documentation in `docs/json-ld-schemas.md`
    - List all available schema types
    - Provide usage examples for each schema
    - Document required vs optional properties
    - Include validation tips

4. **Create Best Practices Guide**
    - Write `docs/seo-best-practices.md`
    - Document SEO best practices for marketing sites
    - Title and description optimization tips
    - Image optimization guidelines
    - Performance optimization strategies
    - Common pitfalls and how to avoid them

5. **Document Configuration Options**
    - Create `docs/seo-configuration.md`
    - Document all configuration options
    - Provide environment variable reference
    - Include example configurations for different site types
    - Document override patterns

6. **Create Usage Examples**
    - Add example pages to `apps/web/app/examples/`
    - Example blog post with full SEO
    - Example product page with schema
    - Example homepage with organization schema
    - Example FAQ page with FAQ schema

7. **Document Testing Strategy**
    - Write testing guide in `docs/seo-testing.md`
    - List all testing tools and how to use them
    - Provide testing checklist
    - Document validation procedures
    - Include troubleshooting common issues

8. **Create Migration Guide**
    - Write migration guide for existing projects
    - Document how to add SEO to existing Next.js apps
    - Provide step-by-step migration instructions
    - Include rollback procedures
    - Document breaking changes (if any)

9. **Add Code Comments**
    - Ensure all utilities have JSDoc comments
    - Document function parameters and return types
    - Add usage examples in comments
    - Document edge cases and limitations

10. **Create Video/Visual Guides (Optional)**
    - Record setup walkthrough video
    - Create diagrams for architecture
    - Screenshot social media previews
    - Create visual testing guide

11. **Update Main Project Documentation**
    - Update root `README.md` with SEO package info
    - Add SEO section to `CLAUDE.md`
    - Document import patterns
    - Add SEO to project overview

12. **Create Maintenance Guide**
    - Document how to update schemas
    - Guide for adding new schema types
    - Documentation update procedures
    - Version upgrade guide

**Deliverables:**

- Complete package README
- Implementation guide
- Best practices documentation
- Usage examples
- Testing documentation
- Migration guide

**Documentation Structure:**

```
docs/
├── seo/
│   ├── implementation-guide.md
│   ├── json-ld-schemas.md
│   ├── best-practices.md
│   ├── configuration.md
│   ├── testing.md
│   └── migration-guide.md
└── README.md (update with SEO section)
```

**Note:** Leverage the `documentation-writer` agent for expert guidance on creating comprehensive, user-friendly documentation.

**Dependencies:** Phases 1-9

---

## Configuration Strategy

### Configuration Layers

The SEO system uses a three-layer configuration approach:

1. **Global Defaults** (`packages/seo/src/config/index.ts`)
    - Package-level defaults
    - Schema.org URLs
    - Default metadata values

2. **Site Configuration** (`apps/web/lib/seo-config.ts`)
    - Site-specific settings
    - Environment variable reading
    - Organization information
    - Social media handles

3. **Page-Level Overrides** (in individual page.tsx files)
    - Per-page metadata
    - Dynamic content metadata
    - Page-specific JSON-LD

### Configuration Example

**packages/seo/src/config/index.ts**

```typescript
export type SEOConfig = {
    siteUrl: string
    siteName: string
    siteDescription: string
    defaultImage: string
    twitterHandle?: string
    facebookAppId?: string
    locale: string
    organization?: {
        name: string
        logo: string
        url: string
        contactPoint?: ContactPoint[]
        socialLinks?: string[]
    }
}

export const DEFAULT_SEO_CONFIG: Partial<SEOConfig> = {
    locale: 'en_US',
    defaultImage: '/og-image.jpg',
}
```

**apps/web/lib/seo-config.ts**

```typescript
import { SEOConfig } from '@workspace/seo'

export const SEO_CONFIG: SEOConfig = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Your Marketing Site',
    siteDescription:
        process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Default description',
    defaultImage: '/images/og-default.jpg',
    twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    facebookAppId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    locale: 'en_US',
    organization: {
        name: 'Your Company',
        logo: '/images/logo.png',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: '+1-555-555-5555',
                contactType: 'Customer Service',
                areaServed: 'US',
                availableLanguage: ['English'],
            },
        ],
        socialLinks: [
            'https://twitter.com/yourbrand',
            'https://facebook.com/yourbrand',
            'https://linkedin.com/company/yourbrand',
        ],
    },
}
```

### Environment Variables

Required environment variables in `.env`:

```bash
# SEO Configuration
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_SITE_NAME="Your Marketing Site"
NEXT_PUBLIC_SITE_DESCRIPTION="Your site description"
NEXT_PUBLIC_TWITTER_HANDLE=@yourbrand
NEXT_PUBLIC_FACEBOOK_APP_ID=123456789

# Environment
NODE_ENV=production
```

### Per-Page Configuration

**Static Metadata Example:**

```typescript
// apps/web/app/about/page.tsx
import { generateSiteMetadata } from '@workspace/seo'
import { Metadata } from 'next'

import { SEO_CONFIG } from '@/lib/seo-config'

export const metadata: Metadata = generateSiteMetadata(SEO_CONFIG, {
    title: 'About Us',
    description: 'Learn more about our company and mission',
    openGraph: {
        images: ['/images/about-og.jpg'],
    },
})
```

**Dynamic Metadata Example:**

```typescript
// apps/web/app/blog/[slug]/page.tsx
import { generateSiteMetadata } from '@workspace/seo'
import { Metadata } from 'next'

import { SEO_CONFIG } from '@/lib/seo-config'

export async function generateMetadata({ params }): Promise<Metadata> {
    const post = await getPost(params.slug)

    return generateSiteMetadata(SEO_CONFIG, {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author.name],
            images: [post.featuredImage],
        },
    })
}
```

---

## JSON-LD Schema Types

### Schema Type Priority Matrix

Based on marketing website requirements and search engine importance:

| Schema Type         | Priority   | Use Case                         | Implementation Phase |
| ------------------- | ---------- | -------------------------------- | -------------------- |
| Organization        | High       | Company information, branding    | Phase 3              |
| WebSite             | High       | Site-wide search, sitelinks      | Phase 3              |
| WebPage             | Medium     | Generic pages                    | Phase 3              |
| Article/BlogPosting | High       | Blog content, news               | Phase 3              |
| BreadcrumbList      | High       | Navigation, user experience      | Phase 3              |
| FAQPage             | Medium     | FAQ sections, support            | Phase 3              |
| Product             | High       | E-commerce, SaaS products        | Phase 3              |
| Review              | Medium     | Product reviews, testimonials    | Phase 3              |
| LocalBusiness       | Low-Medium | Location-based businesses        | Phase 3              |
| Event               | Low        | Webinars, conferences (optional) | Future               |
| VideoObject         | Low        | Video content (optional)         | Future               |

### Schema Implementation Details

**1. Organization Schema**

- **Location:** Homepage, About page
- **Required Properties:** name, url, logo
- **Optional Properties:** contactPoint, address, socialLinks
- **Rich Result:** Knowledge Graph, brand panel

**2. WebSite Schema**

- **Location:** Root layout (all pages)
- **Required Properties:** name, url
- **Optional Properties:** potentialAction (sitelinks searchbox)
- **Rich Result:** Sitelinks search box

**3. WebPage Schema**

- **Location:** Generic pages without specific schema
- **Required Properties:** name, url, description
- **Optional Properties:** breadcrumb, lastReviewed
- **Rich Result:** Enhanced search results

**4. Article/BlogPosting Schema**

- **Location:** Blog posts, articles, news
- **Required Properties:** headline, author, datePublished, image
- **Optional Properties:** dateModified, publisher, articleBody
- **Rich Result:** Article rich results, AMP articles

**5. BreadcrumbList Schema**

- **Location:** All pages with navigation path
- **Required Properties:** itemListElement (array of breadcrumbs)
- **Optional Properties:** None
- **Rich Result:** Breadcrumb navigation in SERPs

**6. FAQPage Schema**

- **Location:** FAQ pages, help sections
- **Required Properties:** mainEntity (array of Question/Answer)
- **Optional Properties:** None
- **Rich Result:** FAQ rich snippets

**7. Product Schema**

- **Location:** Product pages, pricing pages
- **Required Properties:** name, image, description
- **Optional Properties:** offers, aggregateRating, brand, review
- **Rich Result:** Product rich snippets, price drops

**8. Review Schema**

- **Location:** Review pages, testimonial sections
- **Required Properties:** itemReviewed, author, reviewRating
- **Optional Properties:** reviewBody, datePublished
- **Rich Result:** Review stars, ratings

**9. LocalBusiness Schema**

- **Location:** Contact page, location pages
- **Required Properties:** name, address, telephone
- **Optional Properties:** geo, openingHours, priceRange
- **Rich Result:** Local business panel, maps integration

### Schema Nesting Strategy

Some schemas should be nested within others:

- **Organization** → Referenced by Article.publisher, Product.brand
- **WebSite** → Contains potentialAction for search
- **WebPage** → References breadcrumb (BreadcrumbList)
- **Article** → References author (Person), publisher (Organization)
- **Product** → Contains offers (Offer), reviews (Review), aggregateRating (AggregateRating)

Example nested schema:

```typescript
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 SEO Tips",
  "author": {
    "@type": "Person",
    "name": "John Doe"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Your Company",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  }
}
```

---

## Performance Optimizations

### Core Web Vitals Targets

- **Largest Contentful Paint (LCP):** < 2.5s
- **First Input Delay (FID) / Interaction to Next Paint (INP):** < 100ms / < 200ms
- **Cumulative Layout Shift (CLS):** < 0.1

### Optimization Strategies

**1. Image Optimization**

- Use `next/image` for all images
- Set `priority` prop for above-the-fold images
- Lazy load below-the-fold images
- Use responsive images with `sizes` prop
- Optimize image formats (WebP, AVIF)
- Set explicit width and height to prevent CLS

Example:

```tsx
import Image from 'next/image'

;<Image
    src='/hero-image.jpg'
    alt='Hero image'
    width={1200}
    height={600}
    priority // Above the fold
    sizes='(max-width: 768px) 100vw, 50vw'
/>
```

**2. Font Loading Optimization**

- Use `next/font` for automatic font optimization
- Preload critical fonts
- Use font-display: swap strategy
- Minimize font weights loaded

Already implemented:

```tsx
import { Geist, Geist_Mono } from 'next/font/google'

const fontSans = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
})
```

**3. Metadata Performance**

- Use static metadata for fixed pages
- Cache database queries in `generateMetadata`
- Avoid blocking data fetching in metadata
- Use parallel data fetching with Promise.all

Example:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
    // Use cache or fetch with cache
    const post = await fetch(`/api/posts/${params.slug}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    })

    return generateSiteMetadata(seoConfig, {
        title: post.title,
    })
}
```

**4. JSON-LD Performance**

- Render JSON-LD server-side only
- Minimize JSON-LD size (remove unnecessary properties)
- Compress JSON output in production
- Use React Server Components for JSON-LD rendering

**5. Server Component Strategy**

- Use Server Components for all SEO components
- Minimize client-side JavaScript
- Stream content with Suspense
- Use loading.tsx for page-level loading states

Example:

```tsx
// Server Component (default in app directory)
import { ArticleSchema } from '@workspace/seo/schemas'

export default async function BlogPost({ params }) {
    const post = await getPost(params.slug)

    return (
        <>
            <ArticleSchema {...post} />
            <article>{/* content */}</article>
        </>
    )
}
```

**6. Resource Hints**

- dns-prefetch for external domains
- preconnect for critical origins
- preload for critical resources

Add to layout.tsx:

```tsx
export default function Layout({ children }) {
    return (
        <html>
            <head>
                <link rel='dns-prefetch' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin='anonymous'
                />
            </head>
            <body>{children}</body>
        </html>
    )
}
```

**7. Caching Strategy**

- Use Next.js cache with `fetch`
- Implement ISR for frequently accessed pages
- Cache sitemap generation
- Use React cache for duplicate requests

**8. Code Splitting**

- Automatic code splitting by Next.js
- Dynamic imports for heavy components
- Minimize initial bundle size

**9. Streaming & Suspense**

- Use Suspense for slow components
- Stream metadata separately from content
- Show loading states for dynamic content

Example:

```tsx
import { Suspense } from 'react'

export default function Page() {
    return (
        <>
            <Suspense fallback={<LoadingSkeleton />}>
                <DynamicContent />
            </Suspense>
        </>
    )
}
```

**10. Critical CSS**

- Tailwind CSS automatically optimizes unused styles
- Inline critical styles in production
- Defer non-critical styles

### Performance Monitoring

**Built-in Next.js Monitoring:**

```tsx
// apps/web/app/layout.tsx
export function reportWebVitals(metric) {
    console.log(metric)
    // Send to analytics
}
```

**Lighthouse CI:**

- Run Lighthouse audits in CI/CD
- Set performance budgets
- Track Core Web Vitals over time

---

## Risk Assessment

### Potential Challenges & Mitigation Strategies

**1. Schema Validation Errors**

**Risk Level:** Medium
**Impact:** Rich results may not appear, manual action penalties

**Mitigation:**

- Use `schema-dts` for TypeScript type safety
- Validate all schemas with Google Rich Results Test
- Implement automated validation in CI/CD
- Add schema validation tests in unit tests
- Keep schemas updated with schema.org changes

**2. Performance Degradation**

**Risk Level:** Medium
**Impact:** Poor Core Web Vitals, lower search rankings

**Mitigation:**

- Profile metadata generation performance
- Cache database queries
- Use static metadata where possible
- Monitor Core Web Vitals in production
- Implement performance budgets in CI/CD

**3. Duplicate Content Issues**

**Risk Level:** Low-Medium
**Impact:** Search ranking dilution, indexing issues

**Mitigation:**

- Implement canonical URLs on all pages
- Use robots meta tags for private pages
- Add noindex to admin, staging environments
- Audit content for duplicates regularly

**4. Metadata Generation Failures**

**Risk Level:** Medium
**Impact:** Missing metadata, poor SEO for affected pages

**Mitigation:**

- Implement fallbacks for missing data
- Log metadata generation errors
- Add error boundaries around metadata generation
- Test with missing/incomplete data
- Monitor error rates in production

**5. JSON-LD XSS Vulnerabilities**

**Risk Level:** High
**Impact:** Security vulnerability, potential data breaches

**Mitigation:**

- Always sanitize JSON-LD content
- Use sanitization utility for all user-generated content
- Escape HTML entities (< → \u003c)
- Review security regularly
- Add security tests for XSS prevention

**6. Sitemap Generation Performance**

**Risk Level:** Low-Medium
**Impact:** Slow sitemap generation, timeouts for large sites

**Mitigation:**

- Cache sitemap generation results
- Use ISR for sitemap regeneration
- Split large sitemaps into multiple files
- Paginate database queries
- Monitor sitemap generation time

**7. Environment Configuration Errors**

**Risk Level:** Medium
**Impact:** Wrong URLs in production, broken links, indexing issues

**Mitigation:**

- Validate environment variables at build time
- Use TypeScript for environment variable types
- Add fallbacks for missing variables
- Test with different environment configurations
- Document required environment variables

**8. Package Dependency Issues**

**Risk Level:** Low
**Impact:** Build failures, TypeScript errors

**Mitigation:**

- Pin dependency versions
- Test with different Next.js versions
- Monitor schema-dts for breaking changes
- Keep dependencies updated regularly

**9. Testing Coverage Gaps**

**Risk Level:** Medium
**Impact:** Bugs in production, unreliable SEO features

**Mitigation:**

- Maintain 80%+ test coverage
- Write tests for edge cases
- Add integration tests for metadata
- Test with real-world data
- Implement automated testing in CI/CD

**10. Documentation Drift**

**Risk Level:** Low-Medium
**Impact:** Confusing for new developers, incorrect usage

**Mitigation:**

- Update documentation with code changes
- Review documentation in code reviews
- Keep examples up-to-date
- Add inline code documentation
- Schedule regular documentation audits

---

## Success Metrics

### Key Performance Indicators (KPIs)

**1. Technical SEO Metrics**

- **Lighthouse SEO Score:** 90-100
- **Structured Data Validation:** 100% valid schemas with no errors
- **Sitemap Coverage:** 100% of public pages included in sitemap
- **Canonical URL Coverage:** 100% of pages have canonical URLs
- **Meta Description Coverage:** 100% of pages have unique descriptions

**2. Performance Metrics**

- **Largest Contentful Paint (LCP):** < 2.5s (target: < 2.0s)
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1
- **Time to First Byte (TTFB):** < 600ms
- **Total Blocking Time (TBT):** < 300ms

**3. Search Engine Visibility**

- **Google Search Console Coverage:** 0 errors, 0 warnings
- **Rich Results Eligible:** 100% of eligible pages showing rich results
- **Mobile Usability:** 0 mobile usability errors
- **Core Web Vitals Assessment:** Pass for all pages

**4. Code Quality Metrics**

- **Test Coverage:** 80%+ for `@workspace/seo` package
- **TypeScript Strict Mode:** Enabled with 0 type errors
- **ESLint Violations:** 0 errors, 0 warnings
- **Build Time:** < 60 seconds for full build

**5. Developer Experience Metrics**

- **Time to Add SEO to New Page:** < 5 minutes
- **Documentation Completeness:** 100% of features documented
- **Setup Time for New Project:** < 30 minutes
- **Developer Satisfaction:** Positive feedback from team

### Validation Checklist

Before considering implementation complete:

- [ ] All JSON-LD schemas validate without errors
- [ ] Lighthouse SEO score is 90+
- [ ] Core Web Vitals pass for all pages
- [ ] Sitemap.xml is accessible and valid
- [ ] Robots.txt is properly configured
- [ ] All pages have unique titles and descriptions
- [ ] Open Graph tags work on Facebook Sharing Debugger
- [ ] Twitter Cards work on Twitter Card Validator
- [ ] Mobile responsiveness passes Google Mobile-Friendly Test
- [ ] Test coverage is 80%+ for SEO package
- [ ] Documentation is complete and accurate
- [ ] No TypeScript errors or ESLint warnings
- [ ] Performance budgets are met
- [ ] Security audit passes (no XSS vulnerabilities)

### Monitoring & Maintenance

**Ongoing Monitoring:**

1. **Weekly:**
    - Check Google Search Console for errors
    - Monitor Core Web Vitals
    - Review crawl stats

2. **Monthly:**
    - Run Lighthouse audits on key pages
    - Validate structured data
    - Review performance metrics
    - Check for broken links

3. **Quarterly:**
    - Update schema.org schemas if changed
    - Review and update documentation
    - Audit SEO best practices
    - Update dependencies

4. **When Making Changes:**
    - Test metadata changes before deployment
    - Validate structured data after updates
    - Run performance tests
    - Update documentation

---

## References

### Official Documentation

1. **Next.js 15 SEO Documentation**
    - https://nextjs.org/docs/app/building-your-application/optimizing/metadata
    - Official guide to Metadata API, sitemap, and robots.txt

2. **Next.js JSON-LD Guide**
    - https://nextjs.org/docs/app/guides/json-ld
    - Official guide to implementing structured data

3. **Schema.org Documentation**
    - https://schema.org/docs/schemas.html
    - Complete reference for all schema types

4. **schema-dts TypeScript Types**
    - https://github.com/google/schema-dts
    - TypeScript definitions for schema.org

5. **Google Search Central**
    - https://developers.google.com/search/docs
    - Google's official SEO documentation

### Best Practices & Guides

6. **The Complete Guide to SEO Optimization in Next.js 15**
    - https://medium.com/@thomasaugot/the-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7
    - Comprehensive guide with code examples

7. **Next.js 15 SEO: Complete Guide to Metadata & Optimization**
    - https://www.digitalapplied.com/blog/nextjs-seo-guide
    - Metadata API and optimization strategies

8. **Maximizing SEO with Meta Data in Next.js 15**
    - https://dev.to/joodi/maximizing-seo-with-meta-data-in-nextjs-15-a-comprehensive-guide-4pa7
    - Practical guide with examples

9. **Next.js SEO in 2025: Best Practices**
    - https://www.slatebytes.com/articles/next-js-seo-in-2025-best-practices-meta-tags-and-performance-optimization-for-high-google-rankings
    - Latest best practices for 2025

10. **Implementing JSON-LD in Next.js for SEO**
    - https://www.wisp.blog/blog/implementing-json-ld-in-nextjs-for-seo
    - JSON-LD implementation patterns

### Testing & Validation Tools

11. **Google Rich Results Test**
    - https://search.google.com/test/rich-results
    - Validate structured data and preview rich results

12. **Schema Markup Validator**
    - https://validator.schema.org/
    - Validate JSON-LD schemas

13. **Facebook Sharing Debugger**
    - https://developers.facebook.com/tools/debug/
    - Test Open Graph tags

14. **Twitter Card Validator**
    - https://cards-dev.twitter.com/validator
    - Test Twitter Card implementation

15. **Google PageSpeed Insights**
    - https://pagespeed.web.dev/
    - Test Core Web Vitals and performance

16. **Lighthouse**
    - https://developer.chrome.com/docs/lighthouse/
    - Comprehensive SEO and performance audits

### Technical Resources

17. **Generating Dynamic Sitemap and Robots.txt in Next.js**
    - https://dev.to/arfatapp/generating-dynamic-robotstxt-and-sitemapxml-in-a-nextjs-app-router-with-typescript-35l9
    - Dynamic sitemap and robots.txt implementation

18. **Next.js Sitemap: Complete Guide for Dynamic SEO in 2025**
    - https://utsavdesai26.medium.com/nextjs-sitemap-complete-guide-for-dynamic-seo-in-2025-1464c4902846
    - Sitemap generation patterns

19. **Schema Markup Best Practices**
    - https://digi-solutions.com/schema-markup-best-practices/
    - Best practices for structured data

20. **Core Web Vitals Documentation**
    - https://web.dev/vitals/
    - Understanding and optimizing Core Web Vitals

### Community Resources

21. **Next.js Discord Community**
    - https://discord.gg/nextjs
    - Community support and discussions

22. **r/nextjs Subreddit**
    - https://www.reddit.com/r/nextjs/
    - Community questions and solutions

---

## Appendix

### Monorepo Package Structure

**packages/seo/package.json:**

```json
{
    "name": "@workspace/seo",
    "version": "0.0.1",
    "private": true,
    "type": "module",
    "main": "./src/index.ts",
    "types": "./src/index.ts",
    "exports": {
        ".": "./src/index.ts",
        "./config": "./src/config/index.ts",
        "./utils": "./src/utils/index.ts",
        "./schemas": "./src/schemas/index.ts",
        "./types": "./src/types/index.ts"
    },
    "scripts": {
        "lint": "eslint . --ext .ts,.tsx",
        "typecheck": "tsc --noEmit",
        "test": "vitest",
        "test:coverage": "vitest --coverage"
    },
    "dependencies": {
        "schema-dts": "^1.1.2"
    },
    "devDependencies": {
        "@types/node": "^20.19.9",
        "@types/react": "^19.1.9",
        "@workspace/eslint-config": "workspace:*",
        "@workspace/typescript-config": "workspace:*",
        "react": "^19.1.1",
        "typescript": "^5.9.2",
        "vitest": "^2.0.0"
    }
}
```

### Environment Variable Template

**.env.example:**

```bash
# SEO Configuration
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_SITE_NAME="Your Marketing Site"
NEXT_PUBLIC_SITE_DESCRIPTION="A comprehensive marketing website template built with Next.js 15"
NEXT_PUBLIC_TWITTER_HANDLE=@yourbrand
NEXT_PUBLIC_FACEBOOK_APP_ID=

# Database (for dynamic content)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Environment
NODE_ENV=development
```

### Code Style Guidelines

**TypeScript:**

- Use strict mode (`"strict": true` in tsconfig.json)
- Explicit return types for public functions
- **Prefer `type` over `interface` for consistency** (per TypeScript agent guidelines)
- Use const assertions where applicable
- Add JSDoc comments to all public functions and types
- Constants use `SCREAMING_SNAKE_CASE`
- Functions use `camelCase`
- Types use `PascalCase`
- Boolean variables use prefixes: `is`, `has`, `can`, `should`, `will`

**React:**

- Use React Server Components by default
- Client Components only when necessary (use 'use client')
- Functional components with TypeScript
- Props type naming: `ComponentNameProps` (use `type`, not `interface`)

**File Naming:**

- Components: PascalCase.tsx (e.g., ArticleSchema.tsx)
- Utilities: kebab-case.util.ts (e.g., metadata-generator.util.ts)
- Types: kebab-case.type.ts (e.g., seo-config.type.ts)
- Constants: kebab-case.constant.ts (e.g., schema-org.constant.ts)
- Config: kebab-case.config.ts (e.g., seo.config.ts)
- Tests: _.test.ts or _.spec.ts (matching source file name)
- One type per file (organize in domain folders)

**Import Order:**

1. React imports
2. Next.js imports
3. Third-party libraries
4. Workspace packages (@workspace/\*)
5. Relative imports
6. Type imports (import type)

**Type Organization:**

- Place types in `/types/[domain]/` folders
- One type per file
- Group related types by domain/feature
- Use index.ts files for re-exports

**JSDoc Example:**

````typescript
/**
 * Generates site metadata for Next.js 15 Metadata API
 *
 * @param config - Base SEO configuration
 * @param overrides - Page-specific metadata overrides
 * @returns Next.js Metadata object
 *
 * @example
 * ```ts
 * const metadata = generateSiteMetadata(SEO_CONFIG, {
 *   title: 'About Us',
 *   description: 'Learn more about our company'
 * })
 * ```
 */
export function generateSiteMetadata(
    config: SEOConfig,
    overrides?: Partial<SEOConfig>
): Metadata {
    // implementation
}
````

---

## Conclusion

This implementation plan provides a comprehensive roadmap for integrating SEO best practices into your Next.js 15 marketing website template. By following the phased approach, you'll build a robust, reusable SEO system that:

- Leverages Next.js 15's native Metadata API
- Provides type-safe SEO utilities
- Implements rich structured data with JSON-LD
- Optimizes for Core Web Vitals and performance
- Scales across multiple marketing websites
- Maintains high code quality with comprehensive testing
- Provides excellent developer experience with complete documentation

Each phase builds upon the previous one, ensuring a solid foundation before adding complexity. The modular architecture allows for easy maintenance and updates as SEO best practices evolve.

**Next Steps:**

1. Review this implementation plan with the team
2. Set up the `@workspace/seo` package (Phase 1)
3. Begin implementation following the phase sequence
4. Test thoroughly at each phase
5. Document learnings and adjust as needed

Good luck with your implementation!
