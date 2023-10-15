const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
let img = document.createElement("img");
let block = document.getElementById("des-img");
let block2 = document.querySelector(".mobile-img");
const login = document.getElementById("login");
const usrName = document.getElementById("name");
const joined = document.getElementById("joined");
const bio = document.querySelector(".bio");
const repoCount = document.querySelector(".repo-count");
const followersCount = document.querySelector(".followers-count");
const followingCount = document.querySelector(".following-count");
const usrLocation = document.querySelector(".location");
const twitterUsername = document.querySelector(".twitter");
const website = document.querySelector(".website");
const company = document.querySelector(".job");

searchBtn.addEventListener("click", function () {
  const url = `https://api.github.com/users/${input.value}`;
  async function getUrl() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (response.status === 404) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User not found🧐",
      });
    } else {
      login.innerHTML = data.name;
      block.src = data.avatar_url;
      block2.src = data.avatar_url;
      usrName.innerHTML =
        data.login === null ? "Not found Userid" : `@${data.login}`;
      usrName.style.color = "#0E6BDE";
      const dateData = data.created_at.slice(0, data.created_at.length - 10);
      joined.innerHTML = `Joined ${dateData}`;
      joined.style.fontSize = "12px";
      bio.innerHTML =
        data.bio === null
          ? "This profile has no bio 😔"
          : data.bio
              .split("\n")
              .map((paragraph, index) => {
                return `<p key=${index}>${paragraph}</p>`;
              })
              .join("");
      repoCount.innerHTML = data.public_repos;
      followersCount.innerHTML = data.followers;
      followingCount.innerHTML = data.following;
      usrLocation.innerHTML =
        data.location === null ? "Not found location" : data.location;

      twitterUsername.innerHTML =
        data.twitter_username === null
          ? "Not found twitter"
          : data.twitter_username;
      twitterUsername.style.fontSize = "13px";
      website.innerHTML = data.blog === "" ? "Not found website" : data.blog;
      website.style.fontSize = "13px";
      company.innerHTML =
        data.company === null ? "Not found company" : data.company;
      company.style.fontSize = "13px";
    }
  }
  input.value = "";

  getUrl();
});

//?Light-dark mode

const savedTheme = localStorage.getItem("theme");
let currentTheme;

if (savedTheme) {
  currentTheme = savedTheme;
} else {
  currentTheme = "dark";
}

document.body.classList.add(currentTheme);
updateThemeStatus(currentTheme);

const modeBtn = document.getElementById("modeBtn");

modeBtn.addEventListener("click", () => {
  const newTheme = currentTheme === "light" ? "dark" : "light";

  localStorage.setItem("theme", newTheme);
  document.body.classList.remove(currentTheme);
  document.body.classList.add(newTheme);
  currentTheme = newTheme;
  updateThemeStatus(newTheme);
});

function updateThemeStatus(theme) {
  const modeStatus = document.querySelector(".modeStatus");
  const reversedTheme = theme === "light" ? "dark" : "light";
  modeStatus.textContent = reversedTheme.toUpperCase();
}
