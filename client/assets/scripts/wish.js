const getWishId = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id;
}

const wishIndex = getWishId();

const fetchWish = async (wishIndex) => {
    try {
        console.log(wishIndex);
        const response = await fetch(`http://localhost:3000/wishes/${wishIndex}`);
        const wishData = await response.json();
        console.log(wishData);

        // Read in the data and display it
        displayWishData(wishData);

    } catch (error) {
        console.log(error);
    }
}

fetchWish(wishIndex);

const voteWish = async (vote) => {
    console.log("I've been pressed!");
    const wishIndex = getWishId();
    const voteData = {
        vote: vote
    }

    try {
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(voteData)
        }
        console.log("my options body " + options.body);
        const response = await fetch(`http://localhost:3000/wishes/${wishIndex}`, options);

        if (response.status == 201) {
            alert(`Voted:[${vote}] on this wish!`);
            window.location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}

const displayWishData = (wishData) => {
    try {
        //Target the section
        const wishSection = document.querySelector("#wish-card-section");

        //create an html element
        const wishName = wishData["name"];
        const wishContent = wishData["wish"];
        const grantValue = wishData["grant"];
        const denyValue = wishData["deny"];

        // Create: wish-card (div), name (p), wish(p), grant(div), deny(div)
        const wishCard = document.createElement('div');
        wishCard.classList.add("card-link");

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
        //linkBox.appendChild(wishCard);
        wishCard.appendChild(dWishName);
        wishCard.appendChild(dWishContent);
        wishCard.appendChild(buttonSection);

        buttonSection.appendChild(dGrantValue);
        buttonSection.appendChild(dDenyValue);


    } catch(error) {
        console.log(error);
    }
}

const grantBtn = document.querySelector("#wish-grant");
const denyBtn = document.querySelector("#wish-deny");

grantBtn.addEventListener('click', () => {
    voteWish("grant");
});

denyBtn.addEventListener('click', () => {
    voteWish("deny");
});