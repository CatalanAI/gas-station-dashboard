# Gas Station Dashboard - Apple Fitness Cards

A SaaS dashboard featuring Apple Fitness-style cards with a Node.js/Express backend and vanilla JavaScript frontend.

## Project Structure

```
├── backend/           # Express API server
│   ├── server.js      # Main server file
│   └── package.json   # Backend dependencies
├── frontend/          # Frontend files
│   ├── index.html     # Main HTML file
│   ├── script.js      # JavaScript with API integration
│   └── styles.css     # CSS styles
└── package.json       # Root package.json with scripts
```

## Setup Instructions

### 1. Install Dependencies

```bash
# Install backend dependencies
npm run install:all
```

### 2. Start the Application

You need to run both backend and frontend:

**Option A: Two separate terminals**
```bash
# Terminal 1: Start backend (runs on http://localhost:3001)
npm run dev:backend

# Terminal 2: Start frontend (runs on http://localhost:3000)
npm run dev:frontend
```

**Option B: Production mode**
```bash
# Terminal 1: Start backend
npm run start:backend

# Terminal 2: Start frontend
npm run start:frontend
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api

## API Endpoints

### GET /api/cards
Returns all fitness card data.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "active-calories-card",
      "type": "active-calories",
      "value": 494,
      "label": "Active<br>Calories",
      "icon": "🔥",
      "percentage": 73,
      "backgroundColor": "#f2dbe1",
      "iconBackgroundColor": "rgba(255, 0, 0, 0.2)",
      "progressGradient": "linear-gradient(90deg, #cc0000, #ff6666)"
    }
  ],
  "timestamp": "2023-..."
}
```

### PUT /api/cards/:cardId
Updates a specific card's data.

**Request:**
```json
{
  "value": 550,
  "percentage": 82
}
```

**Response:**
```json
{
  "success": true,
  "message": "Card active-calories-card updated successfully",
  "data": {
    "id": "active-calories-card",
    "value": 550,
    "percentage": 82,
    "updatedAt": "2023-..."
  }
}
```

### GET /api/health
Health check endpoint.

## Features

- ✅ **Apple Fitness Card Design**: Pixel-perfect recreation with gradients and animations
- ✅ **API Integration**: Frontend fetches data from Express backend
- ✅ **Fallback System**: Works offline with static data if API is unavailable
- ✅ **Real-time Updates**: Update cards via API calls
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Component Architecture**: Reusable card system

## Development Commands

```bash
# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && live-server --port=3000

# Install backend deps
npm run install:backend
```

## Browser Console Commands

Once the app is running, try these commands in the browser console:

```javascript
// Update card locally
dashboard.updateCard("active-calories-card", {value: 550, percentage: 82})

// Update card via API
dashboard.updateCardViaAPI("active-calories-card", {value: 600, percentage: 90})

// Add custom card
dashboard.addCustomCard({
  value: "12",
  label: "Custom<br>Metric",
  icon: "⭐",
  percentage: 45,
  backgroundColor: "#ffe6cc",
  iconBackgroundColor: "rgba(255, 193, 7, 0.3)"
})
```

## Tech Stack

- **Backend**: Node.js, Express, CORS
- **Frontend**: Vanilla JavaScript, CSS3, HTML5
- **Dev Tools**: Live Server, Nodemon