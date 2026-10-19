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

const cart = {};

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
  .join("");

function updateCart() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.reduce(
    (sum, p, i) => sum + p.price * (cart[i] || 0),
    0,
  );

  document.querySelector("#cart-count").textContent = count;
  document.querySelector("#bag-label").textContent = `(${count})`;
  document.querySelector("#cart-total").textContent = `$${total.toFixed(2)}`;

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
      .join("") || "Your bag is looking lovely and empty.";
}
// Empty the cart, then refresh the displayed count, items, and total.
function clearCart() {
  Object.keys(cart).forEach(key => delete cart[key]);
  updateCart();
}
