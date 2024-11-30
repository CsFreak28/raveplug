import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { getEventDetails, storeEventDetails } from "./db/eventFunctions.js";
import { signup } from "./db/signup.js";
import { loginUser } from "./db/login.js";
import { getPartyName } from "./db/getterFunctions.js";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
// Get the __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "backend")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/fonts", express.static(path.join(__dirname, "fonts")));

// Route to serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "newlandingpage.html"));
});
app.get("/createparty", (req, res) => {
  res.sendFile(path.join(__dirname, "createparty.html"));
});
app.get("/auth", (req, res) => {
  res.sendFile(path.join(__dirname, "authpage.html"));
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log("before returning", email, password);
  const value = await signup(email, password);
  console.log("this is the returned value", value);
  if (value.success) {
    res.status(200).send(value);
  } else {
    res.status(404).send(value);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const value = await loginUser(email, password);
  console.log("this is the returned value", value);

  if (value.success) {
    res.status(200).send(value);
  } else {
    res.status(404).send(value);
  }
});
app.get("/manageevent/:eventId", async (req, res) => {
  // Send a response
  res.sendFile(path.join(__dirname, "manageevent.html"));
});
app.get("/api/:partyName/tickets", async (req, res) => {
  //get the partyName
  const { partyName } = req.params;
  console.log("this is the party name", partyName);
  // get the party's name
  const partyDoc = await getPartyName(partyName);
  if (partyDoc) {
    res.status(200).send(partyDoc);
  } else {
    res.status(404).send(null);
  }
});
app.get("/:partyName/tickets", async (req, res) => {
  // const { partyName } = req.params;
  // console.log("this is the party page for", partyName);
  res.sendFile(path.join(__dirname, "eventForm.html"));
});
app.get("/api/events/:eventId", async (req, res) => {
  console.log("salav");
  const { eventId } = req.params;
  console.log("thisis the event Id first of all", eventId);
  try {
    const eventDetails = await getEventDetails(eventId); // Fetch event details
    if (!eventDetails) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(eventDetails);
  } catch (error) {
    console.error("Error fetching event details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Define the endpoint
app.get("/eventDetails/:eventId", (req, res) => {
  const { eventId } = req.params;
  //   const event = eventDetails[eventId];
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404).json({ error: "Event not found" });
  }
});

app.post("/createparty", async (req, res) => {
  const { eventData, authToken } = req.body; // Assuming body-parser is used
  // Process the data (e.g., save it to a database)
  console.log("the event data", eventData);
  const eventId = await storeEventDetails(eventData);
  // Send a response
  console.log("thisis the event Id", eventId);
  if (authToken) {
    res.status(200).json({ route: "manageevent", message: eventId });
  } else {
    res.status(200).json({ route: `auth?returnTo=${eventId}`, message: "" });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
