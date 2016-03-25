/*
 * @Author: BuptStEve
 * @Date:   2016-02-23 21:41:56
 * @Last Modified by:   BuptStEve
 * @Last Modified time: 2016-03-21 10:32:38
 */

/**
 * @desc 判断是否为空对象{}
 * @author BuptStEve
 * @param  {Object} obj
 * @return {Boolean}
 */
isEmptyObject = function(obj) {
  for(x in obj) {
    return false;
  }

  return true;
};

/**
 * @desc 判断一个字符串中是否含有特殊字符，如果含有则构造查询对象
 * @author BuptStEve
 * @param  {String} str
 * @return {Object} null 或查询对象
 */
isSpecial = function(str) {
  var relation,
      result = {};

  if (str.indexOf('<') != -1) {
    relation = str.split('<');
    result[relation[0]] = { $lt: Number(relation[1]) };
  } else if (str.indexOf('>') != -1) {
    relation = str.split('>');
    result[relation[0]] = { $gt: Number(relation[1]) };
  } else if (str.indexOf('=') != -1) {
    relation = str.split('=');
    result[relation[0]] = Number(relation[1]);
  } else if (str.indexOf(':') != -1) {
    relation = str.split(':');
    result[relation[0]] = new RegExp(relation[1], 'ig');
  }

  return isEmptyObject(result) ? null : result;
};

/**
 * @desc 将查询字符串转变为使用 $and 操作符的查询对象数组
 * @author BuptStEve
 * @param  {String} queryString
 * @return {Array}  andArray
 */
queryStrToAndArray = function(queryString) {
  var queryArr = queryString.split(' ');
  var andArray = [];

  for (var i = queryArr.length - 1; i >= 0; i--) {
    if (queryArr[i] == '') { continue; }

    var special = isSpecial(queryArr[i]);

    if (special != null) {
      andArray.push(special);
    } else {
      var regEx = new RegExp(queryArr[i], 'ig');

      andArray.push({
        $or: [{
          url     : regEx
        },{
          title   : regEx
        },{
          author  : regEx
        },{
          bodyText: regEx
        }]
      });
    }
  }

  return andArray;
};

/**
 * @desc 统一通过设置 Session 实现加载更多
 * @author BuptStEve
 * @param  {String} targetStr 目标字符串
 */
showMoreContent = function(targetStr) {
  var threshold,
      target = $(".load-more." + targetStr + "-more");

  if (!target.length) { return; }

  threshold = $(window).scrollTop() + $(window).height() - target.height();

  if (target.offset().top < threshold) {
    if (!target.data("visible")) {
      target.data("visible", true);
      Session.set(targetStr + "Limit", Session.get(targetStr + "Limit") + INCREMENT);
    }
  } else {
    if (target.data("visible")) {
      target.data("visible", false);
    }
  }
}
