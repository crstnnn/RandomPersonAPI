// Select HTML elements
const getUserBtn = document.getElementById('getUserBtn');
const userInfoDiv = document.getElementById('userInfo');

// how Function to fetch a random users
async function fetchRandomUsers(count = 6) {
  try {
    // Sloading spinner
    userInfoDiv.style.display = "block";
    userInfoDiv.innerHTML = `<div class="spinner"></div>`;

    // Request to random user API
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    // Convert response to JSON
    const data = await response.json();
    // Extract results from data
    const users = data.results;

    // Build HTML for each user
    let usersHTML = "";
    users.forEach(user => {
      const firstName = user.name.first;
      const lastName = user.name.last;
      const email = user.email;
      const city = user.location.city;
      const country = user.location.country;
      const profilePic = user.picture.large;

      //Display user information in a card format
      usersHTML += `
        <div class="user-card">
        <img src="${profilePic}" alt="Profile Picture">
          <div class="user-info">
            <strong>FirstName: ${firstName}</strong>
            <strong>LastName: ${lastName}</strong>
            <div class="extra-info">
            <p>Email: ${email}</p>
            <p>City: ${city}</p>
            <p>Country: ${country}</p>
          </div>
        </div>
      </div>
    `;

    });

    // Display users in grid
    userInfoDiv.innerHTML = `<div class="grid">${usersHTML}</div>`;

  } catch (error) {
    console.error("Error fetching users:", error);
    userInfoDiv.innerHTML = "<span style='color:red;'>❌ Failed to fetch user data.</span>";
  }
}



// Event listener for button
getUserBtn.addEventListener('click', () => fetchRandomUsers(6));
