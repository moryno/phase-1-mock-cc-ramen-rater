// write your code here
// Initial render, get data and append to the DOM
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit)

function handleSubmit(event){
    event.preventDefault();

    const menuObj = {
        name: event.target["new-name"].value,
        restaurant: event.target["new-restaurant"].value,
        image: event.target["new-image"].value,
        rating: event.target["new-rating"].value,
        comment: event.target["new-comment"].value
    }
    renderOneData(menuObj)
    addRamens(menuObj)
    displayInfo(menuObj)
}


const init = () => getData();


const getData = () => {
    fetch("http://localhost:3000/ramens")
             .then(res => res.json())
             .then(data => data.forEach(item => renderOneData(item)))
             .catch(err => console.log(err.message))
}

const renderOneData = (item) => {
    const parentDiv = document.querySelector("#ramen-menu");
    const image = document.createElement("img");
    image.addEventListener("click", ()=> displayInfo(item.id))
    image.src = item.image
    parentDiv.append(image)
   
}

// Polpulate detail section when image is clicked
const displayInfo = (id) => {
   fetch(`http://localhost:3000/ramens/${id}` )
     .then(res => res.json())
     .then(data => {
        
        const detailContainer = document.querySelector("#ramen-detail"); 
        const rating = document.querySelector("#rating-display");
        const comment = document.querySelector("#comment-display")

        detailContainer.innerHTML = `
            <img
            class="detail-image"
            src="${data.image}"
            alt="Insert Name Here"
            />
            <h2 class="name">${data.name}</h2>
            <h3 class="restaurant">${data.restaurant}</h3>
        `;

        rating.textContent = `${data.rating}`;
        comment.textContent = `${data.comment}`
     })
     
     .catch(err => console.log(err.message))





}

// Add a ramen menu through the submit form
const addRamens = (menu) => {
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             Accept: "application/json"
        },
        body: JSON.stringify(menu)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err.message))
       
}



init()

