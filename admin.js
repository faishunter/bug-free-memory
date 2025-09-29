// Admin functionality for Roblox Garden Store

// Add new item to the store
function addNewItem() {
    const name = document.getElementById('item-name').value.trim();
    const price = parseInt(document.getElementById('item-price').value);
    const description = document.getElementById('item-description').value.trim();
    const imageFile = document.getElementById('item-image').files[0];
    
    // Validate input
    if (!name || !price || !description) {
        showNotification('❌ Please fill in all fields!', 'error');
        return;
    }

    if (price <= 0) {
        showNotification('❌ Price must be greater than 0!', 'error');
        return;
    }
    
    // Create new item element
    const storeGrid = document.getElementById('store-items');
    const newItem = document.createElement('div');
    newItem.className = 'store-item';
    
    let imageContent = '🆕'; // Default emoji for new items
    
    // Generate unique ID for the item
    const itemId = 'item-' + Date.now();
    
    newItem.innerHTML = `
        <div class="item-image" id="${itemId}-image">${imageContent}</div>
        <div class="item-info">
            <h3>${name}</h3>
            <p>${description}</p>
            <div class="item-price">
                <div class="price"><div class="robux-icon">R$</div>${price}</div>
                <button class="buy-btn" onclick="buyItem('${name}', ${price})">Buy Now</button>
            </div>
        </div>
        <button class="delete-btn" onclick="deleteItem(this)" style="
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 107, 107, 0.8);
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            color: white;
            cursor: pointer;
            font-size: 16px;
            display: none;
        ">❌</button>
    `;
    
    // Show delete button on hover for admin
    newItem.addEventListener('mouseenter', function() {
        const deleteBtn = this.querySelector('.delete-btn');
        if (deleteBtn) deleteBtn.style.display = 'block';
    });
    
    newItem.addEventListener('mouseleave', function() {
        const deleteBtn = this.querySelector('.delete-btn');
        if (deleteBtn) deleteBtn.style.display = 'none';
    });
    
    // Handle image upload if file is provided
    if (imageFile) {
        handleImageUpload(imageFile, itemId + '-image');
    }
    
    storeGrid.appendChild(newItem);
    
    // Add entrance animation
    newItem.style.opacity = '0';
    newItem.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newItem.style.transition = 'all 0.5s ease';
        newItem.style.opacity = '1';
        newItem.style.transform = 'translateY(0)';
    }, 100);
    
    // Store item data
    storeItems.push({
        id: itemId,
        name: name,
        price: price,
        description: description,
        image: imageFile ? true : false
    });
    
    // Clear form
    clearAdminForm();
    
    showNotification(`✅ "${name}" has been added to the store!`, 'success');
    
    // Switch to store tab to show the
