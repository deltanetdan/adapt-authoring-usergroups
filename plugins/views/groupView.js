define(function(require) {
  const OriginView = require('core/views/originView');
  const Origin = require('core/origin');

  const GroupView = OriginView.extend({
    isSelected: false,
    tagName: 'div',
    className: function() {
      const classes = ['group-item', 'tb-row', this.model.get('_id')];
      if(this.model.get('_id') === Origin.sessionModel.get('groupId')) {
        classes.push('me');
      }
      if(this.model.get('_isHidden')) {
        classes.push('display-none');
      }
      return classes.join(' ');
    },

    render: function() {
      console.log(this)
      OriginView.prototype.render.apply(this, arguments);
    },
  }, {
    template: 'group'
  });

  return GroupView;
});