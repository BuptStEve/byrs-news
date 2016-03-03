/*
* @Author: BuptStEve
* @Date:   2016-01-24 21:40:27
* @Last Modified by:   BuptStEve
* @Last Modified time: 2016-03-01 15:31:47
*/

Template.articleItem.helpers({
  // 原帖地址
  fullIpv4Url: function() {
    return ipv4Url + this.url;
  },
  // 待修改
  domain: function() {
    var a  = document.createElement('a');
    a.href = ipv4Url + this.url;

    return a.hostname;
  },
  // moment 格式化后的时间
  submitted: function() {
    return moment(this.submitTime).format("YYYY-MM-DD HH:mm");
  },
  // 是否显示新评论数量
  showNewCommentsCount: function() {
    if (FlowRouter.getQueryParam('q')) {
      return FlowRouter.getQueryParam('q') === '';
    } else {
      return FlowRouter.getRouteName() === 'topTen' ? true : false;
    }
  },
  // 评论数量
  getCommentsCount: function() {
    return Counts.get(`comments.${this._id}`);
  },
  // 是否优先显示内容
  activeBody: function() {
    return FlowRouter.getRouteName() === 'articlePage' ? true : false;
  }
  // // 是否优先显示摘要
  // activeSummary: function() {
  //   if (FlowRouter.getQueryParam('q')) {
  //     return FlowRouter.getQueryParam('q') !== '';
  //   } else {
  //     return FlowRouter.getRouteName() === 'topTen' ? true : false;
  //   }
  // }
});

Template.articleItem.events({
  "click .bn-body": function(event) {
    if ($(event.target).hasClass('bn-body')) {
      $(event.target).addClass('bn-hidden');
      $(event.target).parent().find('.bn-summary').removeClass('bn-hidden');
    }
  },

  "click .bn-summary": function(event) {
    if ($(event.target).hasClass('bn-summary')) {
      $(event.target).addClass('bn-hidden');
      $(event.target).parent().find('.bn-body').removeClass('bn-hidden');
    }
  }
});
