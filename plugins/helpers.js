// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require){
    const Handlebars = require('handlebars');
    const Origin = require('core/origin');
  
    // accessible to Handlebars only!
    const hbsHelpers = {
      ifGroupNotMe: function(userId, block) {
        // @TODO implement group check, if users existing group do not allow to delete
        return block.fn(this);
        if (userId !== Origin.sessionModel.get('id')) {
          return block.fn(this);
        } else {
          return block.inverse(this);
        }
      }
    };
    for(var name in hbsHelpers) {
      if(hbsHelpers.hasOwnProperty(name)) Handlebars.registerHelper(name, hbsHelpers[name]);
    }
    return jsHelpers;
  });