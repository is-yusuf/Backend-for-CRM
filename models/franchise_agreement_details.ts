import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { franchisor_information, franchisor_informationId } from './franchisor_information';

export interface franchise_agreement_detailsAttributes {
  id: number;
  franchisor_id: number;
  start_date?: string;
  end_date?: string;
  franchise_fee?: number;
  royalty_fee?: number;
  advertising_fee?: number;
  contractual_obligations?: string;
}

export type franchise_agreement_detailsPk = "id";
export type franchise_agreement_detailsId = franchise_agreement_details[franchise_agreement_detailsPk];
export type franchise_agreement_detailsOptionalAttributes = "id" | "start_date" | "end_date" | "franchise_fee" | "royalty_fee" | "advertising_fee" | "contractual_obligations";
export type franchise_agreement_detailsCreationAttributes = Optional<franchise_agreement_detailsAttributes, franchise_agreement_detailsOptionalAttributes>;

export class franchise_agreement_details extends Model<franchise_agreement_detailsAttributes, franchise_agreement_detailsCreationAttributes> implements franchise_agreement_detailsAttributes {
  id!: number;
  franchisor_id!: number;
  start_date?: string;
  end_date?: string;
  franchise_fee?: number;
  royalty_fee?: number;
  advertising_fee?: number;
  contractual_obligations?: string;

  // franchise_agreement_details belongsTo franchisor_information via franchisor_id
  franchisor!: franchisor_information;
  getFranchisor!: Sequelize.BelongsToGetAssociationMixin<franchisor_information>;
  setFranchisor!: Sequelize.BelongsToSetAssociationMixin<franchisor_information, franchisor_informationId>;
  createFranchisor!: Sequelize.BelongsToCreateAssociationMixin<franchisor_information>;

  static initModel(sequelize: Sequelize.Sequelize): typeof franchise_agreement_details {
    return franchise_agreement_details.init({
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
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    franchise_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    royalty_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    advertising_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    contractual_obligations: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'franchise_agreement_details',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "franchise_agreement_details_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
