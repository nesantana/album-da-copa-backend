import { DataTypes } from 'sequelize'
import db from '../db'

const StickersModel = db.define('stickers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  countries: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
})

StickersModel.sync({ alter: true })

export default StickersModel
