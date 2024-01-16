import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { franchisor_information, franchisor_informationId } from './franchisor_information';

export interface expansion_plansAttributes {
  id: number;
  franchisor_id: number;
  planned_new_locations?: string[];
  growth_strategy?: string;
}

export type expansion_plansPk = "id";
export type expansion_plansId = expansion_plans[expansion_plansPk];
export type expansion_plansOptionalAttributes = "id" | "planned_new_locations" | "growth_strategy";
export type expansion_plansCreationAttributes = Optional<expansion_plansAttributes, expansion_plansOptionalAttributes>;

export class expansion_plans extends Model<expansion_plansAttributes, expansion_plansCreationAttributes> implements expansion_plansAttributes {
  id!: number;
  franchisor_id!: number;
  planned_new_locations?: string[];
  growth_strategy?: string;

  // expansion_plans belongsTo franchisor_information via franchisor_id
  franchisor!: franchisor_information;
  getFranchisor!: Sequelize.BelongsToGetAssociationMixin<franchisor_information>;
  setFranchisor!: Sequelize.BelongsToSetAssociationMixin<franchisor_information, franchisor_informationId>;
  createFranchisor!: Sequelize.BelongsToCreateAssociationMixin<franchisor_information>;

  static initModel(sequelize: Sequelize.Sequelize): typeof expansion_plans {
    return expansion_plans.init({
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
    planned_new_locations: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    growth_strategy: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'expansion_plans',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "expansion_plans_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
