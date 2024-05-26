import { Router } from "express";
import clientSchema from "../model/client.js";
import requireAuth from "../middleware/requireAuth.js";
import JWT from "jsonwebtoken";

const router = Router();

// Token validation endpoint
router.post("/validate-token", async (req, res) => {
  const token = req.body.token;
  try {
    const decoded = JWT.verify(token, process.env.SECRET);
    const user = await ClientSchema.findById(decoded._id);
    if (user) {
      return res.status(200).json({ valid: true, user });
    } else {
      return res.status(401).json({ valid: false, message: "User not found" });
    }
  } catch (error) {
    return res.status(401).json({ valid: false, error: error.message });
  }
});

// Create Token
const createToken = (_id) => {
  return JWT.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

router.post('/signup', async (req, res) => {
  // Verify that data passes through validation
  for (const key of Object.keys(req.body)) {
    if (req.body[key] === '') {
      return res.status(400).json({ message: 'Verify blog content: one or more elements are empty' });
    }
  }
  try {
    let newClient = await clientSchema.create(req.body);
    res.status(201).json(newClient);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error while creating Client' });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("hello");
    // Call login method from ClientModel to authenticate user
    const client = await clientSchema.login(username, password);
    res.status(200).json(client);
  } catch (error) {
    // Handle login error
    console.error("Login error:", error);
    res.status(401).json({ error: "Username/password is incorrect" });
  }
});





router.get("/", async (req, res) => {
  try {
    const clients = await clientSchema.find({});
    if (!clients || clients.length === 0)
      return res.status(404).json({ error: "No clients found" });
    return res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:idClient", async (req, res) => {
  try {
    const clientId = req.params.idClient;
    const client = await clientSchema.findOne({ _id: clientId });
    if (!client) return res.status(404).json({ error: "client not found" });
    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ error: " find internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newClient = req.body;
    if (!newClient) return res.status(404).json({ error: "body is empty" });
    const client = await clientSchema.create(newClient);
    if (!client)
      return res.status(500).json({ error: "could not create client" });
    return res.status(200).json(client);
  } catch (error) {
    console.error("Error creating client:", error);

    return res.status(500).json({ error: " add internal server error" });
  }
});

router.put("/:idClient", async (req, res) => {
  try {
    const clientId = req.params.idClient;
    console.log(clientId);
    const updatedClientdata = req.body;

    if (!updatedClientdata)
      return res.status(404).json({ error: " body is emptyd" });

    const existingClient = await clientSchema.findOne({ _id: clientId });
    if (!existingClient)
      return res.status(404).json({ error: "client not found" });

    existingClient.set(updatedClientdata);
    const updatedClient = await existingClient.save();
    return res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error of modification client:", error);
    return res.status(500).json({ error: " internal server error" });
  }
});

router.delete("/:idClient", async (req, res) => {
  try {
    const clientId = req.params.idClient;
    const existingClient = await clientSchema.findByIdAndDelete(clientId);
    if (!existingClient)
      return res.status(404).json({ error: "client not found" });
    return res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error of deleting client:", error);

    return res.status(500).json({ error: "internal server error" });
  }
});

export default router;
