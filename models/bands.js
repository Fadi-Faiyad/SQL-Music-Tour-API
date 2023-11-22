'use strict';
// DEPENDENCIES
const { Model } = require('sequelize');
const setTime = require('../migrations/set-time');

// MODEL
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    
    


    static associate({ MeetGreet, SetTime }) {
      // define association here
      Band.hasMany(MeetGreet, {
        foreignKey: "band_id",
        as: 'meet_greets'
      }),
      Band.hasMany(SetTime, {
        foreignKey: "band_id",
        as: 'set_times'
      })
    }
  }

  Band.init({
    band_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    available_start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Band',
    tableName: 'bands',
    timestamps: false
  });

  return Band;
};

