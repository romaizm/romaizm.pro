---
title: "Finansovo Prosto — Financial Products Aggregator"
client: "Finansovo Prosto"
clientLocation: "Russia"
date: "2026-04-20"
launchDate: "April 2026"
platform: "Next.js"
category: "Web Application"
technologies: ["Next.js 16", "TypeScript", "Payload CMS", "PostgreSQL", "Tailwind CSS"]
thumbnail: "/images/projects/finansovo-prosto/thumbnail.webp"
images:
  - "/images/projects/finansovo-prosto/hero.webp"
  - "/images/projects/finansovo-prosto/screenshot.webp"
url: "https://finansovo-prosto.ru"
featured: true
services: ["Web Development", "UI/UX Design", "SEO"]
description: "A showcase aggregator for financial products: loans, credits, cards, deposits, business accounts, and mortgages"
---

## Project Overview

Finansovo Prosto is a showcase aggregator for financial products that helps users quickly find the right loan, credit, bank card, deposit, business account, or mortgage. Products are organized into a single catalog across six categories, so comparing terms and moving to an application takes just a couple of clicks. The project runs on an affiliate (CPA) model — the site earns from referrals and completed applications — so full click and conversion tracking was built into the system from day one.

## Challenge

The goal was to build a complete product site from scratch: a clear catalog of financial offers, a flexible admin panel for content managers, accurate affiliate referral tracking, and a strong SEO foundation for a highly competitive financial niche. A separate requirement was high performance and a clean, trustworthy presentation — because money-related topics demand transparency.

## Solution

I built the application on Next.js 16 (App Router) with server-side rendering and Payload CMS 3 backed by PostgreSQL, serving as the headless CMS and admin panel. Content managers handle offers, categories, badges, and articles through a convenient dashboard, while the public side is delivered fast and search-optimized. Affiliate referrals go through custom go-redirects with click logging and postback handling to track conversions. The interface is a light-themed design with a signature "Liquid Glass" header and a fully responsive layout.

## Key Features

- Financial product catalog across 6 categories: loans, credits, cards, deposits, business accounts, mortgages
- Affiliate mechanics: go-redirects, click logging, and postbacks for conversion tracking
- 8 financial calculators: deposit, auto loan, credit card, refinancing, installment, microloan, mortgage, and currency converter
- Live exchange rates via integration with the Central Bank of Russia API
- A journal with articles and SEO content powered by Payload CMS
- A full-featured admin panel to manage offers and content without a developer
- A strong SEO/GEO foundation: structured data, dynamic sitemap, robots, llms.txt, Yandex Metrica
- Responsive layout for all devices and fast load times

## Results

- A complex financial-products market distilled into a clear, logical catalog
- A transparent affiliate model with precise referral and conversion tracking
- The content team manages the site independently through the admin panel
- The site is technically ready to scale with traffic and catalog growth
