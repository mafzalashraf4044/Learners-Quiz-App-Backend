/**
 * Admins.js
 *
 * @description :: File Contains Structure of Admins Collection & Methods for CRUD Operations.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    firstName: {
      type: 'string',
      required: true
    },

    lastName: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true,
      unique: true
    },

    username: {
      type: 'string',
    },

    password: {
      type: 'string',
      required: true
    },

    //A group can have only one admin, an admin can manage many groups, two-way 1:M association
    groups: {
      collection: 'groups',
      via: 'admin'
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    },

    //Delete admins will not be archived in database
    isArchived: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};

