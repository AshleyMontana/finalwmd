// Dark Mode Toggle
function setupDarkMode() {
  const toggle = document.getElementById('modeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      toggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
      // Save preference to localStorage
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
  }
  
  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    if (toggle) toggle.textContent = 'Light Mode';
  }
}

// Cart Functionality
function updateCartCount() {
  const cartCountElements = document.querySelectorAll('#cartCount');
  const cart = JSON.parse(localStorage.getItem('montanaCart')) || [];
  
  cartCountElements.forEach(element => {
    element.textContent = cart.length;
  });
}

// Login Functionality
function showLogin() {
  const username = prompt("Enter your name to log in:");
  if (username) {
    localStorage.setItem("montanaUser", username);
    alert("Welcome " + username + "! You are now logged in.");
  }
}

// Check Login for Trial Page
function checkTrialAccess() {
  const user = localStorage.getItem('montanaUser');
  const welcomeUser = document.getElementById('welcomeUser');
  
  if (!user && window.location.pathname.includes('trial.html')) {
    alert('Please log in to access the Free Trial.');
    window.location.href = "index.html";
  } else if (welcomeUser) {
    welcomeUser.textContent = `Welcome, ${user}`;
  }
}

// Feedback Form Handling
function setupFeedbackForms() {
  const feedbackForms = document.querySelectorAll('#feedbackForm, #contactForm');
  
  feedbackForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      this.style.display = 'none';
      const thankYouMessage = this.closest('.card-body').querySelector('#thankYouMessage');
      if (thankYouMessage) thankYouMessage.style.display = 'block';
    });
  });
}

// Search Functionality
function searchGames() {
  const searchTerm = document.getElementById('searchInput')?.value.toLowerCase().trim();
  if (!searchTerm) return;

  const gameCards = document.getElementsByClassName('game-card');
  let found = false;

  Array.from(gameCards).forEach(card => {
    const gameName = card.querySelector('.card-title')?.textContent.toLowerCase();
    if (gameName?.includes(searchTerm)) {
      card.style.display = 'block';
      found = true;
    } else {
      card.style.display = 'none';
    }
  });

  const notFoundMessage = document.getElementById('notFoundMessage');
  if (notFoundMessage) {
    notFoundMessage.style.display = found ? 'none' : 'block';
  }
}

// Cart Management
function setupCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");
  const cart = JSON.parse(localStorage.getItem("montanaCart")) || [];

  function renderCart() {
    if (!cartItemsEl) return;
    
    cartItemsEl.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = `<div class="alert alert-info">Your cart is empty</div>`;
      if (totalEl) totalEl.textContent = "0.00";
      return;
    }

    cart.forEach(item => {
      total += item.price;
      cartItemsEl.innerHTML += `
        <div class="cart-item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5>${item.name}</h5>
              <p class="mb-0">$${item.price.toFixed(2)}</p>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeItem('${item.name}')">Remove</button>
          </div>
        </div>
      `;
    });

    if (totalEl) totalEl.textContent = total.toFixed(2);
    updateCartCount();
  }

  window.removeItem = function(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index > -1) {
      cart.splice(index, 1);
      localStorage.setItem("montanaCart", JSON.stringify(cart));
      renderCart();
    }
  };

  window.showBankForm = function() {
    if (cart.length === 0) return;
    const bankModal = document.getElementById("bankModal");
    if (bankModal) {
      new bootstrap.Modal(bankModal).show();
    }
  };

  const bankForm = document.getElementById("bankForm");
  if (bankForm) {
    bankForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Simple validation
      const inputs = Array.from(this.elements).filter(el => el.tagName === 'INPUT');
      if (inputs.some(input => !input.value.trim())) {
        alert("Please fill all fields");
        return;
      }

      alert("Payment successful! Thank you for your purchase.");
      localStorage.removeItem("montanaCart");
      cart.length = 0;
      renderCart();
      bootstrap.Modal.getInstance(document.getElementById("bankModal")).hide();
    });
  }

  renderCart();
}

