const Sequelize = require('sequelize');
const db = require('../db');

const DriveStats = db.define('driveStats', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  nypd: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  nypdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nppd: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  nppdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ndsr: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  ndsrRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  oypd: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  oypdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  oppd: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  oppdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  odsr: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  odsrRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dypd: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  dypdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dppd: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  dppdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ddsr: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  ddsrRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ntopd: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  ntopdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nlospd: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  nlospdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ntoppd: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ntoppdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  otoppd: {
    type: Sequelize.STRING,
    allowNull: false
  },
  otoppdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  olospd: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  olospdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dtopd: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dtopdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dlospd: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dlospdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dtoppd: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dtoppdRank: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = DriveStats;
