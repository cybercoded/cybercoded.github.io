const username = "cybercoded"; // Replace with your GitHub username
let rep_oname = "";
let token = "";


// Load the GitHub token from config.json
const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100`; // Get all repos first
const pinnedApiUrl = `https://api.github.com/users/${username}/repos?affiliation=owner&pinned=true`; // Endpoint for pinned repos

const reposContainer = document.getElementById("repos");
const defaultImageUrl = `https://raw.githubusercontent.com/${username}/${rep_oname}/master/dashboard.png`; // Default image if repo image is missing

// Function to check if an image URL exists
function checkImageExists(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true); // Image exists
    img.onerror = () => resolve(false); // Image doesn't exist
    img.src = imageUrl;
  });
}

// Function to load the token from config.json
async function loadToken() {
  const response = await fetch('config.json');
  const config = await response.json();
  token = config.TOKEN;
  console.log("Token loaded:", token);

  // After token is loaded, fetch pinned repositories
  fetchPinnedRepositories();
}

// Function to fetch pinned repositories after the token is loaded
async function fetchPinnedRepositories() {
  try {
    const response = await fetch(pinnedApiUrl, {
      headers: {
        Authorization: `token ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch pinned repositories");
    }
    const repos = await response.json();

    // Process each repo
    repos.forEach((repo) => {
      rep_oname = repo.name;
      const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/main/dashboard.png`;

      // Check if the image exists
      checkImageExists(imageUrl).then((imageExists) => {
        if (imageExists) {
          const repoElement = document.createElement("div");
          repoElement.classList.add("projects__item");

          // Fetch languages for the repo (optional)
          fetch(repo.languages_url, {
            headers: {
              Authorization: `token ${token}`
            }
          })
            .then((res) => res.json())
            .then((languages) => {
              const languageTags = Object.keys(languages)
                .map((lang) => `<span>${lang}</span>`)
                .join("");

              // Populate the repository card
              repoElement.innerHTML = `
                <img
                  class="projects__image"
                  src="${imageUrl}"
                  onerror="this.src='${defaultImageUrl}'"
                  alt="${repo.name} screenshot"
                />
                <h3 class="projects__name">${repo.name}</h3>
                <p class="projects__tags">
                  ${languageTags || "<span>Not Specified</span>"}
                </p>
                <div class="projects__links">
                  <a href="${repo.html_url}" class="underline" target="_blank">View Project</a>
                  <a href="${repo.html_url}" class="underline" target="_blank">View Code</a>
                </div>
              `;

              // Append to the container
              reposContainer.appendChild(repoElement);
            });
        }
      });
    });
  } catch (error) {
    reposContainer.innerHTML = `<p>Error loading repositories: ${error.message}</p>`;
  }
}

// Start by loading the token from config.json
loadToken();

var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form";
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form";
  });
}

form.addEventListener("submit", handleSubmit);
