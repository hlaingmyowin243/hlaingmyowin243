//render products
const cartContainer = document.querySelector("#cart-container");
const cartsTable = document.querySelector("#cartsTable");
const totalProducts = document.querySelector("#totalNum");
const totalCoast = document.querySelector("#totalPrice");

if (!cartsTable.innerHTML) {
  const p = document.createElement("p");
  p.innerHTML = "No items here";
  cartsTable.appendChild(p);
  p.classList.add("p");
}

const productRender = () => {
  products.forEach((product) => {
    const cart = document.createElement("div"); //cart
    cart.classList.add("cart");

    const image = document.createElement("img"); //image
    image.src = product.src;

    const title = document.createElement("p"); //title
    title.innerHTML = product.name;
    title.classList.add("title");

    const price = document.createElement("p");
    price.innerHTML = `$${product.price}`;
    price.classList.add("price");

    const btn = document.createElement("button");
    btn.innerHTML = "Add to cart";
    btn.classList.add("btn");
    btn.addEventListener("click", () => {
      addtoCarts(product.id);
    }); //add to cart btn

    cart.append(image, title, price, btn);
    cartContainer.appendChild(cart);
  });
};

productRender();

//add to cart btn
let carts = [];
const addtoCarts = (id) => {
  if (carts.some((cart) => cart.id === id)) {
    minusAndPlus("plus", id);
  } else {
    const cartList = products.find((product) => product.id === id);
    carts.push({
      ...cartList,
      Quantity: 1,
    });

    renderProductsCarts();
    totalPriceAndProduct();
  }
};

//cart list
const renderProductsCarts = () => {
  cartsTable.innerHTML = "";
  carts.forEach((cart) => {
    const listDiv = document.createElement("div");
    listDiv.classList.add("listDiv");

    const choicedimage = document.createElement("img"); //image
    choicedimage.src = cart.src;
    choicedimage.classList.add("choicedimage");

    const price = document.createElement("p"); //price
    price.innerHTML = `$${cart.price}`;
    price.classList.add("price");

    const quantityDiv = document.createElement("div"); //quantity
    quantityDiv.classList.add("quantityDiv");
    const minus = document.createElement("div"); //minus
    minus.classList.add("action");
    minus.innerHTML = "-";
    minus.addEventListener("click", () => {
      minusAndPlus("minus", cart.id);
    });

    const plus = document.createElement("div"); //plus
    plus.classList.add("action");
    plus.innerHTML = "+";
    const quantity = document.createElement("p");
    quantity.innerHTML = cart.Quantity;
    plus.addEventListener("click", () => {
      minusAndPlus("plus", cart.id);
    });

    const deleteDiv = document.createElement("img"); //delete
    deleteDiv.classList.add("deleteDiv");
    deleteDiv.src = "./asset/delete.png";
    deleteDiv.addEventListener("click", () => {
      removeitems(cart.id);
    });

    quantityDiv.append(minus, quantity, plus);
    listDiv.append(choicedimage, price, quantityDiv, deleteDiv); //list div
    cartsTable.appendChild(listDiv);
  });
};

const minusAndPlus = (condition, id) => {
  carts = carts.map((cart) => {
    Quantity = cart.Quantity;
    if (cart.id === id) {
      if (condition === "plus") {
        Quantity++;
      } else if (condition === "minus" && Quantity > 1) {
        Quantity--;
      }
    }

    return {
      ...cart,
      Quantity,
    };
  });
  renderProductsCarts();
  totalPriceAndProduct();
};

//total price and total product

const totalPriceAndProduct = () => {
  let totalPrice = 0;
  let totalNum = 0;
  carts.forEach((cart) => {
    totalPrice += cart.price * cart.Quantity;
    totalNum += cart.Quantity;
  });
  totalCoast.innerHTML = `$ ${totalPrice}`;
  totalProducts.innerHTML = totalNum;
};

const removeitems = (id) => {
  console.log(carts);
  carts = carts.filter((cart) => cart.id !== id);
  renderProductsCarts();
  totalPriceAndProduct();
};
