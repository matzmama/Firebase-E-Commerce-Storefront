import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../js/firebase";

export const getUserOrders = async (email) => {
  const q = query(
    collection(db, "orders"),
    where("email", "==", email)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createOrder = async (orderData) => {
  const orderRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    createdAt: Timestamp.now(),
  });
  return orderRef.id;
};