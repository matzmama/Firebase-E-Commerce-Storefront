import { db } from "../js/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// CREATE ORDER
export const createOrder = async (user, cartItems) => {
  if (!user) throw new Error("User not logged in");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await addDoc(collection(db, "orders"), {
    userId: user.uid,
    email: user.email,
    items: cartItems,
    total,
    createdAt: serverTimestamp(),
  });
};

// GET ORDERS
export const getUserOrders = async (email) => {
  const q = query(
    collection(db, "orders"),
    where("email", "==", email)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};