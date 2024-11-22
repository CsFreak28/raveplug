import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebaseconfig.js";

export async function getPartyName(partyName) {
  const eventCollection = collection(db, "events");
  const q = query(eventCollection, where("eventurl", "==", partyName));
  const querySnapshot = getDocs(q);
  let gottenDoc;
  (await querySnapshot).forEach((doc) => {
    console.log("the doc that was snapshotted", doc.data());
    gottenDoc = doc.data();
  });
  return gottenDoc;
}
