const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API endpoint to get fitness card data
app.get('/api/cards', (req, res) => {
    const cardData = [
        {
            id: 'active-calories-card',
            type: 'active-calories',
            value: 494,
            label: 'Active<br>Calories',
            icon: '🔥',
            percentage: 73,
            backgroundColor: '#f2dbe1',
            iconBackgroundColor: 'rgba(255, 0, 0, 0.2)',
            progressGradient: 'linear-gradient(90deg, #cc0000, #ff6666)'
        },
        {
            id: 'exercise-minutes-card',
            type: 'exercise-minutes',
            value: '23m',
            label: 'Exercise<br>Minutes',
            icon: '⚡',
            percentage: 26,
            backgroundColor: '#d4f1d4',
            iconBackgroundColor: 'rgba(0, 255, 0, 0.2)',
            progressGradient: 'linear-gradient(90deg, #009900, #66ff66)'
        },
        {
            id: 'stand-hours-card',
            type: 'stand-hours',
            value: 17,
            label: 'Stand<br>Hours',
            icon: '🚶',
            percentage: 85,
            backgroundColor: '#d4e6f1',
            iconBackgroundColor: 'rgba(0, 0, 255, 0.2)',
            progressGradient: 'linear-gradient(90deg, #0066cc, #66b3ff)'
        }
    ];

    res.json({
        success: true,
        data: cardData,
        timestamp: new Date().toISOString()
    });
});

// API endpoint to update a specific card
app.put('/api/cards/:cardId', (req, res) => {
    const { cardId } = req.params;
    const { value, percentage } = req.body;

    // In a real app, this would update a database
    // For now, just return success with the updated data
    res.json({
        success: true,
        message: `Card ${cardId} updated successfully`,
        data: {
            id: cardId,
            value: value,
            percentage: percentage,
            updatedAt: new Date().toISOString()
        }
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'gas-station-backend'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`   GET  /api/cards - Get all card data`);
    console.log(`   PUT  /api/cards/:id - Update specific card`);
    console.log(`   GET  /api/health - Health check`);
});