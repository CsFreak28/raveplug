import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig.js";

export async function addEventToUser(email, eventId) {
  const usersDoc = doc(db, "users", email);
  await updateDoc(usersDoc, {
    currentEvent: eventId,
  });
}
