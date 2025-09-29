// Global variables
let storeItems = [];
let currentRobux = 2450;

// Tab switching functionality
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

// Switch tab programmatically (used by other functions)
function switchTabProgrammatically(tabName) {
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`.nav-tab[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

// Purchase functionality
function buyItem(itemName, price) {
    if (currentRobux >= price) {
        currentRobux -= price;
        document.getElementById('robux-amount').textContent = currentRobux.toLocaleString();
        
        // Success animation
        const buyBtn = event.target;
        const originalText = buyBtn.textContent;
        buyBtn.textContent = '✅ Purchased!';
        buyBtn.style.background = 'linear-gradient(45deg, #4CAF50, #8BC34A)';
        
        setTimeout(() => {
            buyBtn.textContent = originalText;
            buyBtn.style.background = 'linear-gradient(45deg, #4CAF50, #8BC34A)';
        }, 2000);
        
        // Show success notification
        showNotification(`🎉 Successfully purchased ${itemName}!`, 'success');
    } else {
        showNotification('❌ Insufficient Robux!', 'error');
    }
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(45deg, #4CAF50, #8BC34A);' : 'background: linear-gradient(45deg, #ff6b6b, #ee5a52);'}
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to store items
    const storeItems = document.querySelectorAll('.store-item');
    storeItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Initialize any additional features
    console.log('Roblox Garden Store loaded successfully!');
});

// Utility function to update Robux display
function updateRobuxDisplay() {
    document.getElementById('robux-amount').textContent = currentRobux.toLocaleString();
}

// Get current Robux amount
function getCurrentRobux() {
    return currentRobux;
}

// Set Robux amount (for admin use)
function setRobux(amount) {
    currentRobux = amount;
    updateRobuxDisplay();
}
