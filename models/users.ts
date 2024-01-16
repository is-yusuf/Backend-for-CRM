import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface usersAttributes {
  id: number;
  email: string;
  hashedpassword: string;
  username?: string;
  accesslevel?: string;
  calendarevents?: object[];
  profileimage?: any;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "username" | "accesslevel" | "calendarevents" | "profileimage";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  email!: string;
  hashedpassword!: string;
  username?: string;
  accesslevel?: string;
  calendarevents?: object[];
  profileimage?: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_username_key"
    },
    hashedpassword: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    accesslevel: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    calendarevents: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true
    },
    profileimage: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "users_username_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
