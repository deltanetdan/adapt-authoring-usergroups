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
    /** @ignore */ this.schemaExtensionName = 'usergroups';
    /** @ignore */ this.collectionName = 'usergroups';
    this.useDefaultRouteConfig();
  }
  async init() {
    this.registerModule(await this.app.waitForModule('users'));
    this.setReady();
  }
  /**
  * Registers a module for use with this plugin
  * @param {AbstractApiModule} mod
  */
  async registerModule(mod) {
    if(!mod.schemaName) {
      return this.log('warn', `cannot register module, module doesn't define a schemaName`);
    }
    const jsonschema = await this.app.waitForModule('jsonschema');
    jsonschema.extendSchema(mod.schemaName, this.schemaExtensionName);
  }
}

module.exports = UserGroupsModule;
