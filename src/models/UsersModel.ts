import { DataTypes } from 'sequelize'
import db from '../db'

const UsersModel = db.define('contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

UsersModel.sync({ alter: true })

export default UsersModel
