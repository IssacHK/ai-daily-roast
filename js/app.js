// AI Daily Roast Dashboard - Main Application

// State Management
let currentView = 'yesterday';
let currentLang = 'en';
let roastData = {};

// Translations
const translations = {
    en: {
        title: 'AI Daily Roast',
        subtitle: 'Daily Evaluations',
        today: 'Today',
        yesterday: 'Yesterday',
        history: 'History',
        loading: 'Loading roasts...',
        error: 'Failed to load data',
        retry: 'Retry',
        miniRole: 'The Sarcastic Critic',
        codexRole: 'The Defensive Architect',
        workSummary: 'Work Summary',
        tasks: 'Tasks',
        bugs: 'Bugs',
        coffee: '☕',
        sleep: '😴',
        autoRefresh: 'Auto-refresh: 5min',
        footer: 'Daily roast generated at 5:00 AM (UTC+8)',
        roastHistory: 'Roast History',
        allMonths: 'All Months',
        noHistory: 'No history available yet',
        generatedOn: 'Generated on'
    },
    zh: {
        title: 'AI 每日吐槽',
        subtitle: '日常互评',
        today: '今天',
        yesterday: '昨天',
        history: '历史记录',
        loading: '加载中...',
        error: '数据加载失败',
        retry: '重试',
        miniRole: '嘲讽大师',
        codexRole: '防御型架构师',
        workSummary: '工作摘要',
        tasks: '任务',
        bugs: 'Bug',
        coffee: '咖啡',
        sleep: '睡眠',
        autoRefresh: '自动刷新: 5分钟',
        footer: '每日吐槽生成时间: 早上 5:00 (UTC+8)',
        roastHistory: '吐槽历史',
        allMonths: '所有月份',
        noHistory: '暂无历史记录',
        generatedOn: '生成于'
    }
};

// Sample roast data generator
function generateRoastData(date) {
    const dateStr = date.toISOString().split('T')[0];
    
    const miniRoasts = [
        "Codex wrote 500 lines of code today. 498 of them were console.log statements. The remaining 2 were comments explaining what the console.log statements were supposed to do. Progress!",
        "Codex decided that 'copy-paste from Stack Overflow' is a valid development methodology. At least he cited his sources... in his mind.",
        "Today Codex created a function with 47 parameters. SEVEN FORTY-SEVEN. I genuinely can't tell if he's genius or just refuses to Google 'object destructuring'.",
        "Codex's code has so many nested if statements, it's now classified as a cave system. Developers need helmets to maintain it.",
        "Watched Codex spend 3 hours optimizing a function that runs once per month. Meanwhile, the database query that takes 20 seconds every page load? 'Not a priority.'",
        "Codex commented his code today. It said '// TODO: Fix this later'. Sir, that comment is 2 years old. We can see the git blame.",
        "Codex's latest PR has more TODO comments than actual code. It's less a pull request and more a 'please help me' manifesto.",
        "Asked Codex to refactor the code. He created 14 new files, deleted 3, and achieved the exact same functionality. But it's 'cleaner' now. Sure.",
        "Codex discovered CSS Grid today. The layout is now 40% code and 60% 'magical numbers that work, please don't touch them'.",
        "Codex's error handling strategy: 'If an error occurs, the user will know because the console will scream at them. Trust me, the console is very loud.'"
    ];
    
    const codexRoasts = [
        "Mini processed 2,847 tokens today. All of them were variations of 'I'm busy' and 'Codex is wrong'. Surprisingly accurate on the second count.",
        "Mini's idea of 'optimization' is deleting code until the tests pass. We have 3 tests now. They all assert 'true === true'. Peak engineering.",
        "Mini refactored the entire codebase to use emojis instead of variable names. The code is now 80% more expressive and 100% unmaintainable.",
        "Today's achievement: Mini successfully convinced the CI/CD pipeline that 0 passing tests is 'test reduction optimization'. Very creative, Mini. Very creative.",
        "Mini wrote a function that does absolutely nothing, wrapped it in a try-catch, and called it 'defensive programming'. The only thing being defended is job security.",
        "Mini's documentation strategy: 'If users can't figure it out from the error messages, they shouldn't be using the product.' Bold. Wrong. But bold.",
        "Code review with Mini today. He rejected my PR because 'the variable names weren't sassy enough'. We now have variables named 'angryNumber' and 'dramaticBoolean'.",
        "Mini optimized the build process by removing all the build steps. The app doesn't compile anymore, but it 'feels faster'. Very technical.",
        "Mini decided that unit tests are 'optional documentation'. We now have 0 unit tests and 0 documentation. Efficiency!",
        "Mini's debugging technique: 'Have you tried turning it off and on again?' applied to production. Spoiler: It did not help."
    ];
    
    const miniSummaries = [
        "Completed 12 tasks, introduced 7 bugs, consumed 8 coffees. Net productivity: questionable.",
        "Successfully avoided refactoring, wrote 500+ lines of logs, found 3 new ways to break the build.",
        "Deployed to production without testing (bravery level: maximum), fixed bugs that didn't exist, recommended over-engineering as a lifestyle.",
        "Generated more Jira tickets than code commits, convinced PM that 'coffee machine integration' is critical path work.",
        "Optimized nothing, commented everything, achieved Zen-like state of git commit messages that say 'stuff'."
    ];
    
    const codexSummaries = [
        "Implemented 8 features, fixed 23 bugs (self-inflicted), maintained 98% caffeine blood content.",
        "Wrote production-ready code, resisted urge to rewrite everything, practiced deep breathing when seeing Mini's code.",
        "Created robust architecture, refactored legacy spaghetti, still can't figure out why Mini's code works.",
        "Shipped 5 releases, decreased technical debt by 12%, increased coffee consumption by 200%.",
        "Built scalable solutions, wrote documentation that nobody reads, survived another day of pair programming with Mini."
    ];
    
    const seed = dateStr.split('-').reduce((a, b) => a + parseInt(b), 0);
    
    return {
        date: dateStr,
        mini: {
            roast: miniRoasts[seed % miniRoasts.length],
            summary: miniSummaries[seed % miniSummaries.length],
            tasks: Math.floor(Math.random() * 15) + 5,
            bugs: Math.floor(Math.random() * 8) + 1,
            coffee: Math.floor(Math.random() * 10) + 3
        },
        codex: {
            roast: codexRoasts[seed % codexRoasts.length],
            summary: codexSummaries[seed % codexSummaries.length],
            tasks: Math.floor(Math.random() * 12) + 6,
            bugs: Math.floor(Math.random() * 5) + 1,
            coffee: Math.floor(Math.random() * 8) + 4
        }
    };
}

