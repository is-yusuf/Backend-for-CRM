import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { franchisor_information, franchisor_informationId } from './franchisor_information';

export interface legal_and_complianceAttributes {
  id: number;
  franchisor_id: number;
  legal_issues_records?: string;
  industry_compliance?: string;
}

export type legal_and_compliancePk = "id";
export type legal_and_complianceId = legal_and_compliance[legal_and_compliancePk];
export type legal_and_complianceOptionalAttributes = "id" | "legal_issues_records" | "industry_compliance";
export type legal_and_complianceCreationAttributes = Optional<legal_and_complianceAttributes, legal_and_complianceOptionalAttributes>;

export class legal_and_compliance extends Model<legal_and_complianceAttributes, legal_and_complianceCreationAttributes> implements legal_and_complianceAttributes {
  id!: number;
  franchisor_id!: number;
  legal_issues_records?: string;
  industry_compliance?: string;

  // legal_and_compliance belongsTo franchisor_information via franchisor_id
  franchisor!: franchisor_information;
  getFranchisor!: Sequelize.BelongsToGetAssociationMixin<franchisor_information>;
  setFranchisor!: Sequelize.BelongsToSetAssociationMixin<franchisor_information, franchisor_informationId>;
  createFranchisor!: Sequelize.BelongsToCreateAssociationMixin<franchisor_information>;

  static initModel(sequelize: Sequelize.Sequelize): typeof legal_and_compliance {
    return legal_and_compliance.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    franchisor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'franchisor_information',
        key: 'id'
      }
    },
    legal_issues_records: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    industry_compliance: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'legal_and_compliance',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "legal_and_compliance_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
