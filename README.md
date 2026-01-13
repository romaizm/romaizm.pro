# romaizm.pro

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, bilingual (EN/RU) portfolio website built with Next.js 16, featuring dark mode, markdown-based content management, and SEO optimization.

**Live Demo:** [https://romaizm.pro](https://romaizm.pro)

---

**[English](#english)** | **[Русский](#русский)**

---

## English

### Features

- **Bilingual Support** — Full EN/RU internationalization with next-intl and locale-prefixed routing
- **Dark/Light Theme** — System preference detection with manual toggle, dark mode as default
- **Markdown Content** — Projects stored as markdown files with frontmatter metadata
- **Dynamic OG Images** — Auto-generated Open Graph images via Edge runtime
- **SEO Optimized** — JSON-LD schemas (Person, Website, CreativeWork), meta tags, canonical URLs
- **Contact Form** — Server Actions with Zod validation, Resend email delivery, spam protection
- **Fluid Design** — Responsive typography and spacing using CSS clamp()
- **Animations** — Particle backgrounds (tsParticles) and motion effects (Framer Motion)
- **Type Safe** — TypeScript strict mode throughout

### Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4.1, CSS Custom Properties |
| i18n | next-intl |
| Animations | Framer Motion, tsParticles |
| Forms | React Hook Form, Zod |
| Email | Resend |
| Content | Markdown + gray-matter |

### Quick Start

```bash
# Clone the repository
git clone https://github.com/romaizm/romaizm.pro.git
cd romaizm.pro

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Project Structure

```
├── src/
│   ├── app/
│   │   ├── [locale]/          # Localized pages (home, projects, cv, contact, services)
│   │   └── api/og/            # Dynamic OG image generation
│   ├── components/
│   │   ├── ui/                # Reusable UI primitives (Button, Input, Badge)
│   │   ├── home/              # Homepage sections
│   │   ├── layout/            # Header, Footer
│   │   └── shared/            # Logo, ThemeToggle, LanguageSwitcher
│   ├── lib/
│   │   ├── i18n/              # Internationalization config
│   │   ├── mdx/               # Markdown content loader
│   │   ├── actions/           # Server Actions (contact form)
│   │   └── seo/               # SEO utilities and schemas
│   └── types/                 # TypeScript definitions
├── content/
│   ├── projects/              # Markdown project files (en/, ru/)
│   └── translations/          # UI translation JSON files
└── public/
    ├── images/                # Project images
    └── cv/                    # CV/Resume PDFs
```

### Configuration

Create a `.env.local` file with the following variables:

```env
# Required for contact form
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Site URL (defaults to https://romaizm.pro)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Customization

#### Adding Projects

Create markdown files in both `content/projects/en/` and `content/projects/ru/`:

```yaml
---
title: "Project Title"
client: "Client Name"
clientLocation: "Country"
date: "2024-01-15"
launchDate: "January 2024"
platform: "Shopify"  # Shopify | WooCommerce | WordPress | Flutter | Custom
category: "eCommerce"  # eCommerce | Business Website
technologies: ["Next.js", "TypeScript", "Tailwind"]
thumbnail: "/images/projects/my-project/thumbnail.webp"
images: ["/images/projects/my-project/hero.webp"]
url: "https://example.com"
featured: true
services: ["Web Development", "UI Design"]
description: "Brief project description"
---

Detailed project content in markdown...
```

#### Modifying Translations

Edit JSON files in `content/translations/`:
- `en.json` — English translations
- `ru.json` — Russian translations

#### Theme Customization

Theme colors and CSS custom properties are defined in `src/app/globals.css` using Tailwind v4's `@theme` directive.

### Deployment

#### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/romaizm/romaizm.pro)

#### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
```

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

#### Guidelines

- Follow existing code style and patterns
- Write meaningful commit messages
- Update documentation if needed
- Test your changes locally before submitting

### License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Русский

### Возможности

- **Двуязычность** — Полная поддержка EN/RU через next-intl с локалью в URL
- **Тёмная/Светлая тема** — Определение системных настроек + ручное переключение, тёмная тема по умолчанию
- **Markdown контент** — Проекты хранятся как markdown-файлы с frontmatter метаданными
- **Динамические OG-изображения** — Автогенерация Open Graph картинок через Edge runtime
- **SEO оптимизация** — JSON-LD схемы (Person, Website, CreativeWork), мета-теги, канонические URL
- **Контактная форма** — Server Actions с Zod валидацией, отправка через Resend, защита от спама
- **Адаптивный дизайн** — Fluid типографика и отступы через CSS clamp()
- **Анимации** — Частицы на фоне (tsParticles) и motion-эффекты (Framer Motion)
- **Type Safety** — TypeScript в strict режиме

### Технологии

| Категория | Технологии |
|-----------|-----------|
| Фреймворк | Next.js 16, React 19 |
| Язык | TypeScript 5.9 |
| Стили | Tailwind CSS 4.1, CSS Custom Properties |
| i18n | next-intl |
| Анимации | Framer Motion, tsParticles |
| Формы | React Hook Form, Zod |
| Email | Resend |
| Контент | Markdown + gray-matter |

### Быстрый старт

```bash
# Клонировать репозиторий
git clone https://github.com/romaizm/romaizm.pro.git
cd romaizm.pro

# Установить зависимости
npm install

# Настроить переменные окружения
cp .env.example .env.local
# Отредактировать .env.local

# Запустить dev-сервер
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) для просмотра сайта.

### Структура проекта

```
├── src/
│   ├── app/
│   │   ├── [locale]/          # Локализованные страницы
│   │   └── api/og/            # Генерация OG-изображений
│   ├── components/
│   │   ├── ui/                # UI-компоненты (Button, Input, Badge)
│   │   ├── home/              # Секции главной страницы
│   │   ├── layout/            # Header, Footer
│   │   └── shared/            # Logo, ThemeToggle, LanguageSwitcher
│   ├── lib/
│   │   ├── i18n/              # Конфигурация интернационализации
│   │   ├── mdx/               # Загрузчик markdown-контента
│   │   ├── actions/           # Server Actions (контактная форма)
│   │   └── seo/               # SEO утилиты и схемы
│   └── types/                 # TypeScript типы
├── content/
│   ├── projects/              # Markdown-файлы проектов (en/, ru/)
│   └── translations/          # JSON-файлы переводов
└── public/
    ├── images/                # Изображения проектов
    └── cv/                    # CV/Резюме в PDF
```

### Конфигурация

Создайте файл `.env.local` со следующими переменными:

```env
# Обязательно для контактной формы
RESEND_API_KEY=re_xxxxxxxxxxxxx

# URL сайта (по умолчанию https://romaizm.pro)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Кастомизация

#### Добавление проектов

Создайте markdown-файлы в `content/projects/en/` и `content/projects/ru/`:

```yaml
---
title: "Название проекта"
client: "Имя клиента"
clientLocation: "Страна"
date: "2024-01-15"
launchDate: "Январь 2024"
platform: "Shopify"  # Shopify | WooCommerce | WordPress | Flutter | Custom
category: "eCommerce"  # eCommerce | Business Website
technologies: ["Next.js", "TypeScript", "Tailwind"]
thumbnail: "/images/projects/my-project/thumbnail.webp"
images: ["/images/projects/my-project/hero.webp"]
url: "https://example.com"
featured: true
services: ["Веб-разработка", "UI-дизайн"]
description: "Краткое описание проекта"
---

Детальное описание проекта в markdown...
```

#### Изменение переводов

Редактируйте JSON-файлы в `content/translations/`:
- `en.json` — английские переводы
- `ru.json` — русские переводы

#### Настройка темы

Цвета темы и CSS custom properties определены в `src/app/globals.css` через директиву `@theme` Tailwind v4.

### Деплой

#### Vercel (Рекомендуется)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/romaizm/romaizm.pro)

#### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
```

### Скрипты

```bash
npm run dev          # Запуск dev-сервера
npm run build        # Production сборка
npm run start        # Запуск production сервера
npm run lint         # Запуск ESLint
npm run type-check   # Проверка типов TypeScript
```

### Участие в разработке

Мы приветствуем вклад в проект! Вот как вы можете помочь:

1. **Сделайте форк** репозитория
2. **Создайте** ветку для фичи (`git checkout -b feature/amazing-feature`)
3. **Закоммитьте** изменения (`git commit -m 'Add amazing feature'`)
4. **Запушьте** в ветку (`git push origin feature/amazing-feature`)
5. **Откройте** Pull Request

#### Рекомендации

- Следуйте существующему стилю кода
- Пишите понятные сообщения коммитов
- Обновляйте документацию при необходимости
- Тестируйте изменения локально перед отправкой

### Лицензия

Проект распространяется под лицензией MIT — см. файл [LICENSE](LICENSE) для деталей.

---

Made with Next.js by [Roman Izmestev](https://romaizm.pro)
