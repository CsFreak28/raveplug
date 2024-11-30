import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig.js";

export async function loginUser(email, password, typeOfRequest, eventId) {
  const usersDoc = doc(db, "users", email);
  const gottenDoc = await getDoc(usersDoc);
  const data = gottenDoc.data();
  if (gottenDoc.exists() && typeOfRequest !== null) {
    return {
      success: true,
      message: "User Exists",
    };
  } else if (gottenDoc.exists()) {
    if (gottenDoc.data()["password"] == password) {
      if (eventId && data["currentEvent"] == eventId) {
        return {
          success: true,
          message: "User Exists",
          currentEvent: eventId,
        };
      } else if (eventId) {
        updateDoc(usersDoc, {
          eventId: eventId != null ? eventId : "",
        });
        return {
          success: true,
          message: "User Exists",
          currentEvent: eventId,
        };
      } else {
        return {
          success: true,
          message: "User Exists",
          currentEvent: data["currentEvent"],
        };
      }
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
