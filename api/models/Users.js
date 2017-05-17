/**
 * Users.js
 *
 * @description :: File Contains Structure of Users Collection & Methods for CRUD Operations.
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

    //A user can join multiple groups, a group can have many users, two-way M:M association
    groups: {
      collection: 'groups',
      via: 'users'
    },

    //A user can attempt multiple quizzes, a quiz can be attempted by many users, one-way M:M association
    attemptedQuizzes: {
      collection: 'quizzes',
      via: 'users'
    },

    quizResults: {
      type: 'json'
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    },

    //Delete users will not be archived in database
    isArchived: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};

