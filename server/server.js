/*
* @Author: BuptStEve
* @Date:   2016-01-24 21:53:13
* @Last Modified by:   BuptStEve
* @Last Modified time: 2016-02-26 12:37:03
*/

// 十大
Meteor.publish('ttArticles', function() {
  return Articles.find({}, {
    sort : {ttUpdateTime: -1, newCommentsCount: -1},
    limit: 10
  });
});

// 一篇文章
Meteor.publish('singleArticle', function(id) {
  check(id, String);

  // console.log('Articles.findOne({_id: new Meteor.Collection.ObjectID(id)})._id: ', Articles.findOne({
  //   _id: new Meteor.Collection.ObjectID(id)
  // })._id);

  return Articles.find({
    _id: new Meteor.Collection.ObjectID(id)
  });
});

// 文章回帖
Meteor.publish('comments', function(articleId, options) {
  // console.log(articleId);
  check(articleId, String);
  check(options, {
    sort : Object,
    limit: Number
  });

  Counts.publish(this, `comments.${articleId}`, Comments.find({article: articleId}));
  // Meteor._sleepForMs(5000);

  return Comments.find({article: articleId}, options);
});
