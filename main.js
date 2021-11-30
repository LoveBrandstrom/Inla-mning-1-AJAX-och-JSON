let recipeTags = document.getElementById('recipe-tags');
let recipeItems = document.getElementById('recipe-items');
let errorMessage = document.getElementById('error-message');

const endpointURL = "https://tasty.p.rapidapi.com"

async function fetchRecipeTags() {
  document.getElementById('recipe-tags').innerHTML = "Loading...";
  
  try {
    let response = await fetch(endpointURL + "/tags/list", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tasty.p.rapidapi.com",
        "x-rapidapi-key": "e5a89f36e3mshd1c4599c002753ep13203djsna92d47c223b5"
      }
    })

    let data = await response.json();

    let tagsHTML = "";

    for (let i = 0; i < 21; i++) {
      const displayName = data.results[i].display_name
      const name = data.results[i].name

      tagsHTML +=
        `<div class="input-wrapper">
          <label>
            <input type="radio" id="tag" name="tag" value="${displayName}" onclick="fetchRecipes('${name}')">${displayName}</input>
          </label>
        </div>`
    }

    recipeTags.innerHTML = tagsHTML;

  } catch (error) {
    errorMessage.innerHTML = "An error has occurred - " + error;
}}

async function fetchRecipes(tag) {
  document.getElementById('recipe-items').innerHTML = "Loading...";

  try {
    let response = await fetch(endpointURL + "/recipes/list?from=0&size=40&tags=" + tag, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tasty.p.rapidapi.com",
        "x-rapidapi-key": "e5a89f36e3mshd1c4599c002753ep13203djsna92d47c223b5"
      }
    })
    
    let data = await response.json();

    const results = data.results

    if (results.length === 0) {
      document.getElementById('empty-result').innerHTML = "Sorry! We have no recipes with that tag available :("
    } else {

      let recipeItem = ""

      results.forEach(item => recipeItem +=
        `<div class="recipe-item-wrapper">
          <div class="recipe-item-header">
            <span>${item.country !== "ZZ" ? `From: ${item.country}` : "Unknown origin"}</span>
            <span>${item.language}</span>
          </div>
          <div class="recipe-items-body">
            <img class="recipe-image" src="${item.thumbnail_url}" />
          </div>
          <div class="recipe-name">${item.name}</div>
          <div class="recipe-description">${item.description ? item.description : "No description was added by the author."}</div>
          </div>`);

    recipeItems.innerHTML = recipeItem
    }
    
  } catch (error) {
    errorMessage.innerHTML = "An error has occurred - " + error;
  }
};

fetchRecipeTags();