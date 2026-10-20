// =============================================================================
// 1. DATA STRUCTURES & STATE MANAGEMENT
// =============================================================================

/**
 * `products` Array:
 * Contains the complete catalog of item data available in the shop.
 * Structure: Array of Arrays (2D Matrix) where each inner array represents one product:
 *   - Index 0: String  -> Product Name
 *   - Index 1: Number  -> Price in PKR
 *   - Index 2: String  -> Short Description
 *   - Index 3: String  -> Image URL source
 */
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

/**
 * `cart` Object:
 * Acts as the dynamic shopping bag state using key-value pairs.
 *   - Key   : Array index of the product matching `products[index]`
 *   - Value : Integer quantity of the product currently selected by user
 * Example structure when populated: { 0: 2, 3: 1 } (2 Coffees, 1 Milk Tea)
 */
const cart = {};


// =============================================================================
// 2. UTILITY / HELPER FUNCTIONS
// =============================================================================

/**
 * `money` Function:
 * Arrow function taking a numerical amount (`n`) and formatting it into a currency string.
 * Uses JavaScript's built-in `toLocaleString('en-PK')` to apply standard Pakistani digit grouping.
 * 
 * @param {number} n - The raw numerical price/total
 * @returns {string} Formatted string like "PKR 1,200"
 */
const money = (n) => `PKR ${n.toLocaleString("en-PK")}`;


// =============================================================================
// 3. INITIAL PRODUCT GRID RENDERING
// =============================================================================

/**
 * Renders product cards into the DOM element `#products` upon initial script execution.
 * 
 * Flow & Methods:
 * 1. `document.querySelector("#products")`: Finds the container element with ID "products".
 * 2. `.map(([name, price, desc, image], i) => ...)`:
 *    - Array Destructuring `[name, price, desc, image]` extracts elements of each product array.
 *    - `i` captures the numerical array index for tracking.
 *    - Template Literals construct Bootstrap HTML markup for each card.
 * 3. `.join("")`: Converts the mapped array of HTML strings into a single contiguous HTML string.
 * 4. `.innerHTML = ...`: Inject the generated HTML markup into the DOM.
 * 
 * Custom Attributes used:
 *   - `data-i="${i}"`: Custom HTML data attribute (`data-*`) that stores the product index `i`.
 *                     This links the DOM element directly to its item in the `products` array.
 */
document.querySelector("#products").innerHTML = products
  .map(
    ([name, price, desc, image], i) => `
  <div class="col"><article class="card product-card">
    <!-- img tag: 'src' holds the image URL, 'alt' provides accessibility text -->
    <img src="${image}" alt="${name}" class="card-img-top">
    <div class="card-body">
      <!-- Title header displaying item name and formatted price aligned to the right via Bootstrap class float-end -->
      <h3 class="h6 fw-bold">${name}<span class="float-end">${money(price)}</span></h3>
      <!-- Product description text styled with Bootstrap small and secondary text classes -->
      <p class="small text-secondary">${desc}</p>
      <!-- 'add' button: 
           - 'class="add"': Marker class used by event delegation to identify add actions.
           - 'data-i="${i}"': Stores array index 'i' so the click handler knows which item to increment. -->
      <button class="btn btn-dark btn-sm w-100 add" data-i="${i}">Add to bag</button>
    </div>
  </article></div>`,
  )
  .join("");


// =============================================================================
// 4. UI UPDATE FUNCTION
// =============================================================================

/**
 * `update()` Function:
 * Master controller function to synchronize the JS `cart` state with all UI components in the DOM.
 * Must be executed whenever item quantities, additions, or resets occur.
 */
