
const mockData = [
    { 
      walletAddress: "0xF8DbA1f8c8e2B24D4b8DF10C923709cflc02u1500",
      scores: { coding: 2000, design: 3000, networking: 1500 }
    },
    { 
      walletAddress: "0xF8DbA1f8c8e2B24D4b8DF10C923709cfc02EfkFca",
      scores: { coding: 1000, design: 2000, networking: 2500 }
    },
    { 
      walletAddress: "0xF8DbA1f8c8e2B24D4b8DF10C923709cfc02uhbbd4i",
      scores: { coding: 2000, design: 3000, networking: 1500 }
    },
    { 
      walletAddress: "0xF8DbA1f8c8e2B24D4b8DF10C923709cfc02Ef834li",
      scores: { coding: 1000, design: 2000, networking: 2500 }
    },
    { 
      walletAddress: "0xF8DbA1f8c8e2B24D4b8DF10C923709cfc02uhlkrvj",
      scores: { coding: 2000, design: 3000, networking: 1500 }
    },
    { 
      walletAddress: "0xF8DbA1f8c8e2B24D4b8DF10C923709cfc02Ef8064m",
      scores: { coding: 1000, design: 2000, networking: 2500 }
    },
    { 
      walletAddress: "0xAA34B12ACD5e36BB4C9EC8C1023723F7Ef9083klm1",
      scores: { coding: 3000, design: 1000, networking: 2000 }
    }
  ];

let users = [];

// Function to fetch user data from the backend/blockchain
async function fetchUserData() {
  try {
    const response = await fetch("/api/leaderboard");     
    if (!response.ok) throw new Error("Backend not available");

    const data = await response.json();

    // Transform backend data into required structure
    users = data.map(user => ({
      walletAddress: user.walletAddress,
      scores: {
        all: user.scores.coding + user.scores.design + user.scores.networking,
        coding: user.scores.coding,
        design: user.scores.design,
        networking: user.scores.networking,
      },
      categories: ["all", "coding", "design", "networking"],
    }));

    updateLeaderboards();
  } catch (error) {
    console.warn("Using mock data:", error.message);
    
    // MOck for testing
    users = mockData.map(user => ({
      walletAddress: user.walletAddress,
      scores: {
        all: user.scores.coding + user.scores.design + user.scores.networking,
        coding: user.scores.coding,
        design: user.scores.design,
        networking: user.scores.networking,
      },
      categories: ["all", "coding", "design", "networking"],
    }));
  }
}

/***********************************************************/
// Function to simulate score updates for testing
function simulateScoreUpdates() {
  users.forEach(user => {
    user.scores.coding = Math.floor(Math.random() * 10000);
    user.scores.design = Math.floor(Math.random() * 10000);
    user.scores.networking = Math.floor(Math.random() * 10000);
    user.scores.all = 
      user.scores.coding + user.scores.design + user.scores.networking;
  });

  updateLeaderboards();
}
/**********************************************************/

// Function to dynamically create a user template
function createUserTemplate(user, category) {
  return `
    <div class="user">
      <span class="details">
        <span class="position"></span>
        <span class="address">${user.walletAddress}</span>
      </span>
      <span class="points">
        <i class='bx bxl-bitcoin'></i>
        <span><span class="score">${user.scores[category]}</span><small>Lifetime Points</small></span>
      </span>
      <span class="pos-change">
        <i class='bx bxs-up-arrow'></i>
        <span class="change">0</span>
        <span>positions</span>
      </span>
    </div>
  `;
}


// Store previous positions for all categories
const previousPositions = {
    all: new Map(),
    coding: new Map(),
    design: new Map(),
    networking: new Map(),
  };
  
  // Function to update the leaderboards
  function updateLeaderboards() {
    const categories = ["all", "coding", "design", "networking"];
  
    categories.forEach(category => {
      const container = document.querySelector(`.${category}`);
      const filteredUsers = users.filter(user => user.categories.includes(category));
  
      // Sort users by their scores for the current category
      filteredUsers.sort((a, b) => b.scores[category] - a.scores[category]);
  
      // Clear current leaderboard
      container.innerHTML = "";
  
      // Get previous positions for this category
      const prevPositions = previousPositions[category];
  
      // Add sorted users to the leaderboard
      filteredUsers.forEach((user, index) => {
        const newPosition = index + 1; // Leaderboards start at position 1
        const previousPosition = prevPositions.get(user.walletAddress) || newPosition; // Default to current if not found
        const positionChange = previousPosition - newPosition;
  
        // Create user HTML
        const userHTML = createUserTemplate(user, category);
        const userElement = document.createElement("div");
        userElement.innerHTML = userHTML;
        const userNode = userElement.firstElementChild;
  
        // Update position
        userNode.querySelector(".position").textContent = `${newPosition}.`;
  
        // Update position change
        const changeSpan = userNode.querySelector(".change");
        const arrowIcon = userNode.querySelector(".pos-change i");
        if (positionChange > 0) {
          changeSpan.textContent = positionChange;
          arrowIcon.className = "bx bxs-up-arrow"; // Up arrow for rank improvement
        } else if (positionChange < 0) {
          changeSpan.textContent = Math.abs(positionChange);
          arrowIcon.className = "bx bxs-down-arrow"; // Down arrow for rank drop
        } else {
          changeSpan.textContent = "0";
          arrowIcon.className = "bx bxs-right-arrow"; // Right arrow for no change
        }
  
        // Append user to the container
        container.appendChild(userNode);
  
        // Update the new position in the map
        prevPositions.set(user.walletAddress, newPosition);
      });
  
      // Limit leaderboard to 100 users
      while (container.children.length > 100) {
        container.removeChild(container.lastChild);
      }
    });
  
    // Trim addresses after the leaderboard has been updated
    trimAddress();
  }
  
// Simulate live updates every 5 seconds (for testing)
setInterval(simulateScoreUpdates, 5000);

// Fetch initial user data from backend
fetchUserData();



// Address trimming

const trimAddress = () => {
    const addresses = document.querySelectorAll('.address');
    addresses.forEach (addressElement => {
        const fullAddress = addressElement.textContent;
        const trimmedAddress = `${fullAddress.substring(0, 6)}***${fullAddress.substring(fullAddress.length - 4)}`;
        addressElement.textContent = trimmedAddress;
    });
}



// Tab switching

document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".categories li");
    const mainDivs = document.querySelectorAll(".leaderboard-container > div"); 
    const specialPart = document.querySelector('.course-pad');
    let accordion = document.querySelector('p.accordion');
    const container = document.querySelector('.modules-container');


    const initializePage = () => {
        categories.forEach((category) => {
          if (category.classList.contains("active")) {
            const categoryToShow = category.getAttribute("data-category");
    
            mainDivs.forEach((div) => {
              if (div.classList.contains(categoryToShow)) {
                div.style.display = "block";
              } else {
                div.style.display = "none";
              }
            });
          }
        }
      );
    };
    
      initializePage();


    categories.forEach((category) => {
        category.addEventListener("click", () => {
            
            categories.forEach((cat) => cat.classList.remove("active"));
            
            category.classList.add("active");

            const categoryToShow = category.getAttribute("data-category");


            mainDivs.forEach((div) => {
                if (div.classList.contains(categoryToShow)) {
                    div.style.display = "block"; 
                } else {
                    div.style.display = "none"; 
                }
            });
        });
    });
});
