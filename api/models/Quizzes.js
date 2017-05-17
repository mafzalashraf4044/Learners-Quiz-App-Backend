/**
 * Quizzes.js
 *
 * @description :: File Contains Structure of Quizzes Collection & Methods for CRUD Operations.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true
    },
    
    /*
     * numOfQuestions: total qustions in database
     * questionsPerQuiz: questions to be selected per quiz 
     */

    numOfQuestions: {
      type: 'integer',
      required: true
    },

    questionsPerQuiz: {
      type: 'integer',
      required: true
    },

    timeLimit: {
      type: 'integer',
      required: true
    },

    passingScore: {
      type: 'integer',
      required: true
    },

    questions: {
      type: 'array',
      required: true
    },
    
    users: {
      collection: 'users',
      via: 'attemptedQuizzes'
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    },

    //Delete quizzes will not be archived in database
    isArchived: {
      type: 'boolean',
      defaultsTo: false
    }

  }
};

