import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "./features/CartSlice";
import Cart from "./features/Cart";
import AuthPage from "./pages/AuthPage";
import OrderHistory from "./pages/OrderHistory";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/productService";

function App() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // 📥 Load products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // ➕ Add product
  async function handleAddProduct() {
    await createProduct({
      title: "New Product",
      price: 25,
      description: "Test product",
      category: "general",
      image: "",
    });

    queryClient.invalidateQueries(["products"]);
  }

  // ✏️ Update product
  async function handleUpdate(id) {
    await updateProduct(id, { price: 99 });
    queryClient.invalidateQueries(["products"]);
  }

  // ❌ Delete product
  async function handleDelete(id) {
    await deleteProduct(id);
    queryClient.invalidateQueries(["products"]);
  }

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      {/* 🔐 AUTH */}
      <AuthPage />

      <h1>Product List</h1>

      {/* ➕ CREATE */}
      <button onClick={handleAddProduct}>Add Product</button>

      {/* 📦 PRODUCTS */}
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

          {product.category && <p>{product.category}</p>}
          {product.description && <p>{product.description}</p>}

          {product.image && (
            <img
              src={product.image}
              alt={product.title}
              width="100"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/100";
              }}
            />
          )}

          <br />

          {/* 🛒 CART */}
          <button onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>

          {/* ✏️ UPDATE */}
          <button onClick={() => handleUpdate(product.id)}>
            Update
          </button>

          {/* ❌ DELETE */}
          <button onClick={() => handleDelete(product.id)}>
            Delete
          </button>
        </div>
      ))}

      {/* 🛒 CART */}
      <Cart />

      {/* 📜 ORDER HISTORY */}
      <OrderHistory />
    </div>
  );
}

export default App;