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
  if (e.target.id === "continue") alert("ok hogya g");
  update();
});

update();
