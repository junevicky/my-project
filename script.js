const activities = [
    { title: "Work", color: "#f5a623", icon: "💼", 
      data: { daily: { cur: 5, prev: 3 }, weekly: { cur: 32, prev: 28 }, monthly: { cur: 138, prev: 122 } } },
    { title: "Play", color: "#4c9aff", icon: "🎮", 
      data: { daily: { cur: 2, prev: 1.5 }, weekly: { cur: 12, prev: 9 }, monthly: { cur: 48, prev: 41 } } },
    { title: "Study", color: "#3ecf8e", icon: "📚", 
      data: { daily: { cur: 3.5, prev: 2.2 }, weekly: { cur: 18, prev: 14 }, monthly: { cur: 82, prev: 70 } } },
    { title: "Exercise", color: "#ff6b6b", icon: "🏋️", 
      data: { daily: { cur: 1.2, prev: 0.8 }, weekly: { cur: 6.5, prev: 5 }, monthly: { cur: 28, prev: 24 } } },
    { title: "Social", color: "#cd82ff", icon: "💬", 
      data: { daily: { cur: 1.8, prev: 2 }, weekly: { cur: 10, prev: 12 }, monthly: { cur: 44, prev: 50 } } },
    { title: "Self Care", color: "#ffb347", icon: "🧘", 
      data: { daily: { cur: 1.5, prev: 1.2 }, weekly: { cur: 8, prev: 7 }, monthly: { cur: 34, prev: 30 } } }
];

let currentView = localStorage.getItem('timeView') || 'weekly';

function updateDashboard() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    const prevLabel = { daily: 'Yesterday', weekly: 'Last Week', monthly: 'Last Month' }[currentView];
    
    activities.forEach(act => {
        const time = act.data[currentView];
        const card = document.createElement('div');
        card.className = 'activity-card';
        card.innerHTML = `
            <div class="card-header-bg" style="background: ${act.color}">
                <div class="card-icon">${act.icon}</div>
            </div>
            <div class="card-content">
                <div class="activity-title">
                    <span class="activity-name">${act.title}</span>
                    <span class="menu-dots">⋯</span>
                </div>
                <div class="current-time">${time.cur}hrs</div>
                <div class="previous-time">${prevLabel} - ${time.prev}hrs</div>
            </div>
        `;
        
        card.querySelector('.card-content').onclick = () => {
            alert(`${act.title} (${currentView}): ${time.cur}hrs | ${prevLabel}: ${time.prev}hrs`);
        };
        
        container.appendChild(card);
    });
}

// Setup buttons
document.querySelectorAll('.time-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.time;
        localStorage.setItem('timeView', currentView);
        updateDashboard();
    };
});

// Load saved view
document.querySelector(`.time-btn[data-time="${currentView}"]`).classList.add('active');
updateDashboard();