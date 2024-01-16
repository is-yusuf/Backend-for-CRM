import dotenv from "dotenv";
dotenv.config();

import {
  communication_history,
  expansion_plans,
  franchisee_support,
  franchisor_information,
  initModels,
  legal_and_compliance,
  location_information,
  performance_metrics,
} from "./models/init-models";
// import db from './models';
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const apiKey = process.env.API_KEY;
const dbname = process.env.DB_NAME;
const dbDialect = process.env.DB_DIALECT;

import { Sequelize, where, Model } from "sequelize";
var sequelize: Sequelize = new Sequelize({
  database: dbname,
  username: dbUser,
  password: dbPass,
  host: dbHost,
  dialect: dbDialect,
  logging: false,
});
var db = initModels(sequelize);
/**
 * Creates a new franchisor information record in the database.
 * @param {Object} franchisor_information - Object containing franchisor information data.
 * @returns {Promise} - Resolves with the newly created franchisor information object.
 * @throws {Error} - If there's an error creating the record.
 */
async function createFranchisorInformation(data: franchisor_information) {
  return db.franchisor_information.create(data);
}

/**
 * Retrieves agreement details records from the database.
 * @param {Object} where - (Optional) The WHERE clause to filter the records.
 * @returns {Promise} - Resolves with an array of performance metrics objects.
 * @throws {Error} - If there's an error fetching the records.
 */
async function getFranchisorAgreement(where?: any) {
  if (
    where &&
    (await isValidWhereClause(where, "franchise_agreement_details", sequelize))
  ) {
    return db.franchise_agreement_details.findAll({ where });
  } else {
    return db.franchise_agreement_details.findAll();
  }
}
/**
 * Retrieves performance metrics records from the database.
 * @param {Object} where - (Optional) The WHERE clause to filter the records.
 * @returns {Promise} - Resolves with an array of performance metrics objects.
 * @throws {Error} - If there's an error fetching the records.
 */
async function getPerformanceMetrics(where?: any) {
  if (
    where &&
    (await isValidWhereClause(where, "performance_metrics", sequelize))
  ) {
    return db.performance_metrics.findAll({ where });
  } else {
    return db.performance_metrics.findAll();
  }
}

/**
 * Retrieves location information records from the database.
 * @param {Object} where - (Optional) The WHERE clause to filter the records.
 * @returns {Promise} - Resolves with an array of location information objects.
 * @throws {Error} - If there's an error fetching the records.
 */
async function getLocationInformation(where?: any) {
  if (
    where &&
    (await isValidWhereClause(where, "location_information", sequelize))
  ) {
    return db.location_information.findAll({ where });
  } else {
    return db.location_information.findAll();
  }
}

/**
 * Retrieves legal and compliance records from the database.
 * @param {Object} where - (Optional) The WHERE clause to filter the records.
 * @returns {Promise} - Resolves with an array of legal and compliance objects.
 * @throws {Error} - If there's an error fetching the records.
 */
async function getLegalAndCompliance(where?: any) {
  const query = `
  SELECT legal_and_compliance.*, franchisor_information.company_name
  FROM legal_and_compliance
  JOIN franchisor_information
  ON legal_and_compliance.franchisor_id = franchisor_information.id;
`;

  const results = await sequelize.query(query);

  return results[0];
}

/**
 * Retrieves franchise support records from the database.
 * @param {Object} where - (Optional) The WHERE clause to filter the records.
 * @returns {Promise} - Resolves with an array of franchise support objects.
 * @throws {Error} - If there's an error fetching the records.
 */
async function getFranchiseSupport(where?: any) {
  if (
    where &&
    (await isValidWhereClause(where, "franchise_support", sequelize))
  ) {
    return db.franchisee_support.findAll({ where });
  } else {
    return db.franchisee_support.findAll();
  }
}

/**
 * Retrieves franchisor information records from the database.
 * @param {Object} where - (Optional) The WHERE clause to filter the records.
 * @returns {Promise} - Resolves with an array of franchisor information objects.
 * @throws {Error} - If there's an error fetching the records.
 */
