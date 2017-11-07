/* jslint es6 */
/**
 * @file index.js
 * @short an entry point for user accounts service
 *
 * @author Kostyantyn Didenko <kdidenko@ito-global.com>
 */

// importing global dependencies for routing incoming 
// requests and connecting to the service database
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const AccountService = require('services/account-service');
