// Gas Station Dashboard JavaScript

class GasStationDashboard {
    constructor() {
        this.metrics = {
            gasVolume: { current: 2847, target: 4000, color: '#ff6b6b' },
            gasProfit: { current: 1423, target: 2400, color: '#4CAF50' },
            insideSales: { current: 892, target: 2200, color: '#2196F3' },
            costPerGallon: { current: 2.89, target: 4.00 },
            totalProfit: { current: 2315, target: 4000 }
        };

        this.init();
    }

    init() {
        this.setCurrentDate();
        this.animateProgressRings();
        this.updateMetricCards();
        this.animateGoalProgressBars();
        this.setupInteractivity();
        this.simulateRealTimeUpdates();
    }

    setCurrentDate() {
        const dateElement = document.getElementById('current-date');
        const today = new Date();
        const options = {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }

    animateProgressRings() {
        const rings = document.querySelectorAll('.progress-ring');

        rings.forEach((ring, index) => {
            const metric = ring.getAttribute('data-metric');
            const data = this.metrics[metric === 'volume' ? 'gasVolume' :
                                    metric === 'profit' ? 'gasProfit' : 'insideSales'];

            if (data) {
                const percentage = (data.current / data.target) * 100;
                const circumference = 2 * Math.PI * parseFloat(ring.getAttribute('r'));
                const offset = circumference - (percentage / 100) * circumference;

                // Animate the ring
                setTimeout(() => {
                    ring.style.strokeDashoffset = offset;
                }, index * 300);
            }
        });
    }

    updateMetricCards() {
        const metricItems = document.querySelectorAll('.metric-item');

        metricItems.forEach((item, index) => {
            const valueElement = item.querySelector('.metric-value');
            const progressElement = item.querySelector('.metric-progress');

            let metric, formatValue;

            switch (index) {
                case 0: // Gas Volume
                    metric = this.metrics.gasVolume;
                    formatValue = metric.current.toLocaleString();
                    break;
                case 1: // Gas Profit
                    metric = this.metrics.gasProfit;
                    formatValue = `$${metric.current.toLocaleString()}`;
                    break;
                case 2: // Inside Sales
                    metric = this.metrics.insideSales;
                    formatValue = `$${metric.current.toLocaleString()}`;
                    break;
            }

            if (metric) {
                const percentage = Math.round((metric.current / metric.target) * 100);

                // Animate value counting up
                this.animateValue(valueElement, 0, metric.current, formatValue.includes('$'));

                // Update progress percentage
                progressElement.textContent = `${percentage}%`;
            }
        });
    }

    animateValue(element, start, end, isCurrency = false) {
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(start + (end - start) * easeOutQuart);

            if (isCurrency) {
                element.textContent = `$${current.toLocaleString()}`;
            } else {
                element.textContent = current.toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    animateGoalProgressBars() {
        const progressBars = document.querySelectorAll('.goal-progress-fill');

        progressBars.forEach((bar, index) => {
            let percentage;

            switch (index) {
                case 0: // Cost per Gallon
                    percentage = (this.metrics.costPerGallon.current / this.metrics.costPerGallon.target) * 100;
                    break;
                case 1: // Total Profit
                    percentage = (this.metrics.totalProfit.current / this.metrics.totalProfit.target) * 100;
                    break;
            }

            if (percentage) {
                setTimeout(() => {
                    bar.style.width = `${Math.min(percentage, 100)}%`;
                }, index * 500);
            }
        });
    }

    setupInteractivity() {
        // Bottom navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Collapse button
        const collapseBtn = document.querySelector('.collapse-btn');
        const goalsGrid = document.querySelector('.goals-grid');

        collapseBtn.addEventListener('click', () => {
            if (goalsGrid.style.display === 'none') {
                goalsGrid.style.display = 'grid';
                collapseBtn.textContent = 'Collapse';
            } else {
                goalsGrid.style.display = 'none';
                collapseBtn.textContent = 'Expand';
            }
        });

        // Metric item hover effects
        const metricItems = document.querySelectorAll('.metric-item');
        metricItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(4px)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });

        // Goal card interactions
        const goalCards = document.querySelectorAll('.goal-card');
        goalCards.forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-2px)';
                }, 150);
            });
        });
    }

    simulateRealTimeUpdates() {
        // Simulate real-time data updates every 30 seconds
        setInterval(() => {
            this.updateMetricsWithNewData();
        }, 30000);

        // Pulse animation for mini rings every 5 seconds
        setInterval(() => {
            const miniRings = document.querySelectorAll('.mini-ring');
            miniRings.forEach((ring, index) => {
                setTimeout(() => {
                    ring.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        ring.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });
        }, 5000);
    }

    updateMetricsWithNewData() {
        // Simulate small changes in metrics
        const variations = {
            gasVolume: Math.floor(Math.random() * 20) - 10,
            gasProfit: Math.floor(Math.random() * 50) - 25,
            insideSales: Math.floor(Math.random() * 30) - 15
        };

        Object.keys(variations).forEach(key => {
            this.metrics[key].current = Math.max(0, this.metrics[key].current + variations[key]);
        });

        // Update cost per gallon slightly
        this.metrics.costPerGallon.current += (Math.random() * 0.02) - 0.01;
        this.metrics.costPerGallon.current = Math.max(0, this.metrics.costPerGallon.current);

        // Recalculate total profit
        this.metrics.totalProfit.current = this.metrics.gasProfit.current + this.metrics.insideSales.current;

        // Re-animate with new data
        this.animateProgressRings();
        this.updateMetricCards();
        this.animateGoalProgressBars();

        // Update goal values
        this.updateGoalValues();
    }

    updateGoalValues() {
        const goalCards = document.querySelectorAll('.goal-card');

        goalCards.forEach((card, index) => {
            const valueElement = card.querySelector('.goal-value');
            const progressFill = card.querySelector('.goal-progress-fill');
            const percentageElement = card.querySelector('.goal-percentage');

            let value, percentage;

            switch (index) {
                case 0: // Cost per Gallon
                    value = `$${this.metrics.costPerGallon.current.toFixed(2)}`;
                    percentage = Math.round((this.metrics.costPerGallon.current / this.metrics.costPerGallon.target) * 100);
                    break;
                case 1: // Total Profit
                    value = `$${this.metrics.totalProfit.current.toLocaleString()}`;
                    percentage = Math.round((this.metrics.totalProfit.current / this.metrics.totalProfit.target) * 100);
                    break;
            }

            if (value && percentage !== undefined) {
                valueElement.textContent = value;
                progressFill.style.width = `${Math.min(percentage, 100)}%`;
                percentageElement.textContent = `${percentage}%`;
            }
        });
    }

    // Method to manually update metrics (for demo purposes)
    updateMetric(metricName, newValue) {
        if (this.metrics[metricName]) {
            this.metrics[metricName].current = newValue;
            this.animateProgressRings();
            this.updateMetricCards();
            this.animateGoalProgressBars();
            this.updateGoalValues();
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new GasStationDashboard();

    // Make dashboard instance available globally for debugging
    window.dashboard = dashboard;

    // Add some console logging for demo
    console.log('🚗 Gas Station Dashboard initialized');
    console.log('💡 Try: dashboard.updateMetric("gasVolume", 3200)');
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