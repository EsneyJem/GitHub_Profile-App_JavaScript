const APIUL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("florinpop17");

async function getUser(username) {
  const resp = await fetch(APIUL + username);
  const respData = await resp.json();

  createUserCard(respData);
  getRepos(username);
}

async function getRepos(username){
  const resp = await fetch(APIUL + username + '/repos');
  const respData = await resp.json();

  addReposToCard(respData);
}

function createUserCard(user) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardHTML = `
  <div class="card">
    <div>
      <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
    </div>
      <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul class="info">
          <li><span class="material-symbols-outlined">
          visibility
          </span> ${user.followers}</li>
          <li><span class="material-symbols-outlined">
          favorite
          </span> ${user.following}</li>
          <li><span class="material-symbols-outlined">
          archive
          </span>${user.public_repos}</li>
       </ul>
       <div id="repos">
       <h4>Repos:</h4>
      </div>
    </div>
  </div>
  `;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos){
  const reposEl = document.getElementById('repos')
   
  repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
  .slice(0, 10)
  .forEach(repo => {const repoEl = document.createElement('a')
  repoEl.classList.add('repo');

  repoEl.href = repo.html_url;
  repoEl.target = '_blank'
  repoEl.innerText = repo.name

  reposEl.appendChild(repoEl);

  })
  
}



form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});
