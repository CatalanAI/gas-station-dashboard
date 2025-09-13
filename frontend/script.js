// Apple Fitness Card Component
class AppleFitnessCard {
    constructor(options) {
        this.value = options.value || '0';
        this.label = options.label || 'Label';
        this.icon = options.icon || '🔥';
        this.percentage = options.percentage || 0;
        this.backgroundColor = options.backgroundColor || '#f2dbe1';
        this.iconBackgroundColor = options.iconBackgroundColor || 'rgba(255, 255, 255, 0.3)';
        this.progressGradient = options.progressGradient || 'linear-gradient(90deg, #000000, #666666)';
        this.id = options.id || 'fitness-card-' + Math.random().toString(36).substr(2, 9);
    }

    render() {
        return `
            <div class="apple-fitness-card" style="background: ${this.backgroundColor};" data-id="${this.id}">
                <div class="card-icon-container" style="background: ${this.iconBackgroundColor};">
                    <div class="card-icon">${this.icon}</div>
                </div>
                <div class="card-content">
                    <div class="card-value">${this.value}</div>
                    <div class="card-label">${this.label}</div>
                    <div class="card-progress-container">
                        <div class="card-progress-track"></div>
                        <div class="card-progress-bar" data-progress="${this.percentage}"></div>
                    </div>
                    <div class="card-percentage">${this.percentage}%</div>
                </div>
            </div>
        `;
    }

    animateProgress() {
        const card = document.querySelector(`[data-id="${this.id}"]`);
        if (card) {
            const progressBar = card.querySelector('.card-progress-bar');
            if (progressBar) {
                setTimeout(() => {
                    progressBar.style.background = this.progressGradient;
                    progressBar.style.width = `${this.percentage}%`;
                }, 800);
            }
        }
    }

    updateValue(newValue) {
        this.value = newValue;
        const card = document.querySelector(`[data-id="${this.id}"]`);
        if (card) {
            const valueElement = card.querySelector('.card-value');
            if (valueElement) {
                valueElement.textContent = newValue;
            }
        }
    }

    updatePercentage(newPercentage) {
        this.percentage = newPercentage;
        const card = document.querySelector(`[data-id="${this.id}"]`);
        if (card) {
            const percentageElement = card.querySelector('.card-percentage');
            const progressBar = card.querySelector('.card-progress-bar');

            if (percentageElement) {
                percentageElement.textContent = `${newPercentage}%`;
            }

            if (progressBar) {
                progressBar.style.background = this.progressGradient;
                progressBar.style.width = `${newPercentage}%`;
                progressBar.setAttribute('data-progress', newPercentage);
            }
        }
    }
}

// Card Factory for creating predefined card types
class FitnessCardFactory {
    static createActiveCaloriesCard(value = 494, percentage = 73) {
        return new AppleFitnessCard({
            value: value,
            label: 'Active<br>Calories',
            icon: '🔥',
            percentage: percentage,
            backgroundColor: '#f2dbe1',
            iconBackgroundColor: 'rgba(255, 0, 0, 0.2)',
            progressGradient: 'linear-gradient(90deg, #cc0000, #ff6666)',
            id: 'active-calories-card'
        });
    }

    static createExerciseMinutesCard(value = 23, percentage = 26) {
        return new AppleFitnessCard({
            value: `${value}m`,
            label: 'Exercise<br>Minutes',
            icon: '⚡',
            percentage: percentage,
            backgroundColor: '#d4f1d4',
            iconBackgroundColor: 'rgba(0, 255, 0, 0.2)',
            progressGradient: 'linear-gradient(90deg, #009900, #66ff66)',
            id: 'exercise-minutes-card'
        });
    }

    static createStandHoursCard(value = 17, percentage = 85) {
        return new AppleFitnessCard({
            value: value,
            label: 'Stand<br>Hours',
            icon: '🚶',
            percentage: percentage,
            backgroundColor: '#d4e6f1',
            iconBackgroundColor: 'rgba(0, 0, 255, 0.2)',
            progressGradient: 'linear-gradient(90deg, #0066cc, #66b3ff)',
            id: 'stand-hours-card'
        });
    }

    static createCustomCard(options) {
        return new AppleFitnessCard(options);
    }
}

// Gas Station Dashboard JavaScript
class GasStationDashboard {
    constructor() {
        this.cards = [];
        this.apiBaseUrl = 'http://localhost:3001/api';
        this.init();
    }

