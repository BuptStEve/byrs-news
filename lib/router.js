/*
* @Author: BuptStEve
* @Date:   2016-01-28 17:06:02
* @Last Modified by:   BuptStEve
* @Last Modified time: 2016-03-01 15:22:36
*/

// 主页
FlowRouter.route('/', {
  name: 'topTen',
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {content: "articlesList"});
  }
});

// 404
FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("layout", {content: "notFound"});
  }
};

// 帖子详情
var articleSection = FlowRouter.group({
  prefix: "/articles/:_id",
  subscriptions: function(params) {
    this.register('singleArticle', Meteor.subscribe('singleArticle', params._id));
  },
  triggersEnter: [idCheck]
});

articleSection.route('/:_order?', {
  name: 'articlePage',
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {content: "articlePage"});
  }
});

/**
 * @desc 判断文章 id 的长度是否合法
 * @author BuptStEve
 * @param  {Object} context
 */
function idCheck(context, redirect, stop) {
  var _id = context.params._id;

  if (_id.length !== 24) {
    BlazeLayout.render("layout", {content: "notFound"});
    stop();
  }
}
