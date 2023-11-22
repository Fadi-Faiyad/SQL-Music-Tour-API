'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set_Time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Event, Stage } ) {
      // define association here
      Set_Time.belongsTo(Band, {
        foreignKey: 'band_id',
        as: 'band',
      }),
      Set_Time.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'event'
      })
      Set_Time.belongsTo(Stage, {
        foreignKey: 'stage_id',
        as:'stage'
      })
    }
  }
  Set_Time.init({
    event_id: DataTypes.SMALLINT,
    stage_id: DataTypes.SMALLINT,
    band_id: DataTypes.SMALLINT,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SetTime',
    tableName: 'set_times',
    timestamps: false
  });
  return Set_Time;
};