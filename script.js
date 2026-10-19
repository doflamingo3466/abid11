const products = [
  {
    name: "A Bread",
    price: 6800,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_sb7YZyRR7eojX8jeilrU5YfTr-dKKT1kvte4lhwIZA&s=10",
    description: "A very soft bread"
  },
  {
    name: "Daily cup",
    price: 1400,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-8ny1lOjf463eEhB3AG5FwGh3lIGcqlX8tIF6eZ56ew&s=10",
    description: "A hand-sized favorite in matte stoneware."
  },
  {
    name: "Soft carry tote",
    price: 3200,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTxoGU9f85C1GZ-EvSEiX41zMpn_oOD3lvah6A9BBUQ&s=10",
    description: "Room for the bits that make a day."
  },
  {
    name: "Field notebook",
    price: 1800,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc7vf7GggcvpnLppcfA7UXd5aZPn_xyEF1RYcfTncg8Q&s=10",
    description: "An open page for plans and passing thoughts."
  },
  {
    name: "Sunday vase",
    price: 4200,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJtcmfPW2LrOMk1Kvwc7OjwBqLusqWJDUniv6MILvmKA&s=10",
    description: "A simple shape for something in bloom."
  },
  {
    name: "Pebble speaker",
    price: 89,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJP8uHs4NKCgXbTlSa_7z-tf5t3doeY99ZyiqOJXzGQ&s=10",
    description: "Pocket-sized sound, all day long."
  }
];

const cart = {};

document.querySelector("#products").innerHTML = products
  .map(
    (p, i) => `
      <div class="col">
        <article class="card product-card">
          <img class="card-img-top" src="${p.imageUrl}" alt="${p.name}">
          <div class="card-body">
            <h3 class="h6 fw-bold">
              ${p.name}
              <span class="float-end">PKR ${p.price}</span>
            </h3>
            <p class="small text-secondary">${p.description}</p>
            <button
              class="btn btn-dark btn-sm w-100"
              onclick="cart[${i}] = (cart[${i}] || 0) + 1; updateCart()"
            >Add to bag</button>
          </div>
        </article>
      </div>
    `
  )
  .join("");

function updateCart() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.reduce(
    (sum, p, i) => sum + p.price * (cart[i] || 0),
    0
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
                <button class="btn btn-sm" onclick="cart[${i}]--; if (!cart[${i}]) delete cart[${i}]; updateCart()">−</button>
                <button class="btn btn-sm" onclick="cart[${i}]++; updateCart()">+</button>
              </span>
            </div>
          `
          : ""
      )
      .join("") || "Your bag is looking lovely and empty.";
}

function clearCart() {
  Object.keys(cart).forEach(key => delete cart[key]);
  updateCart();
}