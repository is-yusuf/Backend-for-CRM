import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { communication_history, communication_historyId } from './communication_history';
import type { expansion_plans, expansion_plansId } from './expansion_plans';
import type { franchise_agreement_details, franchise_agreement_detailsId } from './franchise_agreement_details';
import type { franchisee_support, franchisee_supportId } from './franchisee_support';
import type { legal_and_compliance, legal_and_complianceId } from './legal_and_compliance';
import type { location_information, location_informationId } from './location_information';
import type { performance_metrics, performance_metricsId } from './performance_metrics';

export interface franchisor_informationAttributes {
  id: number;
  company_name: string;
  point_of_contact_name?: string;
  point_of_contact_position?: string;
  phone?: string;
  email?: string;
  office_address?: string;
  website_url?: string;
}

export type franchisor_informationPk = "id";
export type franchisor_informationId = franchisor_information[franchisor_informationPk];
export type franchisor_informationOptionalAttributes = "id" | "point_of_contact_name" | "point_of_contact_position" | "phone" | "email" | "office_address" | "website_url";
export type franchisor_informationCreationAttributes = Optional<franchisor_informationAttributes, franchisor_informationOptionalAttributes>;

export class franchisor_information extends Model<franchisor_informationAttributes, franchisor_informationCreationAttributes> implements franchisor_informationAttributes {
  id!: number;
  company_name!: string;
  point_of_contact_name?: string;
  point_of_contact_position?: string;
  phone?: string;
  email?: string;
  office_address?: string;
  website_url?: string;

