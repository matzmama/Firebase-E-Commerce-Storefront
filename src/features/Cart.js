import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./CartSlice.js";
import { useState } from "react";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Local UI state for checkout success message
  const [checkedOut, setCheckedOut] = useState(false);

  // Calculate totals BEFORE checkout
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch(clearCart());
    setCheckedOut(true);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {/* Success message */}
      {checkedOut && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          Checkout successful! Your cart has been cleared.
        </p>
      )}

      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>

      {/* Empty cart message */}
      {cart.length === 0 && !checkedOut && (
        <p>Your cart is empty.</p>
      )}

      {/* Cart items */}
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

      {/* Checkout button only when items exist */}
      {cart.length > 0 && (
        <button onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;