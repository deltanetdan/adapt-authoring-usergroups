define(function(require) {
    const Backbone = require('backbone');
    const UserGroupModel = require('../models/userGroupModel');

    const UserGroupCollection = Backbone.Collection.extend({
        url: '',
        model: UserGroupModel,
        sortBy: 'displayName',
        direction: 1


    });

    return UserGroupCollection;
});