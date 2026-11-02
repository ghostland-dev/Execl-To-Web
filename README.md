# Excel to Web

Turns spreadsheets and documents into working web applications.

## Features

- Document analysis API
- App generation endpoint
- Stripe checkout integration

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI)
- Stripe
- Google Gemini API

## Getting Started

```bash
git clone https://github.com/ghostland-dev/excel-to-web-ai.git
cd excel-to-web-ai
npm install
npm run dev
```

Other scripts:

- `npm run build`: next build
- `npm run lint`: next lint

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fghostland-dev%2Fexcel-to-web-ai)

Click the button to deploy your own copy on Vercel in one step.

Set these environment variables in the Vercel project settings (see `.env.example`):

- `GEMINI_API_KEY`
- `NEXT_PUBLIC_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Author

**Ismail.M**, Software Engineer & DevOps

- GitHub: [@ghostland-dev](https://github.com/ghostland-dev)
- Website: [ismail-mouyahada.com](https://www.ismail-mouyahada.com)
