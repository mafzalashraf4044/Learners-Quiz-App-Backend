/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getUsers: (req, res) => {
        /**
         * Params:
         * - searchTerm
         * - sortBy (ASC or DESC)
         * - sortType
         * - pageNum
         * - pageSize
         * - fields (type = array, default = all fields)
         * - populateGroups (type = boolean, default = true)
        */

        sails.log('UsersController::getUsers called');

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
                               _.intersection(['firstName', 'lastName', 'email', 'username', 'active'], fields) : 
                               ['firstName', 'lastName', 'email', 'username', 'active'];            

            findWhere.or = _.map(searchFields, (searchField) => {
                                return {[searchField]: {contains: params.searchTerm}};
                            });
        }

        // Query defination
        let query = params.populateGroups == false ?
                    Users.find(findWhere, {fields}) :
                    Users.find(findWhere, {fields}).populate('groups', {select: ['title']});

        
        //Getting the count of total records before pagination
        Users.count(findWhere, {fields}).exec((err, count) => {
            if(err){
                sails.log('UsersController::getUsers ERROR', err);
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
            query.exec((err, users) => {
                if(err){
                    sails.log('UsersController::getUsers ERROR', err);
                    return res.serverError();
                }

                if(params.pageNum && params.pageSize){
                    return res.responses(200, 'FetchUsersSuccess', {users, count});
                }

                return res.responses(200, 'FetchUsersSuccess', users);
            });
        });
    },

};