async function getAllFranchisorInformation(where?: any) {
  // TODO CHECK IF THAT WORKS
  if (
    where &&
    (await isValidWhereClause(where, "franchisor_information", sequelize))
  ) {
    return db.franchisor_information.findAll({ where });
  } else {
    return db.franchisor_information.findAll();
  }
}

/**
 * Retrieves Communication information records from the database.
 * @param {Object} where - (Optional) The WHERE clause to filter the records.
 * @returns {Promise} - Resolves with an array of franchisor information objects.
 * @throws {Error} - If there's an error fetching the records.
 */
async function getAllCommunicationHistory(where?: any) {
  // TODO CHECK IF THAT WORKS
  if (
    where &&
    (await isValidWhereClause(where, "communication_history", sequelize))
  ) {
    return db.franchisor_information.findAll({ where });
  } else {
    return db.communication_history.findAll();
  }
}

/**
 * Checks if every key in the where clause exists in the column names of the specified table.
 * @param {Object} where - The WHERE clause to validate.
 * @param {string} tableName - The name of the table to check the column names against.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {boolean} - Returns true if all keys in the where clause exist in the column names of the table; otherwise, returns false.
 */
async function isValidWhereClause<T extends Model<any, any>>(
  where: object,
  tableName: string,
  sequelize: Sequelize
): Promise<boolean> {
  try {
    // Get the column names of the specified table
    const model = sequelize.model(tableName);
    const tableColumns = Object.keys(await model.describe());

    // Check if each key in the where clause exists in the column names of the table
    for (const key of Object.keys(where)) {
      if (!tableColumns.includes(key)) {
        return false;
      }
    }

    // All keys in the where clause exist in the column names of the table
    return true;
  } catch (error) {
    console.error("Error checking valid where clause:", error);
    throw error;
  }
}

/**
 * Updates a franchisor information record in the database.
 * @param {number} id - The ID of the franchisor information record to update.
 * @param {Object} data - Object containing updated franchisor information data.
 * @returns {Promise} - Resolves when the record is updated successfully.
 * @throws {Error} - If there's an error updating the record.
 */
async function updateFranchisorInformation(id: number, data: Object) {
  await db.franchisor_information.update(data, { where: { id } });
}

/**
 * Deletes a franchisor information record from the database.
 * @param {number} id - The ID of the franchisor information record to delete.
 * @returns {Promise} - Resolves when the record is deleted successfully.
 * @throws {Error} - If there's an error deleting the record.
 */
async function deleteFranchisorInformation(id: number) {
  await db.franchisor_information.destroy({ where: { id } });
}

/**
 * Creates a new communication history record in the database.
 * @param {Object} communication_history - Object containing communication history data.
 * @returns {Promise} - Resolves with the newly created communication history object.
 * @throws {Error} - If there's an error creating the record.
 */
async function createCommunicationHistory(data: communication_history) {
  return db.communication_history.create(data);
}

/**
 * Creates a new performance metrics record in the database.
 * @param {Object} PerformanceMetrics - Object containing performance metrics data.
 * @returns {Promise} - Resolves with the newly created performance metrics object.
 * @throws {Error} - If there's an error creating the record.
 */
async function createPerformanceMetrics(data: performance_metrics) {
  return db.performance_metrics.create(data);
}

/**
 * Creates a new franchisee support record in the database.
 * @param {Object} franchisee_support - Object containing franchisee support data.
 * @returns {Promise} - Resolves with the newly created franchisee support object.
 * @throws {Error} - If there's an error creating the record.
 */
async function createFranchiseeSupport(data: franchisee_support) {
  return db.franchisee_support.create(data);
}

/**
 * Creates a new legal and compliance record in the database.
 * @param {Object} legalAndCompliance - Object containing legal and compliance data.
 * @returns {Promise} - Resolves with the newly created legal and compliance object.
 * @throws {Error} - If there's an error creating the record.
 */
async function createLegalAndCompliance(data: legal_and_compliance) {
  return db.legal_and_compliance.create(data);
}

/**
 * Creates a new location information record in the database.
 * @param {Object} location_information - Object containing location information data.
 * @returns {Promise} - Resolves with the newly created location information object.
 * @throws {Error} - If there's an error creating the record.
 */
