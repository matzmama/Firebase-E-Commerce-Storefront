import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./features/CartSlice.js";
import Cart from "./features/Cart.js";

function App() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      return res.json();
    },
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      const url = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : "https://fakestoreapi.com/products";

      const res = await fetch(url);
      return res.json();
    },
  });

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>

      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h2>{product.title}</h2>
          <p>${product.price}</p>
          <p>{product.category}</p>
          <p>{product.description}</p>
          <p>⭐ {product.rating.rate}</p>

          <img
            src={product.image}
            alt={product.title}
            width="100"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/100";
            }}
          />

          <br />
          <button onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      ))}

      <Cart />
    </div>
  );
}

export default App;