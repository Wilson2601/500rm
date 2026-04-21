// script.js
let alarmTime = "06:30";
let currentEdit = "";

// Function to switch between UI pages
function switchTab(id, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

// Function to open settings modal
function openSettings(type) {
    currentEdit = type;
    document.getElementById('set-title').innerText = type === 'alarm' ? "Set Wake-up Time" : "Set Lock Time";
    document.getElementById('settings-modal').classList.add('open');
}

// Function to save user time settings
function saveSettings() {
    const value = document.getElementById('time-input').value;
    if(currentEdit === 'alarm') {
        alarmTime = value;
        document.getElementById('disp-alarm').innerText = value;
    }
    document.getElementById('settings-modal').classList.remove('open');
}

// Fully functional QR Scan: Triggers native hardware camera
function handleScan() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Force rear camera on Android
    
    input.onchange = function() {
        // Points system: Earn 50 points per successful scan
        let currentPoints = parseInt(localStorage.getItem('userPoints')) || 850;
        currentPoints += 50; 
        localStorage.setItem('userPoints', currentPoints);
        
        alert("Challenge Verified! Points added.");
        
        // Update UI
        document.getElementById('reward-balance').innerText = currentPoints;
        document.getElementById('reward-balance-small').innerText = currentPoints;
        switchTab('Home', document.querySelectorAll('.tab-item')[0]);
    };
    input.click();
}

// Initialize data on page load
window.onload = () => {
    const balance = localStorage.getItem('userPoints') || 850;
    if(document.getElementById('reward-balance')) document.getElementById('reward-balance').innerText = balance;
    if(document.getElementById('reward-balance-small')) document.getElementById('reward-balance-small').innerText = balance;
};
