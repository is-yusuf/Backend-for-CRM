import express from "express";
import cors from "cors";
import db from "./db";
import { getRequest } from "./getRequests";
import { register, login } from "./auth";
import { authenticate } from "./middlewares";
import cookieParser from "cookie-parser";
import * as fs from "fs";
import * as path from "path";

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5001", // Replace with your front-end domain
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(cookieParser());
app.post("/register", register);
app.get("/getNameFromId", authenticate, (req, res) => {
  db.getNameFromId(req.body.id);
});
app.post("/login", login);
app.put("/updateProfileImage", upload.single("image"), (req, res) => {
  const email = req.body.email || "phy.ysf@gmail.com";
  //@ts-ignore
  const imageBuffer = req.file.buffer; // Using multer to handle the uploaded file

  if (!email || !imageBuffer) {
    return res.status(400).send("Email and image are required.");
  }

  db.db.users
    .update({ profileimage: imageBuffer }, { where: { email: email } })
    .then(() => {
      res.status(200).send("Profile image updated successfully");
    })
    .catch((error) => {
      console.error(
        "An error occurred while updating the profile image:",
        error
      );
      res
        .status(500)
        .send("An error occurred while updating the profile image.");
    });
});

app.get("/getProfileImage/:email", authenticate, (req, res) => {
  const email = req.params.email;

  db.db.users
    .findOne({ where: { email: email } })
    .then((user) => {
      if (user && user.profileimage) {
        res.set("Content-Type", "image/jpeg"); // Set the content type based on your image format
        res.send(user.profileimage);
      } else {
        res.status(404).send("Profile image not found");
      }
    })
    .catch((error) => {
      console.error(
        "An error occurred while retrieving the profile image:",
        error
      );
      res
        .status(500)
        .send("An error occurred while retrieving the profile image.");
    });
});

app.post("/getcalendar", authenticate, (req, res) => {
  try {
    db.getEventsByEmail(req.body.email).then((events) => {
      if (events) {
        res.json(events);
      }
    });
  } catch {
    res.status(400).send("Error retrieving calendar events");
  }
});

app.post("/updatecalendar", authenticate, (req, res) => {
  try {
    if (req.body.events.length != 0) {
      db.updateEventsByMail(req.body.email, req.body.events).then((events) => {
        if (events) {
          res.json(events);
        }
      });
    }
  } catch {
    res.status(400).send("Error retrieving calendar events");
  }
});

/**
 * API endpoint to interact with different tables in the database.
 * @param {string} table - The table name to interact with (e.g., "franchisors", "franchise_agreements", etc.).
 */
