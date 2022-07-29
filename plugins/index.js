define (function(require) {
    const Origin = require('core/origin');
    const UserGroupsView = require('./views/userGroupsView');
    const UserGroupsSidebarView = require('./views/userGroupsSidebarView');
    const UserGroupCollection = require('./collections/userGroupCollection');
    let groupCollection = new UserGroupCollection();

    Origin.on('origin:dataReady login:changed', function() {
        Origin.globalMenu.addItem({
          "location": "global",
          "text": 'User Groups',
          "icon": "fa-file-image-o",
          "callbackEvent": "usergroups:open",
          "sortOrder": 2
        });
    });

    Origin.on('globalMenu:usergroups:open', function() {
        Origin.router.navigateTo('usergroups');
    });

    Origin.on('router:usergroups', function(location, subLocation, action) {
        Origin.userGroups = {
            filterData: {}
        };

        if(!location) return loadUserGroupsView();
        if(location === 'new') return loadNewUserGroupView();
        if(subLocation === 'edit') loadEditUserGroupView(location);
    });

    function loadUserGroupsView() {
        await refreshGroups();

        Origin.trigger('location:title:hide');
        Origin.sidebar.addView(new UserGroupsSidebarView({ collection: groupCollection }).$el);
        Origin.contentPane.setView(UserGroupsView, { collection: groupCollection });
    }

    async function refreshGroups() {
      try {
        await groupCollection.fetch();
      } catch(e) {
        Origin.Notify.alert({ type: 'error', message: e });
      }
    }
});