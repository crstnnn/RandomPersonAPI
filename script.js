// Select HTML elements
const getUserBtn = document.getElementById('getUserBtn');
const userInfoDiv = document.getElementById('userInfo');

// Function to fetch multiple random users
async function fetchRandomUsers(count = 6) {
  try {
    // Show loading spinner
    userInfoDiv.style.display = "block";
    userInfoDiv.innerHTML = `<div class="spinner"></div>`;

    // Fetch multiple users
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await response.json();
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

      usersHTML += `
        <div class="user-card">
        <img src="${profilePic}" alt="Profile Picture">
          <div class="user-info">
            <p> ${firstName}</p>
            <p> ${lastName}</p>
            <p> ${email}</p>
            <p> ${city}</p>
            <p> ${country}</p>
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
