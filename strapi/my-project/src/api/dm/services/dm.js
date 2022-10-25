'use strict';

/**
 * dm service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dm.dm');
