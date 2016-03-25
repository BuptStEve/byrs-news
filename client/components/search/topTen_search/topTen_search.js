/*
 * @Author: BuptStEve
 * @Date:   2016-02-17 16:05:37
 * @Last Modified by:   BuptStEve
 * @Last Modified time: 2016-03-19 18:55:29
 */

Session.setDefault('searchLimit', INCREMENT);

searchArticlesSub = new SubsManager();

Template.topTenSearch.onCreated(function() {
  var self = this;
  self.ready = new ReactiveVar();

  self.autorun(function() {
    var queryString = FlowRouter.getQueryParam('q');

    var handle = searchArticlesSub.subscribe('ttArticles');
    self.ready.set(handle.ready());
  });
});

Template.topTenSearch.helpers({
  // 订阅是否就绪
  searchReady: function() {
    // console.log(Template.instance().ready.get());
    return Template.instance().ready.get();
  },
  items: function() {
    var queryString = FlowRouter.getQueryParam('q');

    return simpleQuery(Articles, queryString, Session.get('searchLimit'));
  }
});



