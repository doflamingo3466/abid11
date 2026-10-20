// Define an array containing products where each product is an array: [name, price, description, imageURL]
const products = [
  [
    "Black and Milk Coffee",
    360,
    "A freshly brewed coffee for a fresh start of the day",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDu7IvQ4QCxdnPrRTh7oxPUAxMdCAfWocqmqdgKJ6wUQ&s=10",
  ],
  [
    "Croissants",
    400,
    "A croissants full of chocolate",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHbCuufF_TQqhhKDONoyecNqBnIPfXFQUH3D__dijcFw&s=10",
  ],
  [
    "A honey Pan cake",
    220,
    "Pan cakes with honey",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Q7ELp5PSo09M1-wJh3cU-x4U7hHsoA5IANQruCWOhA&s=10",
  ],
  [
    "Milk Tea",
    170,
    "A karak tea to refresh your mind",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSqjWqlpv8XtYuXBiYMv9wob2L6ZN2F4wUvv8ZLhQycg&s=10",
  ],
  [
    "Paratha",
    200,
    "A classic cultural breakfast",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLcAv-WeV6Br8t8i8oKT7ug8820pbY5jiUERdQpJrAcg&s=10",
  ],
  [
    "Lassi",
    100,
    "A cultural drink prefered in breakfast to stay energetic",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAOAWy6WPlwlc9cdL_0FOOHTP2VV41TvOMhMcr3gLGcg&s=10",
  ],
];

// Initialize an empty object to track cart items (key = product index, value = quantity)
const cart = {};

// Helper function to format numbers into Pakistani Rupee (PKR) currency strings
const money = (n) => `PKR ${n.toLocaleString("en-PK")}`;

// Select the container element with ID 'products' and fill it with HTML generated from the products array
document.querySelector("#products").innerHTML = products
  .map(
    // Destructure each product array into individual variables and capture its loop index 'i'
    ([name, price, desc, image], i) => `
  <div class="col"><article class="card product-card">
    <!-- Set the product image source and alternative text -->
    <img src="${image}" alt="${name}" class="card-img-top">
    <div class="card-body">
      <!-- Display product name and formatted price aligned to the right using float-end -->
      <h3 class="h6 fw-bold">${name}<span class="float-end">${money(price)}</span></h3>
      <!-- Display product description text -->
      <p class="small text-secondary">${desc}</p>
      <!-- Add to bag button with data-i storing the product's array index -->
      <button class="btn btn-dark btn-sm w-100 add" data-i="${i}">Add to bag</button>
    </div>
  </article></div>
`,
  )
  .join(""); // Combine the generated HTML array into a single contiguous string

// Function to synchronize and update all cart-related UI components
function update() {
  // Sum up all quantities stored in the cart object to get the total item count
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  // Update the badge count display elements in the navigation bar
  document.querySelector("#count").textContent = count;
  document.querySelector("#bag-label").textContent = `(${count})`;

  // Calculate the overall total cost by multiplying each product's price by its quantity in the cart
  document.querySelector("#total").textContent = money(
    products.reduce((sum, p, i) => sum + p[1] * (cart[i] || 0), 0),
  );

  // Render the list of items currently inside the bag panel container
  document.querySelector("#items").innerHTML =
    products
      .map(([name, price], i) =>
        cart[i] // Check if the item exists in the cart (quantity > 0)
          ? `
      <div class="d-flex justify-content-between mb-2">
        <!-- Display product name and current quantity multiplier -->
        <span>${name} × ${cart[i]}</span>
        <span>
          <!-- Decrease button: stores product index and step value -1 -->
          <button class="qty" data-i="${i}" data-n="-1">−</button>
          <!-- Increase button: stores product index and step value 1 -->
          <button class="qty" data-i="${i}" data-n="1">+</button>
        </span>
      </div>
    `
          : "", // Return empty string if the product is not in the cart
      )
      .join("") // Join all item HTML strings together
      || "Your bag is empty."; // Fallback message if no items are in the cart
}

// Add a global click event listener to handle button actions using event delegation
document.addEventListener("click", (e) => {
  // Retrieve the product index from the clicked element's data-i attribute
  const i = e.target.dataset.i;

  // If the clicked element has the 'add' class, increment its quantity in the cart object
  if (e.target.matches(".add")) cart[i] = (cart[i] || 0) + 1;

  // If the clicked element has the 'qty' class, adjust its quantity based on data-n (-1 or 1)
  if (e.target.matches(".qty")) {
    cart[i] += Number(e.target.dataset.n);
    // If quantity drops to 0 or below, completely delete the product key from the cart object
    if (!cart[i]) delete cart[i];
  }

  // If the clear button is clicked, delete all keys from the cart object to empty it
  if (e.target.id === "clear") Object.keys(cart).forEach((k) => delete cart[k]);
  
  // If the continue/checkout button is clicked, display an alert message popup
  if (e.target.id === "continue") alert("ok hogya g");

  // Re-run update() to refresh the UI and reflect any changes made to the cart state
  update();
});

// Run update initially upon page load to set up the default empty cart state UI
update();