app.post("/:table", (req, res) => {
  const table = req.params.table;
  const newData = req.body;

  switch (table) {
    case "franchisors":
      db.createFranchisorInformation(newData)
        .then((franchisor) => {
          res.status(201).json({
            message: "Franchisor information created successfully",
            data: franchisor,
          });
        })
        .catch((err) => {
          console.error("Error creating franchisor:", err);
          res
            .status(500)
            .json({ message: "Error creating franchisor", error: err.message });
        });
      break;

    case "communication_history":
      db.getFranchisorIdByCompanyName(newData.values.company_name)
        .then((id) => {
          if (!id) {
            res.status(400).send("Invalid company name");
            return;
          }
          newData.values.franchisor_id = id;
          newData.values.franchisor_id = id;
          newData.values.contract_changes_agreed = true
            ? newData.values.contract_changes_agreed[0] == "on"
            : false;

          db.createCommunicationHistory(newData.values).then(
            (communication: any) => {
              res.status(201).json({
                message: "Communication history created successfully",
                data: communication,
              });
            }
          );
        })
        .catch((err: Error) => {
          console.error("Error creating communication history:", err);
          res.status(500).json({
            message: "Error creating communication history",
            error: err.message,
          });
        });
      break;

    case "performance_metrics":
      db.createPerformanceMetrics(newData)
        .then((metrics: any) => {
          res.status(201).json({
            message: "Performance metrics created successfully",
            data: metrics,
          });
        })
        .catch((err: Error) => {
          console.error("Error creating performance metrics:", err);
          res.status(500).json({
            message: "Error creating performance metrics",
            error: err.message,
          });
        });
      break;

    case "location_information":
      db.createLocationInformation(newData)
        .then((location: any) => {
          res.status(201).json({
            message: "Location information created successfully",
            data: location,
          });
        })
        .catch((err: Error) => {
          console.error("Error creating location information:", err);
          res.status(500).json({
            message: "Error creating location information",
            error: err.message,
          });
        });
      break;

    case "franchisee_support":
      db.createFranchiseeSupport(newData)
        .then((support: any) => {
          res.status(201).json({
            message: "Franchisee support created successfully",
            data: support,
          });
        })
        .catch((err: Error) => {
          console.error("Error creating franchisee support:", err);
          res.status(500).json({
            message: "Error creating franchisee support",
            error: err.message,
          });
        });
      break;

    case "expansion_plans":
      db.createExpansionPlans(newData)
        .then((plans: any) => {
          res.status(201).json({
            message: "Expansion plans created successfully",
            data: plans,
          });
        })
        .catch((err: Error) => {
          console.error("Error creating expansion plans:", err);
          res.status(500).json({
            message: "Error creating expansion plans",
            error: err.message,
          });
        });
      break;

    case "legal_and_compliance":
      db.createLegalAndCompliance(newData)
        .then((legal: any) => {
          res.status(201).json({
            message: "Legal and compliance information created successfully",
            data: legal,
          });
        })
        .catch((err: Error) => {
          console.error(
            "Error creating legal and compliance information:",
            err
          );
          res.status(500).json({
            message: "Error creating legal and compliance information",
            error: err.message,
          });
        });
      break;

    default:
      res.status(400).json({ message: "Invalid table name provided" });
  }
});

const getSequence: Array<Function> = [authenticate, getRequest];
/**
 * API endpoint to fetch all records from a specified table in the database.
 * @param {string} table - The table name to fetch records from.
 */
app.get("/:table", authenticate, getRequest);

/**
 * API endpoint to update a record in a specified table by ID.
 * @param {string} table - The table name to update the record in.
 * @param {number} id - The ID of the record to update.
 */
app.put("/:table/:id", (req, res) => {
  const table = req.params.table;
  const id: number = Number(req.params.id);
  const updatedData = req.body;

  switch (table) {
    case "franchisors":
      db.updateFranchisorInformation(id, updatedData)
        .then(() => {
          res.json({ message: "Franchisor information updated successfully" });
        })
        .catch((err) => {
          console.error("Error updating franchisor information:", err);
          res.status(500).json({
            message: "Error updating franchisor information",
            error: err.message,
          });
        });
      break;

    case "franchise_agreements":
      // Add similar CRUD operations for "franchise_agreements" table
      break;

    case "communication_history":
      // Add similar CRUD operations for "communication_history" table
      break;

    // Add cases for other tables here...

    default:
      res.status(400).json({ message: "Invalid table specified" });
  }
});

/**
 * API endpoint to delete a record from a specified table by ID.
 * @param {string} table - The table name to delete the record from.
 * @param {number} id - The ID of the record to delete.
 */
app.delete("/:table/:id", (req, res) => {
  const table = req.params.table;
  const id: number = Number(req.params.id);

  switch (table) {
    case "franchisors":
      db.deleteFranchisorInformation(id)
        .then(() => {
          res.json({ message: "Franchisor deleted successfully" });
        })
        .catch((err) => {
          console.error("Error deleting franchisor:", err);
          res
            .status(500)
            .json({ message: "Error deleting franchisor", error: err.message });
        });
      break;

    case "franchise_agreements":
      // Add similar CRUD operations for "franchise_agreements" table
      break;

    case "communication_history":
      // Add similar CRUD operations for "communication_history" table
      break;

    // Add cases for other tables here...

    default:
      res.status(400).json({ message: "Invalid table specified" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
