'use strict';
const User = ('./user').User;

module.exports = (sequelize, DataTypes) => {
  var event = sequelize.define('event', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    eventTitle: {
      type: DataTypes.STRING,
      field: "event_title",
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      field: "location",
      allowNull: false
    },
    availableSlots: {
      type: DataTypes.INTEGER,
      field: "available_slots",
      allowNull: false,
      defaultValue: 2
    },
    userId: {
      type: DataTypes.STRING,
      field: "user_id",
      references: User, 
      referencesKey: "id"
    },
    eventDate: {
      type: DataTypes.DATE,
      field: 'event_date'
    },
    eventLink: {
      type: DataTypes.STRING,
      field: 'event_link'
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
        event.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return event;
};