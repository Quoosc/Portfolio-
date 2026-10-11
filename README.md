# Pham Tran Quoc — Portfolio

A personal portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content and assets

- Profile, navigation, and contact details: `lib/site-config.ts`
- Skills: `data/skills.ts`
- Featured project: `data/projects.ts`
- Static images and downloadable files: `public/`

The contact form is currently hidden. The portfolio links directly to email while the Resend
service is unconfigured.

## Deployment

The project can be deployed to Vercel as a Next.js application. Add a verified portfolio domain
and configure email delivery before enabling a contact form.
