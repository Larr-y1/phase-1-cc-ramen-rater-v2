// // index.js

// // Callbacks
// const handleClick = (ramen) => {
//   // Add code
// };

// const addSubmitListener = () => {
//   // Add code
// }

// const displayRamens = () => {
//   // Add code
// };

// const main = () => {
//   // Invoke displayRamens here
//   // Invoke addSubmitListener here
// }

// main()

// // Export functions for testing
// export {
//   displayRamens,
//   addSubmitListener,
//   handleClick,
//   main,
// };
// index.js

const API_URL = "http://localhost:3000/ramens";

// // Display all ramen images in the #ramen-menu div
// const displayRamens = () => {
//   fetch(API_URL)
//     .then((res) => res.json())
//     .then((ramens) => {
//       const ramenMenu = document.querySelector("#ramen-menu");
//       ramenMenu.innerHTML = ""; // Clear menu before populating

//       ramens.forEach((ramen, index) => {
//         const img = document.createElement("img");
//         img.src = ramen.image;
//         img.alt = ramen.name;
//         img.addEventListener("click", () => handleClick(ramen));

//         ramenMenu.appendChild(img);

//         // Show the first ramen's details on page load
//         if (index === 0) handleClick(ramen);
//       });
//     })
//     .catch((err) => console.error("Error fetching ramens:", err));
// };
const displayRamens = async () => {
  const ramenMenu = document.querySelector("#ramen-menu");

  try {
    const response = await fetch("http://localhost:3000/ramens");
    const ramens = await response.json();

    // Clear existing content (to avoid duplicates)
    ramenMenu.innerHTML = "";

    // Append each ramen as an <img>
    ramens.forEach((ramen) => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener("click", () => handleClick(ramen));

      ramenMenu.appendChild(img);
    });

  } catch (error) {
    console.error("Error fetching ramens:", error);
  }
};


// Handle ramen selection and display its details
const handleClick = (ramen) => {
  document.querySelector("#ramen-detail img").src = ramen.image;
  document.querySelector("#ramen-detail img").alt = ramen.name;
  document.querySelector("#ramen-detail h2").textContent = ramen.name;
  document.querySelector("#ramen-detail h3").textContent = ramen.restaurant;
  document.querySelector("#rating-display").textContent = ramen.rating;
  document.querySelector("#comment-display").textContent = ramen.comment;

  // Store ramen ID for editing
  document.querySelector("#edit-ramen").dataset.id = ramen.id;
};

// Add event listener to the new ramen form
const addSubmitListener = () => {
  let form = document.querySelector("#new-ramen")
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newRamen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target["new-comment"].value,
    };

    // Add ramen to the menu
    const img = document.createElement("img");
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener("click", () => handleClick(newRamen));

    document.querySelector("#ramen-menu").appendChild(img);

    // Persist new ramen to server
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRamen),
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error adding ramen:", err));

    e.target.reset(); // Clear form
  });
};

// Main function to initialize the app
const main = () => {
  document.addEventListener("DOMContentLoaded", () => {
    displayRamens();
    addSubmitListener();
  });
};

main();


// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