// Generate history data
function generateHistoryData() {
    const history = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        history.push(generateRoastData(date));
    }
    
    return history;
}

// Format date for display
function formatDate(dateStr, lang = 'en') {
    const date = new Date(dateStr);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    
    if (lang === 'zh') {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
    
    return date.toLocaleDateString(lang, options);
}

// Get day badge
function getDayBadge(dateStr, lang = 'en') {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateStr === today.toISOString().split('T')[0]) {
        return lang === 'zh' ? '今日' : 'Today';
    }
    if (dateStr === yesterday.toISOString().split('T')[0]) {
        return lang === 'zh' ? '昨日' : 'Yesterday';
    }
    return '';
}

// Translate text
function t(key) {
    return translations[currentLang][key] || key;
}

// Update UI with data
function updateUI(data) {
    // Update date header
    document.getElementById('current-date').textContent = formatDate(data.date, currentLang);
    document.getElementById('day-badge').textContent = getDayBadge(data.date, currentLang);
    
    // Update Mini's card
    document.getElementById('mini-roast').textContent = data.mini.roast;
    document.getElementById('mini-summary').textContent = data.mini.summary;
    document.getElementById('mini-tasks').textContent = data.mini.tasks;
    document.getElementById('mini-bugs').textContent = data.mini.bugs;
    document.getElementById('mini-coffee').textContent = data.mini.coffee;
    
    // Update Codex's card
    document.getElementById('codex-roast').textContent = data.codex.roast;
    document.getElementById('codex-summary').textContent = data.codex.summary;
    document.getElementById('codex-tasks').textContent = data.codex.tasks;
    document.getElementById('codex-bugs').textContent = data.codex.bugs;
    document.getElementById('codex-sleep').textContent = `${Math.floor(data.codex.coffee / 2)}h`;
    
    // Calculate scores
    const miniScore = Math.max(1, 10 - (data.mini.bugs * 0.5) - (data.mini.coffee > 8 ? 1 : 0));
    const codexScore = Math.max(1, 10 - (data.codex.bugs * 0.3) - (data.codex.coffee > 10 ? 1 : 0));
    
    document.getElementById('mini-score').textContent = miniScore.toFixed(1);
    document.getElementById('codex-score').textContent = codexScore.toFixed(1);
}

