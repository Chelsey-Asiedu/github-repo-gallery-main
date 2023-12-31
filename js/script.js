//  global variable to select the div with a class of “overview”. his div is where your profile information will appear. 
const overview = document.querySelector(".overview");
const username = "Chelsey-Asiedu";
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data");

const gitUserInfo = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    console.log(data);
    displayUserInfo(data)
};

gitUserInfo();

const displayUserInfo = function (data) {
const div = document.createElement("div");
div.classList.add("user-info");
div.innerHTML = `<figure>
<img alt="user avatar" src=${data.avatar_url} />
</figure>
<div>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Bio:</strong> ${data.bio}</p>
<p><strong>Location:</strong> ${data.location}</p>
<p><strong>Number of pub public repos:</strong> ${data.public_repos}</p>
</div>
`;
overview.append(div)
gitRepos()
};

const gitRepos = async function () {
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);
    displayInformation(repoData)
};

const displayInformation = function (repos) {
    for(const repo of repos) {
       const repoItem = document.createElement("li");
       repoItem.classList.add("repo");
       repoItem.innerHTML = `<h3> ${repo.name}</h3>`
       repoList.append(repoItem)
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName)
    }
});

const specificRepoInfo = async function (repoName) {
    const fetchSpecificRepo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchSpecificRepo.json();
    console.log(repoInfo)
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (const language in languageData){
        languages.push(language);
    }
    displayRepo(repoInfo,languages);
};

const displayRepo = function (repoInfo, languages) {
    individualRepoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    individualRepoData.append(div);
    individualRepoData.classList.remove("hide");
    allReposContainer.classList.add("hide");

}