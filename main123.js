/**
 * JSON introduction
 * 
 * 
 * JSON stands for JavaScript Object Notation
 * JSON is a lightweight data-interchange format
 * JSON is "self-describing" and easy to understand
 * JSON is language independent 
 */

/**
 * JSON stringify
 * Turns a JS object to a JSON string
 */
console.log("############## JSON stringify: Turns a JS object to a JSON string #########");

// From JS object
let personObject = {name: "John", age: 31};
console.log("From object: " , personObject);


// To JSON
let personJSONString = JSON.stringify(personObject);
console.log("To JSON: " , personJSONString);


/**
 * JSON parse
 * Turns a JSON string to an JS object
 */
 console.log("############## JSON parse: Turns a JSON string to an JS object #########");
// From JSON
personJSONString = '{"name":"John","age":31}';
console.log("From JSON: " , personJSONString);


// To JS object
personObject = JSON.parse(personJSONString);
console.log("To object: " , personObject);

console.log(personObject.name);
console.log(personObject.age);


/**
 * Similar to JS, following datatypes are supported
 *
 * Datatype                     Value examples
 * ------------------------------------------------
 * - string                |     "text"
 * - number                |     13
 * - object (JSON object)  |     {"name1":"value1",name2:"value2"}
 * - array                 |     ["value1","value2","value3"]
 * - boolean               |     true
 * - null                  |     null
 * 
 * 
 * Following datatypes are  NOT supported
 * - function
 * - date
 * - undefined
 */


console.log("############## JSON stringify: Turns a JS object to a JSON string #########");
console.log("From JS object");
personObject = {
    name: 'John Doe',
    age: 31,
    hobbies: [
        'Cooking',
        'Working out',
        'Coding'
    ],
    isMarried: true,
    children: [
        {name: 'Josef', age: 13},
        {name: 'Maria', age: 7},
    ],
    grandChildren: null
}

console.log("From object: " , personObject);


// To JSON
personJSONString = JSON.stringify(personObject);
console.log("To JSON: " , personJSONString);


/**
 * JSON parse
 * Turns a JSON string to an JS object
 */
 console.log("############## JSON parse: Turns a JSON string to an JS object #########");
// From JSON
personJSONString = '{"name":"John Doe","age":31,"hobbies":["Cooking","Working out","Coding"],"isMarried":true,"children":[{"name":"Josef","age":13},{"name":"Maria","age":7}],"grandChildren":null}';
console.log("From JSON: " , personJSONString);


// To JS object
personObject = JSON.parse(personJSONString);
console.log("To object: " , personObject);

console.log(personObject.name);
console.log(personObject.age);
console.log(personObject.children[1].name);
console.log(personObject.children[1].age);


/**
 * Example on Fetch with async/await, try/catch and JSON
 */

let albumList = document.getElementById('album-list');

async function fetchJSON() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');
        let data = await response.json(); // This is the part that parses the JSON string "JSON.parse()"
        console.log(data);
        // The data looks similar to the following
        // [
        //   {albumId: 1, id: 1, thumbnailUrl: 'url...', title: 'Some title',  url: 'url'},
        //   {albumId: 2, id: 2, thumbnailUrl: 'url...', title: 'Some title',  url: 'url'},
        //   {albumId: 3, id: 3, thumbnailUrl: 'url...', title: 'Some title',  url: 'url'},
        //   ... 50 albums
        // ]

        let albumHTML = "";
        for (let album of data) {
            // console.log(album.title);
            albumHTML += `
                <article>
                    <h2>${album.title}</h2>
                    <img src="${album.thumbnailUrl}">
                </article>
            `;
        }

        albumList.innerHTML = albumHTML;
    } catch(error) {
        console.log(error)
        albumList.innerHTML = 'Opps something went wrong with the API!';
    }
}

fetchJSON();

