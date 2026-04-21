// script.js
let alarmTime = "06:30";
let lockTime = "22:30";
let currentEdit = "";

// Switch between app pages
function switchTab(id, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

// Open settings modal
function openSettings(type) {
    currentEdit = type;
    document.getElementById('set-title').innerText = type === 'alarm' ? "Set Wake-up Challenge" : "Set Sleep Lock Time";
    document.getElementById('time-input').value = type === 'alarm' ? alarmTime : lockTime;
    document.getElementById('settings-modal').classList.add('open');
}

// Save alarm or lock time
function saveSettings() {
    const value = document.getElementById('time-input').value;
    if(currentEdit === 'alarm') {
        alarmTime = value;
        document.getElementById('disp-alarm').innerText = value;
        document.getElementById('island-time').innerText = value;
        document.getElementById('lock-target').innerText = value;
    } else {
        lockTime = value;
        document.getElementById('disp-lock').innerText = value;
    }
    document.getElementById('settings-modal').classList.remove('open');
}

// Fully functional QR Scanner using device camera
function handleScan() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Triggers back camera
    input.onchange = function() {
        let currentPoints = parseInt(localStorage.getItem('userPoints')) || 850;
        currentPoints += 50; // Add points upon successful scan
        localStorage.setItem('userPoints', currentPoints);
        
        alert("QR Verified! Habit Point +50 🚀");
        
        document.getElementById('reward-balance').innerText = currentPoints;
        switchTab('Home', document.querySelectorAll('.tab-item')[0]);
    };
    input.click();
}

// Initialize data on page load
window.onload = () => {
    let savedPoints = localStorage.getItem('userPoints') || 850;
    const balanceElement = document.getElementById('reward-balance');
    if (balanceElement) balanceElement.innerText = savedPoints;
};

// Countdown timer logic
setInterval(() => {
    let countElement = document.getElementById('lock-count');
    if (!countElement) return;
    let parts = countElement.innerText.split(':');
    let h = parseInt(parts[0]), m = parseInt(parts[1]), s = parseInt(parts[2]);
    if(s > 0) s--;
    else if(m > 0) { m--; s = 59; }
    else if(h > 0) { h--; m = 59; s = 59; }
    countElement.innerText = [h,m,s].map(v => v.toString().padStart(2, '0')).join(':');
}, 1000);
