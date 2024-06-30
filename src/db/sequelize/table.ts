import {
    Materials
  } from '../../models/index';
  
  import { DataTypes, Model, Optional, CreationOptional, NOW, ModelDefined } from 'sequelize';
  import { getDb, getDataTypesChaining as _ } from '../sequelize/index';
  
  const defaultSetting = {
    underscored: true,
  };
  const baseEntity = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    created_at: DataTypes.NOW,
    updated_at: _(DataTypes.DATE).isNullable().withDefault(null),
    deleted_at: _(DataTypes.DATE).isNullable().withDefault(null)
  }  
  
  export const MaterialsTable = getDb().define<Model<Materials>>('materials', {
    ...baseEntity,
    name: _(DataTypes.STRING),
    category :  _(DataTypes.STRING),
    price : _(DataTypes.STRING),
    stock : _(DataTypes.INTEGER),
    description : _(DataTypes.STRING),
    unit : _(DataTypes.STRING),
    unit_count : _(DataTypes.INTEGER)
  }, {...defaultSetting, freezeTableName: true})
  
