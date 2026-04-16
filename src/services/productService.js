import { db } from "../js/firebase"; // ✅ FIXED PATH
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

// Match your Firestore collection name exactly
const productsCol = collection(db, "Products");

// ➕ CREATE
export async function createProduct(product) {
  return addDoc(productsCol, {
    ...product,
    createdAt: serverTimestamp(), // ✅ better than new Date()
  });
}

// 📥 READ ALL
export async function getAllProducts() {
  const snap = await getDocs(productsCol);
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