// routes/events.js
import { Router } from "express";
import { getDatabase } from "../data/database.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const db = await getDatabase();
    const allEvents = await db.collection("events").find().toArray();
    res.json({ events: allEvents });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

router.post("/", async (req, res) => {
  try {
    const db = await getDatabase();
    const eventData = req.body;
    const result = await db.collection("events").insertOne(eventData);
    res.status(201).json({
      message: "Event created.",
      event: { ...eventData, id: result.insertedId },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create event." });
  }
});

export default router;
