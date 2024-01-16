import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { franchisor_information, franchisor_informationId } from './franchisor_information';

export interface performance_metricsAttributes {
  id: number;
  franchisor_id: number;
  number_of_units?: number;
  total_revenue?: number;
  total_profit?: number;
  average_unit_volume?: number;
  franchisee_satisfaction_score?: number;
}

export type performance_metricsPk = "id";
export type performance_metricsId = performance_metrics[performance_metricsPk];
export type performance_metricsOptionalAttributes = "id" | "number_of_units" | "total_revenue" | "total_profit" | "average_unit_volume" | "franchisee_satisfaction_score";
export type performance_metricsCreationAttributes = Optional<performance_metricsAttributes, performance_metricsOptionalAttributes>;

export class performance_metrics extends Model<performance_metricsAttributes, performance_metricsCreationAttributes> implements performance_metricsAttributes {
  id!: number;
  franchisor_id!: number;
  number_of_units?: number;
  total_revenue?: number;
  total_profit?: number;
  average_unit_volume?: number;
  franchisee_satisfaction_score?: number;

  // performance_metrics belongsTo franchisor_information via franchisor_id
  franchisor!: franchisor_information;
  getFranchisor!: Sequelize.BelongsToGetAssociationMixin<franchisor_information>;
  setFranchisor!: Sequelize.BelongsToSetAssociationMixin<franchisor_information, franchisor_informationId>;
  createFranchisor!: Sequelize.BelongsToCreateAssociationMixin<franchisor_information>;

  static initModel(sequelize: Sequelize.Sequelize): typeof performance_metrics {
    return performance_metrics.init({
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
    number_of_units: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_revenue: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total_profit: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    average_unit_volume: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    franchisee_satisfaction_score: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'performance_metrics',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "performance_metrics_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