    async init() {
        this.setCurrentDate();
        await this.loadCardsFromAPI();
        this.renderCards();
        this.animateAllCards();
    }

    setCurrentDate() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const today = new Date();
            const options = {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            };
            dateElement.textContent = today.toLocaleDateString('en-US', options);
        }
    }

    async loadCardsFromAPI() {
        try {
            console.log('🔄 Loading cards from API...');
            const response = await fetch(`${this.apiBaseUrl}/cards`);

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const result = await response.json();

            if (result.success && result.data) {
                this.cards = result.data.map(cardData => new AppleFitnessCard(cardData));
                console.log('✅ Cards loaded from API:', this.cards.length);
            } else {
                throw new Error('Invalid API response format');
            }
        } catch (error) {
            console.error('❌ Failed to load cards from API:', error);
            // Fallback to static cards
            console.log('🔄 Using fallback static cards...');
            this.createFallbackCards();
        }
    }

    createFallbackCards() {
        // Fallback cards if API is not available
        this.cards = [
            FitnessCardFactory.createActiveCaloriesCard(494, 73),
            FitnessCardFactory.createExerciseMinutesCard(23, 26),
            FitnessCardFactory.createStandHoursCard(17, 85)
        ];
    }

    renderCards() {
        const showcase = document.querySelector('.card-showcase');
        if (showcase) {
            // Create a grid container for multiple cards
            showcase.innerHTML = `
                <div class="cards-grid">
                    ${this.cards.map(card => card.render()).join('')}
                </div>
            `;
        }
    }

    animateAllCards() {
        // Animate cards with staggered timing
        this.cards.forEach((card, index) => {
            setTimeout(() => {
                card.animateProgress();
            }, index * 200 + 800);
        });
    }

    // Method to add a custom card
    addCustomCard(options) {
        const newCard = FitnessCardFactory.createCustomCard(options);
        this.cards.push(newCard);
        this.renderCards();

        // Animate the new card
        setTimeout(() => {
            newCard.animateProgress();
        }, 100);

        return newCard;
    }

    // Method to update existing card
    updateCard(cardId, updates) {
        const card = this.cards.find(c => c.id === cardId);
        if (card) {
            if (updates.value !== undefined) {
                card.updateValue(updates.value);
            }
            if (updates.percentage !== undefined) {
                card.updatePercentage(updates.percentage);
            }
        }
    }

    // Method to update card via API
    async updateCardViaAPI(cardId, updates) {
        try {
            console.log(`🔄 Updating card ${cardId} via API...`);
            const response = await fetch(`${this.apiBaseUrl}/cards/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                // Update the local card
                this.updateCard(cardId, updates);
                console.log('✅ Card updated via API:', result.data);
                return result.data;
            } else {
                throw new Error('API update failed');
            }
        } catch (error) {
            console.error('❌ Failed to update card via API:', error);
            // Still update locally as fallback
            this.updateCard(cardId, updates);
            throw error;
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new GasStationDashboard();

    // Make dashboard and card components available globally for debugging
    window.dashboard = dashboard;
    window.AppleFitnessCard = AppleFitnessCard;
    window.FitnessCardFactory = FitnessCardFactory;

    // Add some console logging for demo
    console.log('🎯 Apple Fitness Card Component System initialized');
    console.log('📊 Available cards:', dashboard.cards.length);
    console.log('🔌 API Base URL:', dashboard.apiBaseUrl);
    console.log('');
    console.log('💡 Try these commands:');
    console.log('dashboard.updateCard("active-calories-card", {value: 550, percentage: 82})  // Local update');
    console.log('dashboard.updateCardViaAPI("active-calories-card", {value: 600, percentage: 90})  // API update');
    console.log('dashboard.addCustomCard({value: "12", label: "Custom<br>Metric", icon: "⭐", percentage: 45, backgroundColor: "#ffe6cc", iconBackgroundColor: "rgba(255, 193, 7, 0.3)"})');
    console.log('FitnessCardFactory.createCustomCard({value: "999", label: "Test<br>Card", icon: "🎉", percentage: 100, backgroundColor: "#e6f3ff", iconBackgroundColor: "rgba(0, 123, 255, 0.2)"})');
});

// Service Worker registration for PWA functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}