define(function(require) {
    const Origin = require('core/origin');
    const OriginView = require('core/views/originView');
    const GroupView = require('../views/groupView');

    const UserGroupsView = OriginView.extend({
      className: 'userGroups',
      settings: {
        autoRender:false
      },
      users: null,
      views: [],
      selectedView: null,
      showFilterScreen:false,

      initialize: function() {
        OriginView.prototype.initialize.apply(this, arguments);
        this.usersgroups = this.collection;
        Origin.trigger('location:title:update', { title: 'User Groups' });
        this.render();
      },

      render: function() {
        this.removeChildViews();
        OriginView.prototype.render.apply(this, arguments);
        this.renderChildViews();
      },

      renderChildViews: function() {
        var fragment = document.createDocumentFragment();

        this.usersgroups.each(function(usergroup) {
          console.log(usergroup)
          var userGroupView = new GroupView({ model: usergroup });
          fragment.appendChild(userGroupView.el);
          this.views.push(userGroupView);
  
          if(this.selectedView && usergroup.get('_id') === this.selectedView) {
            userGroupView.$el.addClass('selected').click();
          }
        }, this);
        console.log(fragment)
        this.$('.usergroups').append(fragment);
      },

      removeChildViews: function() {
        if(this.views.length) {
          for(var i = 0, count = this.views.length; i < count; i++) {
            var view = this.views[i];
            if (view.isSelected) this.selectedView = view.model.get('_id');
            view.remove();
          }
          this.views = [];
        }
      },

      postRender: function() {
        this.setViewToReady();
        this.$('.usergroups').fadeIn(300);
      },

      refreshUserGroupViews: async function(event) {
        event && event.preventDefault();
        await this.collection.fetch();
        this.render();
      }
    }, {
        template: 'userGroups'
    });

    return UserGroupsView;
});
