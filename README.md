# Gas Station Dashboard - Next.js 15 + Apple Fitness Cards

A modern SaaS dashboard featuring pixel-perfect Apple Fitness-style cards built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎯 **Apple Fitness Cards**: Pixel-perfect recreation with gradients and animations
- ⚡ **Next.js 15**: Latest framework with Turbopack for blazing fast development
- 🔷 **TypeScript**: Full type safety across the entire application
- 🎨 **Tailwind CSS**: Modern utility-first styling
- 📡 **API Routes**: Built-in Next.js API endpoints for card data
- 🔄 **Real-time Updates**: Update cards via API calls
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎭 **React Components**: Clean, reusable component architecture

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/cards/          # API routes for card data
│   ├── layout.tsx          # Root layout with Inter font
│   └── page.tsx            # Main dashboard page
├── components/
│   ├── AppleFitnessCard.tsx # Individual card component
│   ├── CardsGrid.tsx       # Grid layout for cards
│   └── Header.tsx          # Dashboard header
├── hooks/
│   └── useCards.ts         # Custom hook for API integration
└── types/
    └── card.ts             # TypeScript definitions
```

## 📊 API Endpoints

### GET /api/cards
Returns all fitness card data.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "active-calories-card",
      "value": 494,
      "label": "Active<br>Calories",
      "icon": "🔥",
      "percentage": 73,
      "backgroundColor": "#f2dbe1",
      "progressGradient": "linear-gradient(90deg, #cc0000, #ff6666)"
    }
  ],
  "timestamp": "2023-..."
}
```

### PUT /api/cards/[id]
Updates a specific card's data.

**Request:**
```json
{
  "value": 550,
  "percentage": 82
}
```

### GET /api/health
Health check endpoint.

## 🎮 Interactive Features

Open the browser console and try these commands:

```javascript
// Access the cards hook (in development)
const { updateCard } = window.useCards();

// Update a card
updateCard('active-calories-card', { value: 550, percentage: 82 });
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Development**: Turbopack for fast builds
- **Linting**: ESLint with Next.js config

## 🎨 Card Components

Each Apple Fitness card includes:
- ✅ **Animated Progress Bars**: Smooth 2-second animations
- ✅ **Custom Gradients**: Beautiful color transitions
- ✅ **Translucent Icons**: Backdrop blur effects
- ✅ **Precise Positioning**: Pixel-perfect Apple design
- ✅ **Type Safety**: Full TypeScript support

## 🚀 Deployment

Deploy easily on Vercel:

```bash
npm run build
```

Or deploy on [Vercel Platform](https://vercel.com/new) with one click.

## 📝 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

Built with ❤️ using Next.js 15 and Apple design inspiration.
