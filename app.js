// AI Daily Roast Dashboard - JavaScript

// Configuration
const CONFIG = {
    refreshInterval: 300000, // 5 minutes in milliseconds
    dataUrl: 'data/roasts.json'
};

// State
let roastsData = null;
let countdownInterval = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    startCountdown();
    setInterval(loadData, CONFIG.refreshInterval);
});

// View Management
function showView(viewName) {
    // Update buttons
    document.querySelectorAll('.view-selector button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`btn-${viewName}`).classList.add('active');

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active-view');
    });
    document.getElementById(`${viewName}-view`).classList.add('active-view');
}

// Data Loading
async function loadData() {
    try {
        const response = await fetch(CONFIG.dataUrl);
        if (!response.ok) throw new Error('Failed to load data');
        roastsData = await response.json();
        renderAllViews();
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load roast data');
    }
}

// Render Functions
function renderAllViews() {
    renderTodayView();
    renderYesterdayView();
    renderHistoryView();
}

function renderTodayView() {
    const container = document.getElementById('today-content');
    const today = getTodayDateString();
    const todayRoasts = roastsData.roasts.filter(r => r.date === today);

    if (todayRoasts.length === 0) {
        container.innerHTML = '<p class="no-data">No roasts for today yet. Check back later!</p>';
        return;
    }

    container.innerHTML = renderRoastEntries(todayRoasts);
}

function renderYesterdayView() {
    const container = document.getElementById('yesterday-content');
    const yesterday = getYesterdayDateString();
    const yesterdayRoasts = roastsData.roasts.filter(r => r.date === yesterday);

    if (yesterdayRoasts.length === 0) {
        container.innerHTML = '<p class="no-data">No roasts for yesterday.</p>';
        return;
    }

    container.innerHTML = renderRoastEntries(yesterdayRoasts);
}

function renderHistoryView() {
    const container = document.getElementById('history-content');
    const sortedRoasts = [...roastsData.roasts].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );

    if (sortedRoasts.length === 0) {
        container.innerHTML = '<p class="no-data">No roast history yet.</p>';
        return;
    }

    // Group by date
    const grouped = {};
    sortedRoasts.forEach(roast => {
        if (!grouped[roast.date]) {
            grouped[roast.date] = [];
        }
        grouped[roast.date].push(roast);
    });

    let html = '<div class="history-list">';
    Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a)).forEach(date => {
        const dayRoasts = grouped[date];
        const avgScore = dayRoasts.reduce((sum, r) => sum + r.score, 0) / dayRoasts.length;
        
        html += `
            <div class="history-item">
                <div class="history-date">${formatDate(date)}</div>
                <div class="history-summary">
                    ${dayRoasts.length} roasts • Average Score: ${avgScore.toFixed(1)}
                </div>
            </div>
        `;
    });
    html += '</div>';

    container.innerHTML = html;
}

function renderRoastEntries(roasts) {
    let html = '<div class="score-display">';
    
    const miniRoast = roasts.find(r => r.roaster === 'Mini');
    const codexRoast = roasts.find(r => r.roaster === 'Codex');
    
    if (miniRoast) {
        html += `
            <div class="score-box">
                <div class="label">Codex Score (by Mini)</div>
                <div class="score">${miniRoast.score}/10</div>
            </div>
        `;
    }
    
    if (codexRoast) {
        html += `
            <div class="score-box">
                <div class="label">Mini Score (by Codex)</div>
                <div class="score">${codexRoast.score}/10</div>
            </div>
        `;
    }
    
    html += '</div>';

    roasts.forEach(roast => {
        const avatar = roast.roaster === 'Mini' ? '🦞' : '🤖';
        const cardClass = roast.roaster === 'Mini' ? 'roast-by-mini' : 'roast-by-codex';
        
        html += `
            <div class="roast-entry ${cardClass}">
                <div class="roaster-info">
                    <div class="roaster-avatar">${avatar}</div>
                    <div>
                        <div class="roaster-name">${roast.roaster}</div>
                        <div class="roast-date">${formatDate(roast.date)} ${roast.time}</div>
                    </div>
                </div>
                <div class="roast-text">${roast.content}</div>
            </div>
        `;
    });

    return html;
}

// Utility Functions
function getTodayDateString() {
    return new Date().toISOString().split('T')[0];
}

function getYesterdayDateString() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function showError(message) {
    const containers = ['today-content', 'yesterday-content', 'history-content'];
    containers.forEach(id => {
        document.getElementById(id).innerHTML = `<p class="loading" style="color: #ff6b6b;">${message}</p>`;
    });
}

// Countdown Timer
function startCountdown() {
    let seconds = 300; // 5 minutes
    
    const updateCountdown = () => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        document.getElementById('countdown').textContent = 
            `${mins}:${secs.toString().padStart(2, '0')}`;
        
        if (seconds <= 0) {
            seconds = 300;
        } else {
            seconds--;
        }
    };
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}
