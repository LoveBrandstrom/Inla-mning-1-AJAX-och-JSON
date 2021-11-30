let recipeTags = document.getElementById('recipe-tags');
let recipeItem = document.getElementById('item-list');
let errorMessage = document.getElementById('error-message');
let recipeTagValue = "";

async function fetchRecipeTags() {
  try{
    let response = await fetch("https://tasty.p.rapidapi.com/tags/list", {
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
        `<input type="radio" id="tag" name="tag" value="${displayName}" onclick="fetchRecipes('${name}')">${displayName}</input><br>`
    }
    recipeTags.innerHTML = tagsHTML;
  } catch (error) {
    errorMessage.innerHTML = "AN ERROR HAS OCCURRED - " + error;
}}

async function fetchRecipes(tag) {
  console.log(tag);
  try {
    document.querySelector(`input[type="radio"][name=tag]:checked`).value

    let response = await fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=40", {
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
      console.log("FINNS INGA")
    } else {

    let recipeName = ""

    results.forEach(item => recipeName += `<div>${item.name}</div>`);

      recipeItem.innerHTML = recipeName
    }
    
  } catch (error) {
    errorMessage.innerHTML = "AN ERROR HAS OCCURRED - " + error;
  }
};

fetchRecipeTags();



