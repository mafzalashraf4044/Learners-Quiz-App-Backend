/**
 * GroupsController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getGroups: (req, res) => {
        /**
         * Params:
         * - searchTerm
         * - sortBy (ASC or DESC)
         * - sortType
         * - pageNum
         * - pageSize
         * - fields (type = array, default = all fields)
         * - populateUsers (type = boolean, default = true)
         * - populateAdmin (type = boolean, default = true)
        */

        sails.log('GroupsController::getGroup called');

        let params = req.allParams();

        sails.log('params', params);

        //If fields array is defined, parse it, else null will be passed in the query which will select all fields
        let fields = params.fields ? JSON.parse(params.fields) : null;

        let findWhere = {isArchived: false};

        /**
         * If searchTerm is defined add 'or' key to the findWhere object, 'or' key
         * contains an array of object, each of which corresponds to a field in
         * the DB we wants to search for
         */
        if(params.searchTerm && typeof params.searchTerm == 'string'){
            let searchFields = fields && _.isArray(fields) ? 
                               _.intersection(['title'], fields) : ['title'];

            findWhere.or = _.map(searchFields, (searchField) => {
                                return {[searchField]: {contains: params.searchTerm}};
                            });
        }

        // Query defination
        let query = Groups.find(findWhere, {fields});

        //Setting default population of admin and users to true
        let populateAdmin = params.populateAdmin ? JSON.parse(params.populateAdmin) : true;
        let populateUsers = params.populateUsers ? JSON.parse(params.populateUsers) : true;

        if(populateAdmin == true && populateUsers == true){
            query.populate('users', {select: ['id']}).populate('admin', {select:['firstName', 'lastName', 'email']});
        }else if(populateUsers == true){
            query.populate('users', {select: ['id']});
        }else if(populateAdmin == true){
            query.populate('admin', {select: ['firstName', 'lastName', 'email']});
        }
        
        //Getting the count of total records before pagination
        Groups.count(findWhere, {fields}).exec((err, count) => {
            if(err){
                sails.log('GroupsController::getGroups ERROR', err);
                return res.serverError();
            }

            //Pagination
            if (params.pageNum && params.pageSize){
                // query.paginate({page: params.pageNum, limit: params.pageSize});
                query.skip(params.pageSize * (params.pageNum - 1)).limit(params.pageSize);
            }else if(params.pageNum && !params.pageSize || !params.pageNum && params.pageSize){
                return res.responses(400, 'ReqParamsAreMissing');
            }

            //Sorting
            if (params.sortBy && params.sortType){
                if(params.sortType.toLowerCase() != 'asc' || params.sortType.toLowerCase() != 'desc'){
                    query.sort(params.sortType + ' ' + params.sortBy);
                }else{
                    return res.responses(400, 'InvalidParams');
                }
            }else if(params.sortBy && !params.sortType || !params.sortBy && params.sortType){
                return res.responses(400, 'ReqParamsAreMissing');
            }

            // Executing the query
            query.exec((err, groups) => {
                if(err){
                    sails.log('GroupsController::getGroups ERROR', err);
                    return res.serverError();
                }

                if(params.pageNum && params.pageSize){
                    return res.responses(200, 'FetchGroupsSuccess', {groups, count});
                }

                return res.responses(200, 'FetchGroupsSuccess', groups);
            });
        });
    },


    getGroupsSpecificFields: (req, res) => {

        /**
         * Params:
         * - fields (Array of DB fields) 
         */

        sails.log('GroupsController::getGroupsSpecificFields called');

        let params = req.allParams();
        let fields = params.fields ? JSON.parse(params.fields) : null;

        if(fields && _.isArray(fields)){
            //MongoDB native query for specified fields
            // Groups.native(function(err, collection) {
            //     collection.find({}, fields).toArray(function(err, groups) {
            //         if (err) return res.serverError(err);
            //         return res.responses(200, 'FetchGroupsSpecificFieldsSuccess', groups);
            //     });
            // });

            Groups.find({isArchived: false}, {fields}).exec((err, groups) => {
                if(err){
                    sails.log('err', err);
                    return res.serverError();
                }

                return res.responses(200, 'FetchGroupsSpecificFieldsSuccess', groups);
            });
        }else {
            return res.responses(400, 'ReqParamsAreMissing');
        }
    },	
};

