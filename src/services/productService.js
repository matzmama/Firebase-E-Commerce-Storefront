import { db } from "../js/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

// ❌ REMOVE this top-level call
// const productsCol = collection(db, "Products");

// ➕ CREATE
export async function createProduct(product) {
  return addDoc(collection(db, "Products"), { // ✅ moved inside
    ...product,
    createdAt: serverTimestamp(),
  });
}

// 📥 READ ALL
export async function getAllProducts() {
  const snap = await getDocs(collection(db, "Products")); // ✅ moved inside
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ✏️ UPDATE
export async function updateProduct(id, data) {
  return updateDoc(doc(db, "Products", id), data);
}

// ❌ DELETE
export async function deleteProduct(id) {
  return deleteDoc(doc(db, "Products", id));
}