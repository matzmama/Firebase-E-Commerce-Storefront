import { db } from "../js/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "../js/firebase";

const ordersCol = collection(db, "orders");

export async function createOrder(userId, items) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return addDoc(ordersCol, {
    userId: user.uid,
    email: user.email,              // ✅ ADDED
    items,
    total,
    createdAt: serverTimestamp(),   // ✅ BETTER THAN new Date()
  });
}

export async function getUserOrders(userId) {
  const q = query(ordersCol, where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getOrderById(orderId) {
  const snap = await getDoc(doc(db, "orders", orderId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}