/**
 * Custom Responses for API Calls
 */
``
module.exports = function responses(status, type, data = null) {

    //Custom Responses
    let customResponses = {
        'FetchUsersSuccess': {status: status, users: data, msg: 'Users fetched successfully.', code: 'USRSUC001'},
        'CreateUserSuccess': {status: status, user: data, msg: 'User created successfully.', code: 'USRSUC002'},
        'UserEditedSuccessfully': {status: status, user: data, msg: 'User edited successfully.', code: 'USRSUC003'},

        'UserFirstNameReq': {status: status, msg: 'User\'s first name is required.', code: 'USRERR001'},
        'UserLastNameReq': {status: status, msg: 'User\'s last name is required.', code: 'USRERR002'},
        'UserEmailReq': {status: status, msg: 'User\'s email is required.', code: 'USRERR003'},
        'UserPasswordReq': {status: status, msg: 'User\'s password is required.', code: 'USRERR004'},

        'UserFirstNameInvalid': {status: status, msg: 'First name must be atleast 3 characters long, with no special characters or white spaces.', code: 'USRERR005'},
        'UserLastNameInvalid': {status: status, msg: 'Last name must be atleast 3 characters long, with no special characters or white spaces.', code: 'USRERR006'},
        'UserEmailInvalid': {status: status, msg: 'Email provided is invalid.', code: 'USRERR007'},
        'UserUsernameInvalid': {status: status, msg: 'Username provided is invalid.', code: 'USRERR008'},



        'FetchGroupsSuccess': {status: status, groups: data, msg: 'Groups fetched successfully.', code: 'GRPSUC001'},

        'UserAlreadyExists': {status: status, msg: 'A user with this email address already exists.', code: 'USRERR001'},

        'FetchGroupsSpecificFieldsSuccess': {status: status, groups: data, msg: 'Groups specific fields fetched successfully.', code: 'GRPSUC001'},
        
        'ReqParamsAreMissing': {status: status, msg: 'Required paramters are missing.', code: 'PRMERR001'},
        'InvalidParams': {status: status, msg: 'Provided parameters are invalid.', code: 'PRMERR002'},
    }
    
    // Set status code
    this.res.status(status);    

    return this.res.jsonx(customResponses[type]);
}