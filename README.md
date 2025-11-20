# BrandLocus User

A Next.js application with Tailwind CSS, Framer Motion, and shadcn/ui.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework (CSS-first configuration)
- **Framer Motion** - Animation library
- **shadcn/ui** - UI component library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

**Note:** If you encounter npm cache permission errors, you may need to fix npm cache permissions first:
```bash
sudo chown -R $(whoami) ~/.npm
```

Then install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Adding shadcn/ui Components

To add shadcn/ui components, use the CLI:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

## Project Structure

```
brandlocus_user/
├── app/                # Next.js app directory
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles with Tailwind
├── components/         # React components (create as needed)
│   └── ui/            # shadcn/ui components (will be added here)
├── lib/               # Utility functions
│   └── utils.ts       # cn() utility for class names
├── components.json    # shadcn/ui configuration
├── tailwind.config.ts # Tailwind configuration
└── tsconfig.json      # TypeScript configuration
```
