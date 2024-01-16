import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { franchisor_information, franchisor_informationId } from './franchisor_information';

export interface franchisee_supportAttributes {
  id: number;
  franchisor_id: number;
  training_programs_offered?: string;
  marketing_support?: string;
  advertising_support?: string;
  supply_chain_assistance?: string;
}

export type franchisee_supportPk = "id";
export type franchisee_supportId = franchisee_support[franchisee_supportPk];
export type franchisee_supportOptionalAttributes = "id" | "training_programs_offered" | "marketing_support" | "advertising_support" | "supply_chain_assistance";
export type franchisee_supportCreationAttributes = Optional<franchisee_supportAttributes, franchisee_supportOptionalAttributes>;

export class franchisee_support extends Model<franchisee_supportAttributes, franchisee_supportCreationAttributes> implements franchisee_supportAttributes {
  id!: number;
  franchisor_id!: number;
  training_programs_offered?: string;
  marketing_support?: string;
  advertising_support?: string;
  supply_chain_assistance?: string;

  // franchisee_support belongsTo franchisor_information via franchisor_id
  franchisor!: franchisor_information;
  getFranchisor!: Sequelize.BelongsToGetAssociationMixin<franchisor_information>;
  setFranchisor!: Sequelize.BelongsToSetAssociationMixin<franchisor_information, franchisor_informationId>;
  createFranchisor!: Sequelize.BelongsToCreateAssociationMixin<franchisor_information>;

  static initModel(sequelize: Sequelize.Sequelize): typeof franchisee_support {
    return franchisee_support.init({
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
    training_programs_offered: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    marketing_support: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    advertising_support: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    supply_chain_assistance: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'franchisee_support',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "franchisee_support_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
