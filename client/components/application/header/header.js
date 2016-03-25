/*
* @Author: BuptStEve
* @Date:   2016-02-20 21:43:15
* @Last Modified by:   BuptStEve
* @Last Modified time: 2016-03-19 15:46:12
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

    return isArticlePage || !isQueryEmpty;
  },
  // 根据路由,是否当前显示升序和降序
  activeUpDown: function() {
    var isArticlePage = FlowRouter.getRouteName() === 'articlePage',
        queryString   = FlowRouter.getQueryParam('q') || '',
        isQueryEmpty  = queryString === '';

    return isArticlePage && isQueryEmpty;
  },
  // 根据路由,得到文章 _id
  articleId: function() {
    return FlowRouter.getParam('_id');
  },
  // 根据路由,得到搜索字符串
  searchString: function() {
    return FlowRouter.getQueryParam('q');
  }
});

Template.header.events({
  // 小屏时点击导航链接后收起导航
  'click #navigation li': function() {
    if ($('.navbar-toggle').css('display') === 'block') {
      // 修复暂时出现滚动条的 bug
      $('.navbar-toggle').trigger('click');
    }
  },
  // 点击首页和十大后返回顶部
  'click #navigation li:first-of-type, click .navbar-brand': function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  },
  // 点击升序或降序后滚动到评论处
  'click #navigation li:nth-of-type(2),li:nth-of-type(3)': function() {
    var commentsTop = $('.comments').offset().top - 60; // 60 为顶部导航条
    $('html, body').animate({ scrollTop: commentsTop }, 'slow');
  },
  // 设置搜索路由
  "keyup #searchInput": _.throttle(function(event) {
    if (FlowRouter.getQueryParam('q') !== event.target.value) {
      Session.set("searchLimit", 10);
      searchArticlesSub.clear(); // 清除订阅缓存
      FlowRouter.setQueryParams({'q': event.target.value});
    }
  }, 1000)
});