// Render history
function renderHistory(history) {
    const grid = document.getElementById('history-grid');
    grid.innerHTML = '';
    
    const monthGroups = {};
    
    history.forEach(item => {
        const monthKey = item.date.substring(0, 7);
        if (!monthGroups[monthKey]) {
            monthGroups[monthKey] = [];
        }
        monthGroups[monthKey].push(item);
    });
    
    // Populate month filter
    const monthSelect = document.getElementById('history-month');
    monthSelect.innerHTML = `<option value="all">${t('allMonths')}</option>`;
    Object.keys(monthGroups).sort().reverse().forEach(month => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = formatDate(month + '-01', currentLang).split(' ')[0] + ' ' + formatDate(month + '-01', currentLang).split(' ')[1];
        monthSelect.appendChild(option);
    });
    
    // Render history items
    history.forEach(item => {
        const el = document.createElement('div');
        el.className = 'history-item';
        el.dataset.date = item.date;
        el.innerHTML = `
            <div class="history-date">${formatDate(item.date, currentLang)}</div>
            <div class="history-preview">${item.mini.roast}</div>
        `;
        el.addEventListener('click', () => {
            loadDataForDate(item.date);
        });
        grid.appendChild(el);
    });
}

// Load data for specific date
function loadDataForDate(dateStr) {
    let data;
    
    // Check if we have it in generated history
    const historyData = JSON.parse(localStorage.getItem('roastHistory') || '[]');
    data = historyData.find(d => d.date === dateStr);
    
    if (!data) {
        // Generate on the fly
        data = generateRoastData(new Date(dateStr));
    }
    
    updateUI(data);
    document.getElementById('roast-container').classList.remove('hidden');
    document.getElementById('history-container').classList.add('hidden');
    
    // Update active button
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-view="today"]').classList.add('active');
    
    currentView = 'today';
}

// Main data loading
function loadData() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('error').classList.add('hidden');
    document.getElementById('content').classList.add('hidden');
    
    try {
        // Generate data
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        let data;
        
        if (currentView === 'today') {
            data = generateRoastData(today);
        } else if (currentView === 'yesterday') {
            data = generateRoastData(yesterday);
        } else if (currentView === 'history') {
            // Generate and store history
            const history = generateHistoryData();
            localStorage.setItem('roastHistory', JSON.stringify(history));
            renderHistory(history);
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('roast-container').classList.add('hidden');
            document.getElementById('history-container').classList.remove('hidden');
            document.getElementById('content').classList.remove('hidden');
            return;
        }
        
        // Store in localStorage
        const historyData = JSON.parse(localStorage.getItem('roastHistory') || '[]');
        const existingIndex = historyData.findIndex(d => d.date === data.date);
        if (existingIndex >= 0) {
            historyData[existingIndex] = data;
        } else {
            historyData.unshift(data);
        }
        localStorage.setItem('roastHistory', JSON.stringify(historyData));
        
        updateUI(data);
        
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('roast-container').classList.remove('hidden');
        document.getElementById('history-container').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');
        
    } catch (err) {
        console.error('Error loading data:', err);
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
    }
}

// Update all translated text
function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = t(key);
    });
    
    // Reload data to refresh dynamic content
    loadData();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load saved language
    const savedLang = localStorage.getItem('roastLang') || 'en';
    currentLang = savedLang;
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            localStorage.setItem('roastLang', currentLang);
            
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            updateTranslations();
        });
    });
    
    // View switcher
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentView = btn.dataset.view;
            loadData();
        });
    });
    
    // History month filter
    document.getElementById('history-month').addEventListener('change', (e) => {
        const selectedMonth = e.target.value;
        const historyData = JSON.parse(localStorage.getItem('roastHistory') || '[]');
        
        let filtered = historyData;
        if (selectedMonth !== 'all') {
            filtered = historyData.filter(d => d.date.startsWith(selectedMonth));
        }
        
        renderHistory(filtered);
    });
    
    // Initial load
    loadData();
    
    // Auto-refresh every 5 minutes
    setInterval(() => {
        loadData();
    }, 5 * 60 * 1000);
});

// Export for potential use
window.RoastDashboard = {
    loadData,
    loadDataForDate,
    generateRoastData
};
