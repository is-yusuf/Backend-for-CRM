import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { franchisor_information, franchisor_informationId } from './franchisor_information';

export interface location_informationAttributes {
  id: number;
  franchisor_id: number;
  geographic_markets?: string[];
  outlet_locations?: string[];
}

export type location_informationPk = "id";
export type location_informationId = location_information[location_informationPk];
export type location_informationOptionalAttributes = "id" | "geographic_markets" | "outlet_locations";
export type location_informationCreationAttributes = Optional<location_informationAttributes, location_informationOptionalAttributes>;

export class location_information extends Model<location_informationAttributes, location_informationCreationAttributes> implements location_informationAttributes {
  id!: number;
  franchisor_id!: number;
  geographic_markets?: string[];
  outlet_locations?: string[];

  // location_information belongsTo franchisor_information via franchisor_id
  franchisor!: franchisor_information;
  getFranchisor!: Sequelize.BelongsToGetAssociationMixin<franchisor_information>;
  setFranchisor!: Sequelize.BelongsToSetAssociationMixin<franchisor_information, franchisor_informationId>;
  createFranchisor!: Sequelize.BelongsToCreateAssociationMixin<franchisor_information>;

  static initModel(sequelize: Sequelize.Sequelize): typeof location_information {
    return location_information.init({
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
    geographic_markets: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    outlet_locations: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'location_information',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "location_information_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
