// Store the six products and the information shown on each product card.
const products = [
  {
    name: "Arc desk lamp",
    price: 68,
    image: "photo-1507473885765-e6ed057f782c",
    description: "A warm pool of light for late pages.",
  },
  {
    name: "Daily cup",
    price: 24,
    image: "photo-1514228742587-6b1558fcca3d",
    description: "A hand-sized favorite in matte stoneware.",
  },
  {
    name: "Soft carry tote",
    price: 32,
    image: "photo-1590874103328-eac38a683ce7",
    description: "Room for the bits that make a day.",
  },
  {
    name: "Field notebook",
    price: 18,
    image: "photo-1531346878377-a5be20888e57",
    description: "An open page for plans and passing thoughts.",
  },
  {
    name: "Sunday vase",
    price: 42,
    image: "photo-1578500494198-246f612d3b3d",
    description: "A simple shape for something in bloom.",
  },
  {
    name: "Pebble speaker",
    price: 89,
    image: "photo-1608043152269-423dbba4e7e1",
    description: "Pocket-sized sound, all day long.",
  },
];

// Create an empty object to keep track of product quantities in the cart.
const cart = {};

// Find the products container and fill it with a card for each product.
document.querySelector("#products").innerHTML = products
  .map(
    (p, i) => `
  <div class="col">
    <article class="card product-card">
      <img class="card-img-top" src="https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=800&q=80" alt="${p.name}">
      <div class="card-body">
        <h3 class="h6 fw-bold">${p.name} <span class="float-end">$${p.price}</span></h3>
        <p class="small text-secondary">${p.description}</p>
        <button class="btn btn-dark btn-sm w-100" onclick="cart[${i}]=(cart[${i}]||0)+1; updateCart()">Add to bag</button>
      </div>
    </article>
  </div>
`,
  )
  .join(""); // Join the card HTML strings into one string and place them in the page.

// Define a function that refreshes the cart count, total, and item list.
function updateCart() {
  // Add all product quantities together to get the number of items in the cart.
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  // Multiply each product's price by its quantity, then add those amounts for the total.
  const total = products.reduce(
    (sum, p, i) => sum + p.price * (cart[i] || 0),
    0,
  );

  // Show the item count in the header by replacing the element's text.
  document.querySelector("#cart-count").textContent = count;

  // Show the same item count beside the shopping bag heading.
  document.querySelector("#bag-label").textContent = `(${count})`;

  // Show the total with two digits after the decimal point.
  document.querySelector("#cart-total").textContent = `$${total.toFixed(2)}`;

  // Make a row for each product in the cart; skip products whose quantity is zero.
  document.querySelector("#cart-items").innerHTML =
    products
      .map((p, i) =>
        cart[i]
          ? `
      <div class="d-flex justify-content-between mb-2">
        <span>${p.name} × ${cart[i]}</span>
        <span>
          <button class="btn btn-sm" onclick="cart[${i}]--; if(!cart[${i}]) delete cart[${i}]; updateCart()">−</button>
          <button class="btn btn-sm" onclick="cart[${i}]++; updateCart()">+</button>
        </span>
      </div>
    `
          : "",
      )
      .join("") || "Your bag is looking lovely and empty."; // Join the rows, or show this message if the cart is empty.
}