// Game Library
function setupGameLibrary() {
  const gameList = document.getElementById("gameList");
  if (!gameList) return;

  const games = [
    { name: "Spider-Man 2", price: 69.99, image: "C:\Users\Bayfo\OneDrive - Botswana Accountancy College (1)\wmd\images\wmd.jpg" },
    { name: "God of War: Ragnarok", price: 59.99, image: "https://m.media-amazon.com/images/I/91B7+8lG3XL._SL1500_.jpg" },
    { name: "The Last of Us Part I", price: 49.99, image: "https://m.media-amazon.com/images/I/81tL3Cb9gQL._SL1500_.jpg" },
    { name: "Tekken 3 (Classic)", price: 19.99, image: "https://upload.wikimedia.org/wikipedia/en/d/d7/Tekken_3_cover.jpg" },
    { name: "Crash Bandicoot Trilogy", price: 39.99, image: "https://m.media-amazon.com/images/I/81lz8q3sHjL._SL1500_.jpg" },
    { name: "FIFA 23", price: 44.99, image: "https://m.media-amazon.com/images/I/81lZ5Lv++LL._SL1500_.jpg" },
    { name: "Hogwarts Legacy", price: 69.99, image: "https://m.media-amazon.com/images/I/913C+8nNqmL._SL1500_.jpg" },
    { name: "Elden Ring", price: 59.99, image: "https://m.media-amazon.com/images/I/81WmojWAxFL._SL1500_.jpg" },
    { name: "Resident Evil 4 Remake", price: 54.99, image: "https://m.media-amazon.com/images/I/81xN9qg3nGL._SL1500_.jpg" },
    { name: "Final Fantasy XVI", price: 69.99, image: "https://m.media-amazon.com/images/I/91pS+1n+1hL._SL1500_.jpg" },
    { name: "Uncharted: Legacy of Thieves", price: 49.99, image: "https://m.media-amazon.com/images/I/81P0D8n+ZoL._SL1500_.jpg" },
    { name: "Gran Turismo 7", price: 59.99, image: "https://m.media-amazon.com/images/I/81YJkF0tJLL._SL1500_.jpg" },
    { name: "Cyberpunk 2077", price: 39.99, image: "https://m.media-amazon.com/images/I/81HfmqYyMLL._SL1500_.jpg" },
    { name: "Call of Duty: Modern Warfare II", price: 69.99, image: "https://m.media-amazon.com/images/I/813q6wVZ6oL._SL1500_.jpg" },
    { name: "Ghost of Tsushima", price: 49.99, image: "https://m.media-amazon.com/images/I/81L5dG+474L._SL1500_.jpg" }
  ];

  function renderGames() {
    gameList.innerHTML = "";
    games.forEach(game => {
      const card = document.createElement("div");
      card.className = "col game-card";
      card.innerHTML = `
        <div class="card h-100">
          <img src="${game.image}" class="card-img-top" alt="${game.name}">
          <div class="card-body">
            <h5 class="card-title">${game.name}</h5>
            <p class="price text-success fw-bold">$${game.price.toFixed(2)}</p>
            <button class="btn btn-primary w-100" onclick="addToCart('${game.name}')">Buy Now</button>
          </div>
        </div>
      `;
      gameList.appendChild(card);
    });
  }

  window.addToCart = function(gameName) {
    const game = games.find(g => g.name === gameName);
    if (!game) return;

    let cart = JSON.parse(localStorage.getItem("montanaCart")) || [];
    
    // Check if game already exists in cart
    const existingItem = cart.find(item => item.name === game.name);
    
    if (!existingItem) {
      cart.push(game);
      localStorage.setItem("montanaCart", JSON.stringify(cart));
      updateCartCount();
      alert(`${game.name} added to cart! 🎉`);
    } else {
      alert(`${game.name} is already in your cart!`);
    }
  };

  renderGames();

  // Enable search on Enter key
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') searchGames();
    });
  }
}

// Promotion Page Functions
function setupPromotions() {
  window.claimTrial = function() {
    const user = localStorage.getItem("montanaUser");
    if (user) {
      alert("Free Trial Activated! 🎮 Enjoy your Spider-Man 2 demo for 7 days.");
    } else {
      alert("Please log in to claim the trial.");
    }
  };
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupDarkMode();
  updateCartCount();
  checkTrialAccess();
  setupFeedbackForms();
  setupCart();
  setupGameLibrary();
  setupPromotions();
});