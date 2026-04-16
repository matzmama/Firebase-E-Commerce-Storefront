import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../js/firebase";

export const getUserOrders = async (email) => {
  const q = query(
    collection(db, "orders"),
    where("email", "==", email) // ✅ FIX HERE
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};