import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./CartSlice.js";
import { useState } from "react";
import { createOrder } from "../services/orderService";
import { auth } from "../js/firebase.js";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [checkedOut, setCheckedOut] = useState(false);

  // totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ UPDATED CHECKOUT
  const handleCheckout = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to checkout!");
      return;
    }

    try {
      // 🔥 CREATE ORDER IN FIREBASE
      await createOrder(user.uid, cart);

      // 🧹 clear cart AFTER saving
      dispatch(clearCart());

      setCheckedOut(true);
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {/* Success message */}
      {checkedOut && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          Checkout successful! Your order has been saved.
        </p>
      )}

      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>

      {cart.length === 0 && !checkedOut && (
        <p>Your cart is empty.</p>
      )}

      {cart.map((item) => (
        <div key={item.id} style={{ marginBottom: "1rem" }}>
          <h4>{item.title}</h4>
          <p>Qty: {item.quantity}</p>
          <p>${item.price}</p>

          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <button onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;