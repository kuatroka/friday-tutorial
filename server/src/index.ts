import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

interface IconEntry {
  id: string;
  componentName: string;
  contributor: string;
  message: string;
  date?: string;
  githubUsername?: string;
}

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, "guestbook.json");

app.use(express.json());
app.use(cors());

app.get("/api/icons", (req: Request, res: Response) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading guestbook data:", err);
      return res.status(500).json({ error: "Could not read guestbook data" });
    }

    try {
      const icons: IconEntry[] = JSON.parse(data || "[]");

      // Sort entries by date in descending order (newest first)
      icons.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });

      res.json(icons);
    } catch (parseErr) {
      console.error("Error parsing guestbook data:", parseErr);
      res.status(500).json({ error: "Invalid guestbook data format" });
    }
  });
});

// Create a new icon entry - available to all users
app.post("/api/icons", (req: Request, res: Response) => {
  const newIcon: IconEntry = req.body;

  if (
    !newIcon ||
    !newIcon.id ||
    !newIcon.componentName ||
    !newIcon.contributor ||
    !newIcon.message
  ) {
    return res
      .status(400)
      .json({
        error:
          "Missing required icon properties. Required: id, componentName, contributor, message",
      });
  }

  // Ensure the entry has a full timestamp
  if (!newIcon.date) {
    newIcon.date = new Date().toISOString();
  } else if (!newIcon.date.includes("T")) {
    // Convert YYYY-MM-DD to full ISO timestamp
    newIcon.date = new Date(newIcon.date).toISOString();
  }

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading guestbook data:", err);
      return res.status(500).json({ error: "Could not read guestbook data" });
    }

    try {
      const icons: IconEntry[] = JSON.parse(data || "[]");

      const isDuplicate = icons.some(
        (icon) =>
          icon.id === newIcon.id || icon.componentName === newIcon.componentName
      );

      if (isDuplicate) {
        return res
          .status(409)
          .json({
            error:
              "An icon with this id or componentName already exists. Icon names must be unique.",
          });
      }

      icons.push(newIcon);

      // Sort entries by date in descending order before saving
      icons.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });

      fs.writeFile(DATA_FILE, JSON.stringify(icons, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("Error writing guestbook data:", writeErr);
          return res.status(500).json({ error: "Could not save icon" });
        }

        res.status(201).json(newIcon);
      });
    } catch (parseErr) {
      console.error("Error parsing guestbook data:", parseErr);
      res.status(500).json({ error: "Invalid guestbook data format" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
