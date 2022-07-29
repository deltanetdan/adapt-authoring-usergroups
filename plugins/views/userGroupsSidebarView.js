define([
    'core/origin',
    'modules/sidebar/views/sidebarItemView'
], function(Origin, SidebarItemView) {

    const UserGroupsSidebarView = SidebarItemView.extend({
      events: {
        'click button.add': 'addGroup'
      },

      initialize: function() {
        SidebarItemView.prototype.initialize.apply(this, arguments);
        this.listenTo(this.collection, { 'sync': this.render });
      },
    
      addGroup: function(event) {
        event && event.preventDefault();
        Origin.router.navigateTo('usergroups/addgroup');
      }
    }, {
      template: 'userGroupsSidebar'
    });

    
    return UserGroupsSidebarView;
});