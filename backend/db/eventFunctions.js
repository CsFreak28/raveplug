import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseconfig.js";
export async function storeEventDetails(eventDetails) {
  const eventId = generateId();
  const docRef = doc(db, "events", eventId);
  setDoc(docRef, {
    ...eventDetails,
    // creator: creator,
    eventurl: convertToUrlFriendly(eventDetails["title"]),
  });

  return eventId;
}
function generateId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 14; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
}
export async function getEventDetails(eventId) {
  const getDocel = await getDoc(doc(db, "events", eventId));
  if (getDocel.exists()) {
    const eventsData = getDocel.data();
    return eventsData;
  } else {
    return {};
  }
}
function convertToUrlFriendly(text) {
  return text
    .replace(/'/g, "") // Remove apostrophes
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .toLowerCase(); // Convert to lowercase if needed (optional)
}

// Example usage
// const input = "Gideon's party of century";
// const urlFriendlyString = convertToUrlFriendly(input);
// console.log(urlFriendlyString); // Output: "Gideons-party-of-century"
