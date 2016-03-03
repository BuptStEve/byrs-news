/*
* @Author: BuptStEve
* @Date:   2016-01-28 20:03:49
* @Last Modified by:   BuptStEve
* @Last Modified time: 2016-01-31 23:11:58
*/

Template.commentItem.helpers({
  rank: function() {
    return this.url.slice(this.url.lastIndexOf('#') + 1);
  },

  submitted: function() {
    return moment(this.submitTime).locale('zh-cn').fromNow();
  }
});
