import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./CartSlice";
import { useState } from "react";
import { createOrder } from "../services/orderService";
import { auth } from "../js/firebase";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [checkedOut, setCheckedOut] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in to checkout!");
        return;
      }

      await createOrder(user, cart);

      alert("Order placed!");

      dispatch(clearCart());
      setCheckedOut(true);
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    }
  };

  return (
    <div>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <h4>{item.name}</h4>
              <p>${item.price}</p>
              <p>Qty: {item.quantity}</p>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}

          <h3>Total Items: {totalItems}</h3>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}

      {checkedOut && <p>Order placed successfully!</p>}
    </div>
  );
}

export default Cart;