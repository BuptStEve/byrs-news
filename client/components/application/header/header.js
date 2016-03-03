/*
* @Author: BuptStEve
* @Date:   2016-02-20 21:43:15
* @Last Modified by:   BuptStEve
* @Last Modified time: 2016-03-01 15:29:03
*/

Template.header.helpers({
  // 根据路由,是否当前位于显示十大
  activeTopTen: function() {
    return FlowRouter.getRouteName() === 'topTen';
  },
  // 根据路由,是否当前为升序
  activeOrderUp: function() {
    return FlowRouter.getParam('_order') === 'up';
  },
  // 根据路由,是否当前显示固定的导航栏
  activeFixed: function() {
    var isArticlePage = FlowRouter.getRouteName() === 'articlePage',
        queryString   = FlowRouter.getQueryParam('q') || '',
        isQueryEmpty  = queryString === '';

    return isArticlePage && isQueryEmpty;
  },
  // 根据路由,得到文章 _id
  articleId: function() {
    return FlowRouter.getParam('_id');
  },
  // // 根据路由,得到搜索字符串
  // searchString: function() {
  //   return FlowRouter.getQueryParam('q');
  // }
});

Template.header.events({
  // 收起
  'click #navigation li': function() {
    $('.navbar-toggle').trigger('click');
  },
  // "keyup #searchInput": _.throttle(function(event) {
  //   Session.set("searchLimit", 10);
  //   searchArticlesSub.clear(); // 清除订阅缓存
  //   FlowRouter.setQueryParams({'q': event.target.value});
  // }, 1000)
});
