import { useEffect, useState } from "react";
import { getUserOrders } from "../services/orderService";
import { auth } from "../js/firebase";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;

      if (!user) return;

      // ✅ FIX: use email instead of uid
      const data = await getUserOrders(user.email);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";

    try {
      const date = timestamp.toDate
        ? timestamp.toDate()
        : new Date(timestamp);

      return date.toLocaleString();
    } catch {
      return "—";
    }
  };

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p><strong>Order ID:</strong> {order.id}</p>

          <p>
            <strong>Date:</strong> {formatDate(order.createdAt)}
          </p>

          <p>
            <strong>Total:</strong> ${order.total?.toFixed(2) || "0.00"}
          </p>

          <p><strong>Items:</strong></p>
          <ul>
            {order.items?.map((item, index) => (
              <li key={index}>
                {item.title} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;