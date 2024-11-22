import { doc, setDoc } from "firebase/firestore";
import { loginUser } from "./login.js";
import { db } from "../firebaseconfig.js";

export async function signup(email, password) {
  const userExists = await loginUser(email, password);
  if (userExists.success == true) {
    return {
      success: false,
      message: "User already exists",
    };
  } else {
    const newDoc = doc(db, "users", email);
    await setDoc(newDoc, {
      password: password,
      email: email,
    });
    return {
      success: true,
      message: "Created account successfully",
    };
  }
}
