import { useEffect, useState } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../productService";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  // 📥 LOAD PRODUCTS
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getAllProducts();
    setProducts(data);
  }

  // ➕ ADD PRODUCT
  async function handleAddProduct() {
    await createProduct({
      title: "New Product",
      price: 25,
      description: "Test product",
      category: "general",
      image: "",
    });

    loadProducts(); // refresh
  }

  // ✏️ UPDATE
  async function handleUpdate(id) {
    await updateProduct(id, { price: 99 });
    loadProducts();
  }

  // ❌ DELETE
  async function handleDelete(id) {
    await deleteProduct(id);
    loadProducts();
  }

  return (
    <div>
      <h2>Products</h2>

      <button onClick={handleAddProduct}>Add Product</button>

      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{p.title}</h3>
          <p>${p.price}</p>
          <p>{p.description}</p>

          <button onClick={() => handleUpdate(p.id)}>Update</button>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;