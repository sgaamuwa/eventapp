'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name",
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name",
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      field: "user_name", 
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      field: "password",
      allowNull: false
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
        User.hasMany(models.event, {
          foreignKey: 'userId',
          as: 'events'
        });
      }
    }
  });
  return User;
};