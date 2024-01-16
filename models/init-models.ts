import type { Sequelize } from "sequelize";
import { communication_history as _communication_history } from "./communication_history";
import type { communication_historyAttributes, communication_historyCreationAttributes } from "./communication_history";
import { expansion_plans as _expansion_plans } from "./expansion_plans";
import type { expansion_plansAttributes, expansion_plansCreationAttributes } from "./expansion_plans";
import { franchise_agreement_details as _franchise_agreement_details } from "./franchise_agreement_details";
import type { franchise_agreement_detailsAttributes, franchise_agreement_detailsCreationAttributes } from "./franchise_agreement_details";
import { franchisee_support as _franchisee_support } from "./franchisee_support";
import type { franchisee_supportAttributes, franchisee_supportCreationAttributes } from "./franchisee_support";
import { franchisor_information as _franchisor_information } from "./franchisor_information";
import type { franchisor_informationAttributes, franchisor_informationCreationAttributes } from "./franchisor_information";
import { legal_and_compliance as _legal_and_compliance } from "./legal_and_compliance";
import type { legal_and_complianceAttributes, legal_and_complianceCreationAttributes } from "./legal_and_compliance";
import { location_information as _location_information } from "./location_information";
import type { location_informationAttributes, location_informationCreationAttributes } from "./location_information";
import { performance_metrics as _performance_metrics } from "./performance_metrics";
import type { performance_metricsAttributes, performance_metricsCreationAttributes } from "./performance_metrics";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _communication_history as communication_history,
  _expansion_plans as expansion_plans,
  _franchise_agreement_details as franchise_agreement_details,
  _franchisee_support as franchisee_support,
  _franchisor_information as franchisor_information,
  _legal_and_compliance as legal_and_compliance,
  _location_information as location_information,
  _performance_metrics as performance_metrics,
  _users as users,
};

export type {
  communication_historyAttributes,
  communication_historyCreationAttributes,
  expansion_plansAttributes,
  expansion_plansCreationAttributes,
  franchise_agreement_detailsAttributes,
  franchise_agreement_detailsCreationAttributes,
  franchisee_supportAttributes,
  franchisee_supportCreationAttributes,
  franchisor_informationAttributes,
  franchisor_informationCreationAttributes,
  legal_and_complianceAttributes,
  legal_and_complianceCreationAttributes,
  location_informationAttributes,
  location_informationCreationAttributes,
  performance_metricsAttributes,
  performance_metricsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const communication_history = _communication_history.initModel(sequelize);
  const expansion_plans = _expansion_plans.initModel(sequelize);
  const franchise_agreement_details = _franchise_agreement_details.initModel(sequelize);
  const franchisee_support = _franchisee_support.initModel(sequelize);
  const franchisor_information = _franchisor_information.initModel(sequelize);
  const legal_and_compliance = _legal_and_compliance.initModel(sequelize);
  const location_information = _location_information.initModel(sequelize);
  const performance_metrics = _performance_metrics.initModel(sequelize);
  const users = _users.initModel(sequelize);

  communication_history.belongsTo(franchisor_information, { as: "franchisor", foreignKey: "franchisor_id"});
  franchisor_information.hasMany(communication_history, { as: "communication_histories", foreignKey: "franchisor_id"});
  expansion_plans.belongsTo(franchisor_information, { as: "franchisor", foreignKey: "franchisor_id"});
  franchisor_information.hasMany(expansion_plans, { as: "expansion_plans", foreignKey: "franchisor_id"});
  franchise_agreement_details.belongsTo(franchisor_information, { as: "franchisor", foreignKey: "franchisor_id"});
  franchisor_information.hasMany(franchise_agreement_details, { as: "franchise_agreement_details", foreignKey: "franchisor_id"});
  franchisee_support.belongsTo(franchisor_information, { as: "franchisor", foreignKey: "franchisor_id"});
  franchisor_information.hasMany(franchisee_support, { as: "franchisee_supports", foreignKey: "franchisor_id"});
  legal_and_compliance.belongsTo(franchisor_information, { as: "franchisor", foreignKey: "franchisor_id"});
  franchisor_information.hasMany(legal_and_compliance, { as: "legal_and_compliances", foreignKey: "franchisor_id"});
  location_information.belongsTo(franchisor_information, { as: "franchisor", foreignKey: "franchisor_id"});
  franchisor_information.hasMany(location_information, { as: "location_informations", foreignKey: "franchisor_id"});
  performance_metrics.belongsTo(franchisor_information, { as: "franchisor", foreignKey: "franchisor_id"});
  franchisor_information.hasMany(performance_metrics, { as: "performance_metrics", foreignKey: "franchisor_id"});

  return {
    communication_history: communication_history,
    expansion_plans: expansion_plans,
    franchise_agreement_details: franchise_agreement_details,
    franchisee_support: franchisee_support,
    franchisor_information: franchisor_information,
    legal_and_compliance: legal_and_compliance,
    location_information: location_information,
    performance_metrics: performance_metrics,
    users: users,
  };
}
