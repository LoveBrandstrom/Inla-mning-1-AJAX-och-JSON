let recipeTags = document.getElementById('recipe-tags');
let recipeItem = document.getElementById('item-list');
let errorMessage = document.getElementById('error-message');
let emptyResult = document.getElementById('empty-result');

const endpointURL = "https://tasty.p.rapidapi.com"

async function fetchRecipeTags() {
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

    for (let i = 0; i < 20; i++) {
      const displayName = data.results[i].display_name
      const name = data.results[i].name

      tagsHTML +=
        `<label>
          <input type="radio" id="tag" name="tag" value="${displayName}" onclick="fetchRecipes('${name}')">${displayName}</input>
        </label>`
    }

    recipeTags.innerHTML = tagsHTML;

  } catch (error) {
    errorMessage.innerHTML = "An error has occurred - " + error;
}}

async function fetchRecipes(tag) {
  try {
    document.querySelector(`input[type="radio"][name=tag]:checked`).value

    let response = await fetch(endpointURL + "/recipes/list?from=0&size=40&tags=" + tag, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tasty.p.rapidapi.com",
        "x-rapidapi-key": "e5a89f36e3mshd1c4599c002753ep13203djsna92d47c223b5"
      }
    })
    
    let data = await response.json();
    console.log(data.results);

    const results = data.results
    if (results > 0) {
    emptyResult.innerHTML = "Sorry! We have no recipes with that tag available :("
    } else {

    let recipeName = ""

    results.forEach(item => recipeName += `<div>${item.name}</div>`);

    recipeItem.innerHTML = recipeName
    }
    
  } catch (error) {
    errorMessage.innerHTML = "An error has occurred - " + error;
  }
};

fetchRecipeTags();



