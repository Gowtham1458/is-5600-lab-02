document.addEventListener("DOMContentLoaded", () => {
    // Parse JSON data into JavaScript objects
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Select DOM elements
    const userList = document.querySelector(".user-list");
    const portfolioList = document.querySelector(".portfolio-list");
    const deleteButton = document.getElementById("btnDelete");
    const saveButton = document.getElementById("btnSave");
  
    // Generate the list of users
    function generateUserList(users, stocks) {
      // Clear previous user list
      userList.innerHTML = "";
  
      users.forEach(({ user, id }) => {
        const listItem = document.createElement("li");
        listItem.innerText = `${user.lastname}, ${user.firstname}`;
        listItem.setAttribute("id", id);
        userList.appendChild(listItem);
      });
  
      // Register event listener for user selection
      userList.addEventListener("click", (event) => handleUserListClick(event, users, stocks));
    }
  
    // Handle clicking on a user from the list
    function handleUserListClick(event, users, stocks) {
      const userId = event.target.id;
      const user = users.find((user) => user.id == userId);
  
      if (user) {
        populateForm(user);
        renderPortfolio(user, stocks);
      }
    }
  
    // Populate the form with user data
    function populateForm(data) {
      const { user, id } = data;
      document.querySelector("#userID").value = id;
      document.querySelector("#firstname").value = user.firstname;
      document.querySelector("#lastname").value = user.lastname;
      document.querySelector("#address").value = user.address;
      document.querySelector("#city").value = user.city;
      document.querySelector("#email").value = user.email;
    }
  
    // Render the portfolio items for the user
    function renderPortfolio(user, stocks) {
      const { portfolio } = user;
  
      // Clear previous portfolio items
      portfolioList.innerHTML = `<h3>Symbol</h3><h3># Shares</h3><h3>Actions</h3>`;
  
      portfolio.forEach(({ symbol, owned }) => {
        const symbolEl = document.createElement("p");
        const sharesEl = document.createElement("p");
        const actionEl = document.createElement("button");
  
        symbolEl.innerText = symbol;
        sharesEl.innerText = owned;
        actionEl.innerText = "View";
        actionEl.setAttribute("id", symbol);
  
        portfolioList.appendChild(symbolEl);
        portfolioList.appendChild(sharesEl);
        portfolioList.appendChild(actionEl);
      });
  
      // Register event listener for stock selection
      portfolioList.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
          viewStock(event.target.id, stocks);
        }
      });
    }
  
    // Display stock details when a stock is selected
    function viewStock(symbol, stocks) {
      const stockArea = document.querySelector(".stock-form");
      if (stockArea) {
        const stock = stocks.find((s) => s.symbol === symbol);
  
        if (stock) {
          document.querySelector("#stockName").textContent = stock.name;
          document.querySelector("#stockSector").textContent = stock.sector;
          document.querySelector("#stockIndustry").textContent = stock.subIndustry;
          document.querySelector("#stockAddress").textContent = stock.address;
          document.querySelector("#logo").src = `logos/${symbol}.svg`;
        }
      }
    }
  
    // Delete a user when clicking the delete button
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
  
      const userId = document.querySelector("#userID").value;
      const userIndex = userData.findIndex((user) => user.id == userId);
  
      if (userIndex !== -1) {
        userData.splice(userIndex, 1);
        generateUserList(userData, stocksData);
        document.querySelector(".portfolio-list").innerHTML = "";
      }
    });
  
    // Save user updates when clicking the save button
    saveButton.addEventListener("click", (event) => {
      event.preventDefault();
  
      const userId = document.querySelector("#userID").value;
      const userIndex = userData.findIndex((user) => user.id == userId);
  
      if (userIndex !== -1) {
        userData[userIndex].user.firstname = document.querySelector("#firstname").value;
        userData[userIndex].user.lastname = document.querySelector("#lastname").value;
        userData[userIndex].user.address = document.querySelector("#address").value;
        userData[userIndex].user.city = document.querySelector("#city").value;
        userData[userIndex].user.email = document.querySelector("#email").value;
  
        generateUserList(userData, stocksData);
      }
    });
  
    // Initialize user list when page loads
    generateUserList(userData, stocksData);
  });

