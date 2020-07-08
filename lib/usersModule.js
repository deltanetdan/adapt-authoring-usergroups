const AbstractApiModule = require('adapt-authoring-api');
/**
* Module which handles groups of users
* @extends {AbstractApiModule}
*/
class UserGroupsModule extends AbstractApiModule {
  /** @override */
  async setValues() {
    /** @ignore */ this.root = 'usergroups';
    /** @ignore */ this.schemaName = 'usergroup';
    /** @ignore */ this.collectionName = 'usergroups';
    this.useDefaultRouteConfig();
  }
}

module.exports = UserGroupsModule;
