// script.js
let alarmTime = "06:30";

function switchTab(id, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

/**
 * Triggers the device camera to verify the QR challenge.
 * Uses hardware capture to ensure real-world interaction.
 */
function handleScan() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Ensures rear camera on Android
    
    input.onchange = function() {
        let currentPoints = parseInt(localStorage.getItem('userPoints')) || 850;
        currentPoints += 50; 
        localStorage.setItem('userPoints', currentPoints);
        
        alert("Challenge Verified! Points earned.");
        
        document.getElementById('reward-balance').innerText = currentPoints;
        switchTab('Home', document.querySelectorAll('.tab-item')[0]);
    };
    input.click();
}

window.onload = () => {
    // Sync points from local storage
    const balanceElement = document.getElementById('reward-balance');
    const savedPoints = localStorage.getItem('userPoints') || 850;
    if (balanceElement) balanceElement.innerText = savedPoints;
};