  // franchisor_information hasMany communication_history via franchisor_id
  communication_histories!: communication_history[];
  getCommunication_histories!: Sequelize.HasManyGetAssociationsMixin<communication_history>;
  setCommunication_histories!: Sequelize.HasManySetAssociationsMixin<communication_history, communication_historyId>;
  addCommunication_history!: Sequelize.HasManyAddAssociationMixin<communication_history, communication_historyId>;
  addCommunication_histories!: Sequelize.HasManyAddAssociationsMixin<communication_history, communication_historyId>;
  createCommunication_history!: Sequelize.HasManyCreateAssociationMixin<communication_history>;
  removeCommunication_history!: Sequelize.HasManyRemoveAssociationMixin<communication_history, communication_historyId>;
  removeCommunication_histories!: Sequelize.HasManyRemoveAssociationsMixin<communication_history, communication_historyId>;
  hasCommunication_history!: Sequelize.HasManyHasAssociationMixin<communication_history, communication_historyId>;
  hasCommunication_histories!: Sequelize.HasManyHasAssociationsMixin<communication_history, communication_historyId>;
  countCommunication_histories!: Sequelize.HasManyCountAssociationsMixin;
  // franchisor_information hasMany expansion_plans via franchisor_id
  expansion_plans!: expansion_plans[];
  getExpansion_plans!: Sequelize.HasManyGetAssociationsMixin<expansion_plans>;
  setExpansion_plans!: Sequelize.HasManySetAssociationsMixin<expansion_plans, expansion_plansId>;
  addExpansion_plan!: Sequelize.HasManyAddAssociationMixin<expansion_plans, expansion_plansId>;
  addExpansion_plans!: Sequelize.HasManyAddAssociationsMixin<expansion_plans, expansion_plansId>;
  createExpansion_plan!: Sequelize.HasManyCreateAssociationMixin<expansion_plans>;
  removeExpansion_plan!: Sequelize.HasManyRemoveAssociationMixin<expansion_plans, expansion_plansId>;
  removeExpansion_plans!: Sequelize.HasManyRemoveAssociationsMixin<expansion_plans, expansion_plansId>;
  hasExpansion_plan!: Sequelize.HasManyHasAssociationMixin<expansion_plans, expansion_plansId>;
  hasExpansion_plans!: Sequelize.HasManyHasAssociationsMixin<expansion_plans, expansion_plansId>;
  countExpansion_plans!: Sequelize.HasManyCountAssociationsMixin;
  // franchisor_information hasMany franchise_agreement_details via franchisor_id
  franchise_agreement_details!: franchise_agreement_details[];
  getFranchise_agreement_details!: Sequelize.HasManyGetAssociationsMixin<franchise_agreement_details>;
  setFranchise_agreement_details!: Sequelize.HasManySetAssociationsMixin<franchise_agreement_details, franchise_agreement_detailsId>;
  addFranchise_agreement_detail!: Sequelize.HasManyAddAssociationMixin<franchise_agreement_details, franchise_agreement_detailsId>;
  addFranchise_agreement_details!: Sequelize.HasManyAddAssociationsMixin<franchise_agreement_details, franchise_agreement_detailsId>;
  createFranchise_agreement_detail!: Sequelize.HasManyCreateAssociationMixin<franchise_agreement_details>;
  removeFranchise_agreement_detail!: Sequelize.HasManyRemoveAssociationMixin<franchise_agreement_details, franchise_agreement_detailsId>;
  removeFranchise_agreement_details!: Sequelize.HasManyRemoveAssociationsMixin<franchise_agreement_details, franchise_agreement_detailsId>;
  hasFranchise_agreement_detail!: Sequelize.HasManyHasAssociationMixin<franchise_agreement_details, franchise_agreement_detailsId>;
  hasFranchise_agreement_details!: Sequelize.HasManyHasAssociationsMixin<franchise_agreement_details, franchise_agreement_detailsId>;
  countFranchise_agreement_details!: Sequelize.HasManyCountAssociationsMixin;
  // franchisor_information hasMany franchisee_support via franchisor_id
  franchisee_supports!: franchisee_support[];
  getFranchisee_supports!: Sequelize.HasManyGetAssociationsMixin<franchisee_support>;
  setFranchisee_supports!: Sequelize.HasManySetAssociationsMixin<franchisee_support, franchisee_supportId>;
  addFranchisee_support!: Sequelize.HasManyAddAssociationMixin<franchisee_support, franchisee_supportId>;
  addFranchisee_supports!: Sequelize.HasManyAddAssociationsMixin<franchisee_support, franchisee_supportId>;
  createFranchisee_support!: Sequelize.HasManyCreateAssociationMixin<franchisee_support>;
  removeFranchisee_support!: Sequelize.HasManyRemoveAssociationMixin<franchisee_support, franchisee_supportId>;
  removeFranchisee_supports!: Sequelize.HasManyRemoveAssociationsMixin<franchisee_support, franchisee_supportId>;
  hasFranchisee_support!: Sequelize.HasManyHasAssociationMixin<franchisee_support, franchisee_supportId>;
  hasFranchisee_supports!: Sequelize.HasManyHasAssociationsMixin<franchisee_support, franchisee_supportId>;
  countFranchisee_supports!: Sequelize.HasManyCountAssociationsMixin;
  // franchisor_information hasMany legal_and_compliance via franchisor_id
  legal_and_compliances!: legal_and_compliance[];
  getLegal_and_compliances!: Sequelize.HasManyGetAssociationsMixin<legal_and_compliance>;
  setLegal_and_compliances!: Sequelize.HasManySetAssociationsMixin<legal_and_compliance, legal_and_complianceId>;
  addLegal_and_compliance!: Sequelize.HasManyAddAssociationMixin<legal_and_compliance, legal_and_complianceId>;
  addLegal_and_compliances!: Sequelize.HasManyAddAssociationsMixin<legal_and_compliance, legal_and_complianceId>;
  createLegal_and_compliance!: Sequelize.HasManyCreateAssociationMixin<legal_and_compliance>;
  removeLegal_and_compliance!: Sequelize.HasManyRemoveAssociationMixin<legal_and_compliance, legal_and_complianceId>;
  removeLegal_and_compliances!: Sequelize.HasManyRemoveAssociationsMixin<legal_and_compliance, legal_and_complianceId>;
  hasLegal_and_compliance!: Sequelize.HasManyHasAssociationMixin<legal_and_compliance, legal_and_complianceId>;
  hasLegal_and_compliances!: Sequelize.HasManyHasAssociationsMixin<legal_and_compliance, legal_and_complianceId>;
  countLegal_and_compliances!: Sequelize.HasManyCountAssociationsMixin;
  // franchisor_information hasMany location_information via franchisor_id
  location_informations!: location_information[];
  getLocation_informations!: Sequelize.HasManyGetAssociationsMixin<location_information>;
  setLocation_informations!: Sequelize.HasManySetAssociationsMixin<location_information, location_informationId>;
  addLocation_information!: Sequelize.HasManyAddAssociationMixin<location_information, location_informationId>;
  addLocation_informations!: Sequelize.HasManyAddAssociationsMixin<location_information, location_informationId>;
  createLocation_information!: Sequelize.HasManyCreateAssociationMixin<location_information>;
  removeLocation_information!: Sequelize.HasManyRemoveAssociationMixin<location_information, location_informationId>;
  removeLocation_informations!: Sequelize.HasManyRemoveAssociationsMixin<location_information, location_informationId>;
  hasLocation_information!: Sequelize.HasManyHasAssociationMixin<location_information, location_informationId>;
  hasLocation_informations!: Sequelize.HasManyHasAssociationsMixin<location_information, location_informationId>;
  countLocation_informations!: Sequelize.HasManyCountAssociationsMixin;
  // franchisor_information hasMany performance_metrics via franchisor_id
  performance_metrics!: performance_metrics[];
  getPerformance_metrics!: Sequelize.HasManyGetAssociationsMixin<performance_metrics>;
  setPerformance_metrics!: Sequelize.HasManySetAssociationsMixin<performance_metrics, performance_metricsId>;
  addPerformance_metric!: Sequelize.HasManyAddAssociationMixin<performance_metrics, performance_metricsId>;
  addPerformance_metrics!: Sequelize.HasManyAddAssociationsMixin<performance_metrics, performance_metricsId>;
  createPerformance_metric!: Sequelize.HasManyCreateAssociationMixin<performance_metrics>;
  removePerformance_metric!: Sequelize.HasManyRemoveAssociationMixin<performance_metrics, performance_metricsId>;
  removePerformance_metrics!: Sequelize.HasManyRemoveAssociationsMixin<performance_metrics, performance_metricsId>;
  hasPerformance_metric!: Sequelize.HasManyHasAssociationMixin<performance_metrics, performance_metricsId>;
  hasPerformance_metrics!: Sequelize.HasManyHasAssociationsMixin<performance_metrics, performance_metricsId>;
  countPerformance_metrics!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof franchisor_information {
    return franchisor_information.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    point_of_contact_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    point_of_contact_position: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    office_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    website_url: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'franchisor_information',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "franchisor_information_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
