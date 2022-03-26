// The div where the GitHub profile information will appear
const overviewElement = document.querySelector(".overview");
// GitHub username
const username = "ahmedebid";
// An unorder list to display the GitHub repos
const repoListElement = document.querySelector(".repo-list");

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