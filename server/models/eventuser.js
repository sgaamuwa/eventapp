'use strict';
const User = require('./user').User;
const Event = require('./event').event;

module.exports = (sequelize, DataTypes) => {
  var EventUser = sequelize.define('EventUser', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: "id"
    },
    userId: {
      type:DataTypes.STRING,
      field: "user_id"
    },
    eventId: {
      type:DataTypes.STRING,
      field: "event_id"
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Event.belongsToMany(User, {
          through: {
            model: EventUser,
            unique: false,
          },
          foreignKey: 'userId'
        });
        User.belongsToMany(Event, {
          through: {
            model: EventUser,
            unique: false
          },
          foreignKey: 'eventId'
        });   
      }
    }
  });
  return EventUser;
};