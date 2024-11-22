import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig.js";

export async function loginUser(email, password) {
  const usersDoc = doc(db, "users", email);
  const gottenDoc = await getDoc(usersDoc);
  if (gottenDoc.exists()) {
    if (gottenDoc.data()["password"] == password) {
      return {
        success: true,
        message: "User exists",
      };
    } else {
      return {
        success: false,
        message: "Incorrect Password",
      };
    }
  } else {
    return {
      success: false,
      message: "User doesn't exist",
    };
  }
}
