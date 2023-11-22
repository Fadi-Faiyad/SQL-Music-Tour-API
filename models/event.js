'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ MeetGreet, SetTime, Stage_Event}) {
      // define association here
      Event.hasMany(MeetGreet, {
        foreignKey: "event_id",
        as: 'meet_greets'
      })
      Event.hasMany(SetTime, {
        foreignKey: 'event_id',
        as: 'set_times'
      })
      Event.hasMany(Stage_Event, {
        foreignKey: 'event_id',
        as: 'stage_events'
      })
    }
  }
  Event.init({
    event_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    available_start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
  });
  return Event;
};