/*
 * @Author: BuptStEve
 * @Date:   2016-02-18 10:41:59
 * @Last Modified by:   BuptStEve
 * @Last Modified time: 2016-03-21 10:34:10
 */

/**
 * @desc 十大主贴搜索
 * @author BuptStEve
 * @param  {Object} collection
 * @param  {String} queryStr
 * @param  {Number} queryLimit
 * @return {Object}
 */
simpleQuery = function(collection, queryStr, queryLimit) {
  if (!queryStr) { return; }

  var limit    = queryLimit || 10;
  var andArray = queryStrToAndArray(queryStr);

  if (Meteor.isServer) {
    // 暂时限制最多 SEARCH_LIMIT 条 ╮(╯_╰)╭
    limit = limit > SEARCH_LIMIT ? SEARCH_LIMIT : limit;
  }

  if (andArray.length > 0) {
    return collection.find({
      $and: andArray
    }, {
      limit: limit,
      sort : {submitTime: -1}
    });
  } else {
    return collection.find({}, {
      limit: limit,
      sort : {submitTime: -1}
    });
  }
};

/**
 * @desc 贴子内部的回帖搜索
 * @author BuptStEve
 * @param  {Object} collection
 * @param  {String} queryStr
 * @param  {Number} queryLimit
 * @param  {String} articleId
 * @return {Object}
 */
commentsQuery = function(collection, queryStr, queryLimit, articleId) {
  if (!queryStr || !articleId) { return; }

  var limit    = queryLimit || 10;
  var andArray = queryStrToAndArray(queryStr);

  if (Meteor.isServer) {
    // 暂时限制最多 SEARCH_LIMIT 条 ╮(╯_╰)╭
    limit = limit > SEARCH_LIMIT ? SEARCH_LIMIT : limit;
  }

  if (andArray.length > 0) {
    return collection.find({
      article: articleId,
      $and   : andArray
    }, {
      limit: limit,
      sort : {submitTime: 1}
    });
  } else {
    return collection.find({
      article: articleId
    }, {
      limit: limit,
      sort : {submitTime: 1}
    });
  }
};


