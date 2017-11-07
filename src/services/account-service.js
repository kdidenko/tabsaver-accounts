/** 
 * @file services/account-service.js
 * @short service for managing user account models
 * 
 * @author Kostyantyn Didenko <kdidenko@ito-global.com>
 */
'use strict'


class AccountService {

    constructor() {
        console.log('AccountService constructor executed');
    }
}


/**
 * Exportis only single static instance of the service
 * @type {AccountService}
 */
module.exports.AccountService = new AccountService();
