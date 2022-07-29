import AbstractApiModule from 'adapt-authoring-api';
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
    /**
     * Module registered for user groups
     * @type {Array<AbstractApiModule>}
     */
    this.modules = [];

    this.useDefaultRouteConfig();
  }
  /** @override */
  async init() {
    await super.init();

    this.registerModule(await this.app.waitForModule('users'));
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

    this.log('debug', `registered ${mod.name} for use with usergroups`);
    this.modules.push(mod);

    this.buildUI();
  }

  async buildUI() {
    const ui = await this.app.waitForModule('ui');
    ui.addUiPlugin(`${this.rootDir}/plugins`);
  }

  /** @override */
  async delete(...args) {
    const { _id } = await super.delete(...args);
    return Promise.all(this.modules.map(async m => {
      const docs = await m.find({ userGroups: _id });
      return Promise.all(docs.map(async d => {
        try {
          await m.update({ _id: d._id }, { $pull: { userGroups: _id } }, { rawUpdate: true });
        } catch(e) {
          this.log('warn', `Failed to remove usergroup, ${e}`);
        }
      }));
    }));
  }

  /**
  * Checks whether the request user should be given access to the content they're requesting based on the users group
  * @param {ClientRequest} req
  * @param {Object} data
  * @return {Promise} Resolves with boolean
    */
  async checkContentAccess(req, data) {
    const content = await this.app.waitForModule('content');
    let course;
    if(data._type === 'course') {
      course = data;
    } else {
      [course] = await content.find({ _id: data._courseId || (await content.find(data))._courseId });
    }
    if(!course) {
      return;
    }
    return true;
    const shareWithUsers = course._shareWithUsers && course._shareWithUsers.map(id => id.toString()) || [];
    const userId = req.auth.user._id.toString();
    const inSharedGroup = _.intersectionWith(course.userGroups, req.auth.user.userGroups, (a, b) => a.toString() === b.toString()).length > 0;
    return course._isShared || shareWithUsers.includes(userId) || inSharedGroup;
  }

  /**
   * Checks usergroup on user update
   * @param {ClientRequest} req
   * @param {Object} data
   * @param {Promise} Resolves with ?
   */
  async updateUsers(req, data) {
    console.log(data)
    return;
  }

  /**
  * Checks usergroup on user insert
  * @param {ClientRequest} req
  * @param {Object} data
  * @param {Promise} Resolves with ?
  */
  async insertUsers(req, data) {
    console.log(data)
    return;
  }
}

export default UserGroupsModule;