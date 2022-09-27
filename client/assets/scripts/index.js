const getWishData = async () => {
    try {
        // Get the data
        const response = await fetch("http://localhost:3000/wishes");
        const wishes = await response.json();
        return wishes;
    } catch(error) {
        console.log(error);
    }
}

const displayWishData = async () => {
    try {
        const wishes = await getWishData();
        console.log(wishes);
        console.log(wishes[0]);
        console.log(wishes[0]["name"])
        //Target the section
        const wishSection = document.querySelector("#wish-card-section");

        let length = 0;
        const maxLength = 3

        wishes.length > maxLength ? length = 3 : length = wishes.length; // Max 3 card displays

        for(let i=0; i < length; i++) { // Display the first three wishes
            //create an html element
            const wishName = wishes[i]["name"];
            const wishContent = wishes[i]["wish"];
            const grantValue = wishes[i]["grant"];
            const denyValue = wishes[i]["deny"];

            // Create: wish-card (div), name (p), wish(p), grant(div), deny(div)
            const wishCard = document.createElement('div');
            wishCard.className = "wish-card";

            const dWishName = document.createElement('p');
            dWishName.className = "wish-text";

            const dWishContent = document.createElement('p');
            dWishContent.className = "wish-text";

            const buttonSection = document.createElement('div');
            buttonSection.className = "wish-buttons";

            const dGrantValue = document.createElement('div');
            dGrantValue.className = "wish-grant";

            const dDenyValue = document.createElement('div');
            dDenyValue.className = 'wish-deny';

            // Set content
            dWishName.textContent = "Name: " + wishName;
            dWishContent.textContent = "Wish: " + wishContent;
            dGrantValue.textContent = grantValue;
            dDenyValue.textContent = denyValue;

            //Append items
            wishSection.appendChild(wishCard);
            wishCard.appendChild(dWishName);
            wishCard.appendChild(dWishContent);
            wishCard.appendChild(buttonSection);

            buttonSection.appendChild(dGrantValue);
            buttonSection.appendChild(dDenyValue);
        }

    } catch(error) {
        console.log(error);
    }
}

displayWishData();

const createNewWish = async (e) => {
    e.preventDefault();

    //Extract the data into an object
    const data = {
        name: e.target.name.value,
        wish: e.target.wish.value
    }

    console.log(data);
    // Set the options for the fetch request
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }

    // Make a fetch request, sending the data
    const response = await fetch("http://localhost:3000/wishes", options);

    if (response.status == 201) {
        alert("Created your new wish!");
        window.location.reload();
    }
}

const myForm = document.querySelector("#create-form");
myForm.addEventListener('submit', createNewWish);