async function createLocationInformation(data: location_information) {
  return db.location_information.create(data);
}

/**
 * Retrieves expansion plans records from the database.
 * @param {Object} where - (Optional) The WHERE clause to filter the records.
 * @returns {Promise} - Resolves with an array of expansion plans objects.
 * @throws {Error} - If there's an error fetching the records.
 */
async function getExpansionPlans(where?: any) {
  const query = `
  SELECT expansion_plans.*, franchisor_information.company_name
  FROM expansion_plans
  JOIN franchisor_information
  ON expansion_plans.franchisor_id = franchisor_information.id;
`;

  const results = await sequelize.query(query);

  return results[0];
}

/**
 * Updates an expansion plans record in the database.
 * @param {number} id - The ID of the expansion plans record to update.
 * @param {Object} data - Object containing updated expansion plans data.
 * @returns {Promise} - Resolves when the record is updated successfully.
 * @throws {Error} - If there's an error updating the record.
 */
async function updateExpansionPlans(id: number, data: Object) {
  await db.expansion_plans.update(data, { where: { id } });
}

/**
 * Deletes an expansion plans record from the database.
 * @param {number} id - The ID of the expansion plans record to delete.
 * @returns {Promise} - Resolves when the record is deleted successfully.
 * @throws {Error} - If there's an error deleting the record.
 */
async function deleteExpansionPlans(id: number) {
  await db.expansion_plans.destroy({ where: { id } });
}

/**
 * Creates a new expansion plans record in the database.
 * @param {Object} expansion_plans - Object containing expansion plans data.
 * @returns {Promise} - Resolves with the newly created expansion plans object.
 * @throws {Error} - If there's an error creating the record.
 */
async function createExpansionPlans(data: {
  franchisor_id: number;
  planned_new_locations: string[];
  growth_strategy: string;
}) {
  return db.expansion_plans.create(data);
}

async function getFranchisorIdByCompanyName(companyName: string) {
  try {
    const franchisor = await franchisor_information.findOne({
      where: { company_name: companyName },
    });

    if (!franchisor) {
      // Handle the case where the company_name is not found
      throw new Error("Company not found");
    }

    return franchisor.id; // Return the franchisor_id
  } catch (error) {
    return null;
  }
}

async function getEventsByEmail(email: string): Promise<any> {
  const user = await db.users.findOne({ where: { email: email } });
  return user ? user.dataValues.calendarevents : null;
}

async function updateEventsByMail(email: string, events: object): Promise<any> {
  const user = await db.users.findOne({ where: { email: email } });
  if (user) {
    // Update the specific field with new events
    // console.log(user.calendarevents);
    await user.update({ calendarevents: [events] });
    user.save();
    // console.log("after:   ");

    // console.log(user.calendarevents);

    return true;
  }
  return false; // Return false if no user is found for the given email
}

/**
 * Retrieves the company name from the franchisor_information table using the given ID.
 *
 * @param {number} id - The ID of the company in the franchisor_information table.
 * @returns {Promise<string|null>} The company name if found, or null if not found.
 * @throws {Error} If there is an issue with the database query.
 */
async function getNameFromId(id: number): Promise<string | null> {
  if (!id) {
    return null;
  }
  try {
    const company = await db.franchisor_information.findOne({
      where: { id: id },
    });
    return company ? company["company_name"] : null;
  } catch (error) {
    console.error("Error fetching company name:", error);
    throw new Error("Failed to retrieve company name from ID");
  }
}
const dbInterface = {
  getExpansionPlans,
  getAllFranchisorInformation,
  getAllCommunicationHistory,
  getPerformanceMetrics,
  getLocationInformation,
  getLegalAndCompliance,
  getFranchiseSupport,
  getFranchisorAgreement,

  createFranchisorInformation,
  createCommunicationHistory,
  createPerformanceMetrics,
  createLocationInformation,
  createFranchiseeSupport,
  createExpansionPlans,
  createLegalAndCompliance,

  updateFranchisorInformation,
  deleteFranchisorInformation,
  db,
  getFranchisorIdByCompanyName,
  getEventsByEmail,
  updateEventsByMail,
  getNameFromId,

  // Add functions for other tables here...
};

export default dbInterface;
