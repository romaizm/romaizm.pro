# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Roman Izmestev - a bilingual (EN/RU) Next.js site showcasing projects, services, CV, and contact information. Built with App Router, Tailwind CSS v4, and markdown-based content.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## Architecture

### Routing & i18n
- Uses `next-intl` for internationalization with locale prefix (`/en/...`, `/ru/...`)
- Middleware at `middleware.ts` handles locale routing
- i18n config in `src/lib/i18n/routing.ts` defines locales: `["en", "ru"]`
- Navigation helpers exported from `src/lib/i18n/navigation.ts`

### Content System
- Projects stored as markdown files in `content/projects/{locale}/` with gray-matter frontmatter
- Translations in `content/translations/{en,ru}.json`
- Project content loaded via `src/lib/mdx/projects.ts`
- CV PDFs in `public/cv/`

### Theme
- `next-themes` with dark mode as default
- Theme provider wraps locale layout
- CSS custom properties in `src/app/globals.css` using Tailwind v4 `@theme` directive

### Contact Form
- Server action in `src/lib/actions/contact.ts`
- Uses Resend for email delivery (requires `RESEND_API_KEY` env var)
- Validation with zod

### Key Directories
```
src/app/[locale]/       # Localized pages (home, projects, cv, contact, services)
src/components/         # React components organized by feature
src/lib/                # Utilities (i18n, mdx parsing, server actions)
content/projects/       # Markdown project files (en/, ru/)
content/translations/   # UI translation JSON files
```

## Adding New Projects

Create markdown file in both `content/projects/en/` and `content/projects/ru/` with frontmatter:

```yaml
---
title: "Project Title"
client: "Client Name"
clientLocation: "Country"
date: "YYYY-MM-DD"
launchDate: "Month Year"
platform: "Shopify" | "WooCommerce" | "WordPress" | "Flutter" | "Custom"
category: "eCommerce" | "Business Website"
technologies: ["Tech1", "Tech2"]
thumbnail: "/images/projects/slug/thumbnail.jpg"
images: ["/images/projects/slug/hero.jpg"]
url: "https://example.com"
featured: true
services: ["Service1", "Service2"]
description: "Brief description"
---

Markdown content...
```

## Environment Variables

```
RESEND_API_KEY=re_xxx           # Required for contact form
NEXT_PUBLIC_SITE_URL=https://romaizm.pro
```
