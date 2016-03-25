/*
 * @Author: BuptStEve
 * @Date:   2016-01-28 18:18:44
 * @Last Modified by:   BuptStEve
 * @Last Modified time: 2016-03-19 18:59:05
 */

Session.setDefault('commentsLimit', INCREMENT);

Template.articlePage.onCreated(function() {
  var self = this;

  Session.set('commentsLimit', INCREMENT);

  self.autorun(function() {
    var articleId    = FlowRouter.getParam('_id'),
        commentOrder = FlowRouter.getParam('_order') || 'up',
        sortOrder    = commentOrder==='down' ? {submitTime: -1} : {submitTime: 1};

    self.subscribe('comments', articleId, {
      sort : sortOrder,
      limit: Session.get('commentsLimit')
    });

    if ((FlowRouter.subsReady('singleArticle') && !Articles.findOne({})) ||
        (commentOrder !== 'up' && commentOrder !== 'down') ||
        (Session.get('commentsLimit') === NaN)) {
      // 404
      FlowRouter.go('/404');
    }

    // 每次滚动时检查
    $(window).scroll(function() {
      showMoreContent('comments');
    });
  });
});

Template.articlePage.helpers({
  // 订阅是否就绪
  isReady: function(sub) {
    return sub ? FlowRouter.subsReady(sub) : FlowRouter.subsReady();
  },
  // 主贴
  getArticle: function() {
    var articleId = FlowRouter.getParam('_id');

    return Articles.findOne({_id: new Meteor.Collection.ObjectID(articleId)});
  },
  // 回帖
  getComments: function() {
    var articleId    = FlowRouter.getParam('_id'),
        commentOrder = FlowRouter.getParam('_order') || 'up',
        sortOrder    = commentOrder==='down' ? {submitTime: -1} : {submitTime: 1};

    return Comments.find({article: articleId}, {sort: sortOrder});
  },
  // 加载更多
  moreResults: function() {
    var articleId = FlowRouter.getParam('_id'),
        totalNum  = Counts.get(`comments.${articleId}`);
    return Comments.find({article: articleId}).count() < totalNum;
  },
  // 进度条
  progressPercent: function() {
    var articleId = FlowRouter.getParam('_id'),
        totalNum  = Counts.get(`comments.${articleId}`);
    return parseInt(Comments.find({article: articleId}).count()*100/totalNum) || 0;
  }
});
