---
title: "Asia Motors — Car Importer Website with Auctions & CMS"
client: "Asia Motors LLC"
clientLocation: "Vladivostok, Russia"
date: "2026-07-01"
launchDate: "July 2026"
platform: "Next.js"
category: "Corporate Website"
technologies: ["Next.js", "Payload CMS", "TypeScript", "Tailwind CSS", "PostgreSQL"]
thumbnail: "/images/projects/asia-motors/thumbnail.webp"
images:
  - "/images/projects/asia-motors/hero.webp"
  - "/images/projects/asia-motors/screenshot.webp"
url: "https://азиямоторс.рф"
featured: true
services: ["Web Development", "UI/UX Design", "CMS Integration"]
description: "Business website for a car import company: auction search module, inventory catalog, blog, and a self-managed CMS"
---

## Project Overview

I built a full-featured business website for Asia Motors, a Vladivostok-based company importing cars from Japan, Korea, and China. The site combines corporate pages, an in-stock car catalog, a blog, and an embedded auction search module with sales statistics — all managed by the client through a single admin panel.

## Challenge

The company needed more than a brochure site — they needed a working sales tool: live auction catalogs with millions of lots, their own inventory catalog, a blog for SEO, and full content control without depending on a developer. The deadline: 6 weeks.

## Solution

The site is built on Next.js 16 with embedded Payload CMS: content, car inventory, and blog posts are all edited in one admin panel, while pages are server-rendered for speed and SEO. The auction module connects to catalog provider APIs through a server-side proxy, so access keys never leave the server. I designed the visual identity from scratch around a "help from a friend" metaphor — messenger-style chat bubbles, soft shapes, a signature light-blue accent — plus a complete dark mode.

## Key Features

- Japanese, Korean, and Chinese auctions with filters, lot pages, and sales statistics
- In-stock car catalog with specs and photo galleries
- Self-managed CMS: the client runs the blog and catalog without a developer
- Geo-routed API: international visitors are automatically served through a mirror endpoint
- Website inquiries flow to email and the company's CRM
- Dark mode, fully responsive layout, Cyrillic domain support

## Results

- The company got a unified platform — website, catalog, blog, and auctions — instead of scattered tools
- Content is fully in the client's hands; updates require no developer
- From kickoff to release in 6 weeks
