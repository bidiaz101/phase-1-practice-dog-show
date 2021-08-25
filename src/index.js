let idOfDogToUpdate;

document.addEventListener('DOMContentLoaded', () => {
    getRegisteredDogs()

    const nameInput = document.getElementsByName("name")[0]
    const breedInput = document.getElementsByName("breed")[0]
    const sexInput = document.getElementsByName("sex")[0]
    
    document.querySelector("form").addEventListener("submit", e => {
        e.preventDefault()
        updateDogDb(nameInput.value, breedInput.value, sexInput.value, idOfDogToUpdate)
        nameInput.value = ""
        breedInput.value = ""
        sexInput.value = ""
    })
});

function getRegisteredDogs() {
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(json => {
        for(const dog of json) {
            const tableRow = document.createElement('tr')
            tableRow.innerHTML = `<td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button id=${dog.id}>Edit</button></td>`
            document.getElementById("table-body").appendChild(tableRow)
            document.getElementById(dog.id).addEventListener("click", () => {
                editDog(dog.name, dog.breed, dog.sex)
                idOfDogToUpdate = dog.id
            })
        }
    })
};

function editDog(dogName, breed, sex) {
    const nameInput = document.getElementsByName("name")[0]
    const breedInput = document.getElementsByName("breed")[0]
    const sexInput = document.getElementsByName("sex")[0]
    nameInput.value = dogName
    breedInput.value = breed 
    sexInput.value = sex
};

function updateDogDb(dogName, breed, sex, dogId) {
    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "name": dogName,
            "breed": breed,
            "sex": sex,
        })
    })
    .then( () => {
        document.querySelector("tbody").innerHTML = ""
        getRegisteredDogs()
    })
};
