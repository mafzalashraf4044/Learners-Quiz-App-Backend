/**
 * UsersService
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	joinGroups: (id, groups) => {
        Users.findOne({id: id}).exec((err, userFound) => {
            sails.log("userfound", userFound);
            userFound.groups.add(groups);
            
            userFound.save((err) => {
                if(err){
                    sails.log('err', err);

                    return res.badRequest({
                        status: 400,
                        errCode: 'ERRUSR008',
                        msg: 'Something went wrong.'
                    });                    
                }else {
                    return res.ok({
                        status: 200,
                        msg: 'Groups joined successfully.',
                        data: userFound,
                    });               
                }


            });
        });           
    }
};

