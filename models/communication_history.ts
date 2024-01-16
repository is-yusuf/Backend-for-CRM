import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { franchisor_information, franchisor_informationId } from './franchisor_information';

export interface communication_historyAttributes {
  id: number;
  franchisor_id: number;
  communication_date?: string;
  communication_summary?: string;
  issues_raised?: string;
  resolutions?: string;
  contract_changes_agreed?: boolean;
  company_name?: string;
}

export type communication_historyPk = "id";
export type communication_historyId = communication_history[communication_historyPk];
export type communication_historyOptionalAttributes = "id" | "communication_date" | "communication_summary" | "issues_raised" | "resolutions" | "contract_changes_agreed" | "company_name";
export type communication_historyCreationAttributes = Optional<communication_historyAttributes, communication_historyOptionalAttributes>;

export class communication_history extends Model<communication_historyAttributes, communication_historyCreationAttributes> implements communication_historyAttributes {
  id!: number;
  franchisor_id!: number;
  communication_date?: string;
  communication_summary?: string;
  issues_raised?: string;
  resolutions?: string;
  contract_changes_agreed?: boolean;
  company_name?: string;

  // communication_history belongsTo franchisor_information via franchisor_id
  franchisor!: franchisor_information;
  getFranchisor!: Sequelize.BelongsToGetAssociationMixin<franchisor_information>;
  setFranchisor!: Sequelize.BelongsToSetAssociationMixin<franchisor_information, franchisor_informationId>;
  createFranchisor!: Sequelize.BelongsToCreateAssociationMixin<franchisor_information>;

  static initModel(sequelize: Sequelize.Sequelize): typeof communication_history {
    return communication_history.init({
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
    communication_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    communication_summary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    issues_raised: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resolutions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contract_changes_agreed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    company_name: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'communication_history',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "communication_history_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