function update() {
  /**
   * Calculate total total item count across all selected products:
   * 1. `Object.values(cart)`: Extracts array of item quantities, e.g., [2, 1].
   * 2. `.reduce((a, b) => a + b, 0)`: Sums numbers up starting from initial value 0.
   */
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  // Update total badge counts across badge/label DOM nodes
  document.querySelector("#count").textContent = count;
  document.querySelector("#bag-label").textContent = `(${count})`;

  /**
   * Calculate overall monetary subtotal:
   * 1. Iterates over the main `products` array via `.reduce()`.
   * 2. For each product array `p` at index `i`, retrieves its price `p[1]`.
   * 3. Multiplies price by `cart[i]` (or `0` if item is undefined/not in cart).
   * 4. Formats total with `money()` helper function and updates DOM node `#total`.
   */
  document.querySelector("#total").textContent = money(
    products.reduce((sum, p, i) => sum + p[1] * (cart[i] || 0), 0),
  );

  /**
   * Render active cart items list inside container `#items`:
   * 1. Maps through `products` checking if `cart[i]` exists (quantity > 0).
   * 2. If present, returns template string of flexbox row item with quantity controls.
   * 3. If absent (0 or undefined), returns empty string `""`.
   * 4. `.join("")`: Combines items array to single HTML string.
   * 5. `|| "Your bag is empty."`: Logical OR fallback displays empty message if HTML output is empty string.
   */
  document.querySelector("#items").innerHTML =
    products
      .map(([name, price], i) =>
        cart[i]
          ? `<div class="d-flex justify-content-between mb-2">
      <!-- Displays item name and current multiplier quantity -->
      <span>${name} × ${cart[i]}</span>
      <span>
        <!-- Decrease quantity button: 
             - 'class="qty"': Marker class for event delegation target matching.
             - 'data-i="${i}"': Stores target product index.
             - 'data-n="-1"': Stores increment value (-1 for decrementing count). -->
        <button class="qty" data-i="${i}" data-n="-1">−</button>

        <!-- Increase quantity button:
             - 'class="qty"': Marker class for event delegation target matching.
             - 'data-i="${i}"': Stores target product index.
             - 'data-n="1"': Stores increment value (+1 for incrementing count). -->
        <button class="qty" data-i="${i}" data-n="1">+</button>
      </span>
    </div>`
          : "",
      )
      .join("") || "Your bag is empty.";
}


// =============================================================================
// 5. EVENT DELEGATION & ACTION HANDLERS
// =============================================================================

/**
 * Event Listener: Event Delegation pattern on global `document`.
 * Listens for single click events and routes actions based on target element classes/IDs.
 */
document.addEventListener("click", (e) => {
  /**
   * `e.target.dataset.i`:
   * Accesses the `data-i` HTML attribute from the clicked target element via DOM `dataset`.
   * Evaluates to product array index string (e.g. "0", "1") or `undefined` if attribute isn't set.
   */
  const i = e.target.dataset.i;

  /**
   * Action 1: Add to Bag Button Clicked
   * `e.target.matches(".add")`: Checks if clicked element contains CSS class `add`.
   * Increments current quantity in `cart[i]` by 1, initializing to 0 if previously undefined.
   */
  if (e.target.matches(".add")) cart[i] = (cart[i] || 0) + 1;

  /**
   * Action 2: Quantity Plus/Minus Buttons Clicked
   * `e.target.matches(".qty")`: Checks if clicked element contains CSS class `qty`.
   * Reads `data-n` attribute via `e.target.dataset.n` ("1" or "-1"), converts to number, and adjusts quantity.
   */
  if (e.target.matches(".qty")) {
    cart[i] += Number(e.target.dataset.n);
    
    // Garbage collection: If quantity reaches 0 or below, remove key from cart object completely
    if (!cart[i]) delete cart[i];
  }

  /**
   * Action 3: Clear Cart Button Clicked
   * `e.target.id === "clear"`: Checks if target element has HTML ID attribute `clear`.
   * Loops through all existing keys in `cart` object and deletes them one by one.
   */
  if (e.target.id === "clear") Object.keys(cart).forEach((i) => delete cart[i]);

  /**
   * Action 4: Checkout/Continue Button Clicked
   * `e.target.id === "continue"`: Checks if target element has HTML ID attribute `continue`.
   * Triggers browser alert modal message.
   */
  if (e.target.id === "continue") alert("ok hogya g");

  /**
   * Re-render UI after state modification to ensure display reflects updated cart data.
   */
  update();
});


// =============================================================================
// 6. INITIALIZATION
// =============================================================================

// Initial function execution on page load to render empty cart state baseline UI
update();