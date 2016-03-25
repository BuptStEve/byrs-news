/*
 * @Author: BuptStEve
 * @Date:   2016-02-17 16:05:37
 * @Last Modified by:   BuptStEve
 * @Last Modified time: 2016-03-19 18:58:03
 */

Session.setDefault('searchLimit', INCREMENT);

searchArticlesSub = new SubsManager();

Template.commentsSearch.onCreated(function() {
  var self = this;
  self.ready = new ReactiveVar();

  self.autorun(function() {
    var articleId   = FlowRouter.getParam('_id'),
        queryString = FlowRouter.getQueryParam('q');

    var handle = searchArticlesSub.subscribe('searchComments', articleId, queryString, Session.get('searchLimit'));
    self.ready.set(handle.ready());

    // 每次滚动时检查
    // $(window).scroll(showMoreContent('search'));
    $(window).scroll(function() {
      showMoreContent('search');
    });
  });
});

Template.commentsSearch.helpers({
  // 订阅是否就绪
  searchReady: function() {
    // console.log(Template.instance().ready.get());
    return Template.instance().ready.get();
  },
  items: function() {
    var articleId   = FlowRouter.getParam('_id'),
        queryString = FlowRouter.getQueryParam('q');

    return commentsQuery(Comments, queryString, Session.get('searchLimit'), articleId);
  },
  // 加载更多
  moreResults: function() {
    var articleId   = FlowRouter.getParam('_id'),
        queryString = FlowRouter.getQueryParam('q'),
        searchCount = 0;

    if (queryString) {
      searchCount = commentsQuery(Comments, queryString, Session.get('searchLimit'), articleId).count();
    }

    return searchCount >= Session.get('searchLimit');
  }
});



