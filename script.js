const products = [
  [
    "A Bread",
    6800,
    "A very soft bread",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_sb7YZyRR7eojX8jeilrU5YfTr-dKKT1kvte4lhwIZA&s=10",
  ],
  [
    "Daily cup",
    1400,
    "A hand-sized favorite in matte stoneware.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-8ny1lOjf463eEhB3AG5FwGh3lIGcqlX8tIF6eZ56ew&s=10",
  ],
  [
    "Soft carry tote",
    3200,
    "Room for the bits that make a day.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTxoGU9f85C1GZ-EvSEiX41zMpn_oOD3lvah6A9BBUQ&s=10",
  ],
  [
    "Field notebook",
    1800,
    "An open page for plans and passing thoughts.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc7vf7GggcvpnLppcfA7UXd5aZPn_xyEF1RYcfTncg8Q&s=10",
  ],
  [
    "Sunday vase",
    4200,
    "A simple shape for something in bloom.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJtcmfPW2LrOMk1Kvwc7OjwBqLusqWJDUniv6MILvmKA&s=10",
  ],
  [
    "Pebble speaker",
    89,
    "Pocket-sized sound, all day long.",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJP8uHs4NKCgXbTlSa_7z-tf5t3doeY99ZyiqOJXzGQ&s=10",
  ],
];

const cart = {};
const money = (n) => `PKR ${n.toLocaleString("en-PK")}`;

document.querySelector("#products").innerHTML = products
  .map(
    ([name, price, desc, image], i) => `
  <div class="col"><article class="card product-card">
    <img src="${image}" alt="${name}" class="card-img-top">
    <div class="card-body">
      <h3 class="h6 fw-bold">${name}<span class="float-end">${money(price)}</span></h3>
      <p class="small text-secondary">${desc}</p>
      <button class="btn btn-dark btn-sm w-100 add" data-i="${i}">Add to bag</button>
    </div>
  </article></div>`,
  )
  .join("");

function update() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  document.querySelector("#count").textContent = count;
  document.querySelector("#bag-label").textContent = `(${count})`;
  document.querySelector("#total").textContent = money(
    products.reduce((sum, p, i) => sum + p[1] * (cart[i] || 0), 0),
  );

  document.querySelector("#items").innerHTML =
    products
      .map(([name, price], i) =>
        cart[i]
          ? `<div class="d-flex justify-content-between mb-2">
      <span>${name} × ${cart[i]}</span>
      <span><button class="qty" data-i="${i}" data-n="-1">−</button>
      <button class="qty" data-i="${i}" data-n="1">+</button></span>
    </div>`
          : "",
      )
      .join("") || "Your bag is empty.";
}

document.addEventListener("click", (e) => {
  const i = e.target.dataset.i;
  if (e.target.matches(".add")) cart[i] = (cart[i] || 0) + 1;
  if (e.target.matches(".qty")) {
    cart[i] += Number(e.target.dataset.n);
    if (!cart[i]) delete cart[i];
  }
  if (e.target.id === "clear") Object.keys(cart).forEach((i) => delete cart[i]);
  if (e.target.id === "continue") alert("Thanks for stopping by .dot!");
  update();
});

update();
