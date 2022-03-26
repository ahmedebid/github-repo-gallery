// The div where the GitHub profile information will appear
const overviewElement = document.querySelector(".overview");
// GitHub username
const username = "ahmedebid";
// An unorder list to display the GitHub repos
const repoListElement = document.querySelector(".repo-list");
// The section where the repo info appears
const allReposElement = document.querySelector(".repos");
// The section where the individual repo data appears
const repoDataElement = document.querySelector(".repo-data");


// A function to fetch information from the GitHub profile
const getUserInfo = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    displayUserInfo(data);
};

getUserInfo();

// A function to display the GitHub user info
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> 
    `;
    overviewElement.append(div);
    getReposInfo();
};

// A function to fetch the GitHub public repos info for a certain username
const getReposInfo = async function () {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const data = await response.json();
    displayReposInfo(data);
};

// A function to display info about each GitHub public repo for a certain username
const displayReposInfo = function (repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`
        repoListElement.append(li);
    }
};

// An event listener and handler for the repoListElement
repoListElement.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

// A function to get specific repo info
const getRepoInfo = async function (repoName) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    // console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    // console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

// A function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    repoDataElement.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p><strong>Description:</strong> ${repoInfo.description}</p>
        <p><strong>Default Branch:</strong> ${repoInfo.default_branch}</p>
        <p><strong>Languages:</strong> ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `
    repoDataElement.append(div);
    repoDataElement.classList.remove("hide");
    allReposElement.classList.add("hide");
};