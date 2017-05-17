/**
 * Groups.js
 *
 * @description :: File Contains Structure of Groups Collection & Methods for CRUD Operations.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
      unique: true
    },

    //A group can have only one admin, an admin can manage many groups, two-way 1:M association
    admin: {
      model: 'admins'
    },

    //A user can join multiple groups, a group can have many users, two-way M:M association
    users: {
      collection: 'users',
      via: 'groups'
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    },

    //Delete groups will not be archived in database
    isArchived: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};

