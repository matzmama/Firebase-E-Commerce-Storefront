import { db } from "../js/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function updateUserProfile(uid, data) {
  return updateDoc(doc(db, "users", uid), data);
}

export async function deleteUserProfile(uid) {
  return deleteDoc(doc(db, "users", uid));
}