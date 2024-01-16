import { Request, Response } from "express"; // Assuming you're using Express.js
import db from "./db";

export const getRequest = (req: Request, res: Response): void => {
  const table = req.params.table;

  const tableActions: Record<string, () => Promise<any>> = {
    franchisors: db.getAllFranchisorInformation,
    franchise_agreements: db.getFranchisorAgreement,
    communication_history: db.getAllCommunicationHistory,
    performance: db.getPerformanceMetrics,
    legal_and_compliance: db.getLegalAndCompliance,
    expansion_plans: db.getExpansionPlans,
  };

  if (!tableActions[table]) {
    res.status(400).json({ message: "Invalid table specified" });
    return;
  }

  tableActions[table]()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(`Error fetching ${table}:`, err);
      res.status(500).json({
        message: `Error fetching ${table}`,
        error: err.message,
      });
    });
};
