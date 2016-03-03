/*
* @Author: BuptStEve
* @Date:   2016-01-24 21:40:27
* @Last Modified by:   BuptStEve
* @Last Modified time: 2016-03-01 15:30:12
*/

ttArticlesSub = new SubsManager();


Template.articlesList.helpers({
  // 订阅是否就绪
  ttReady: function() {
    return Template.instance().ready.get();
  },
  articles: function() {
    return Articles.find({}, {
      sort: {
        ttUpdateTime    : -1,
        newCommentsCount: -1
      },
      limit: 10
    });
  }
});

Template.articlesList.events({
  "click a[href^=#][href!=#]": function(event) {
    // 平滑滚动
    if (location.pathname.replace(/^\//,'') == event.target.pathname.replace(/^\//,'') &&
      location.hostname == event.target.hostname) {

      var target = $(event.target.hash);
      target = target.length ? target : $('[name=' + event.target.hash.slice(1) +']');

      if (target.length) {
        $('html, body').animate({
            // scrollTop: target.offset().top - 70
            scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  }
});

Template.articlesList.onCreated(function() {
  var self   = this;
  self.ready = new ReactiveVar();

  self.autorun(function() {
    // self.subscribe('ttArticles');
    var handle = ttArticlesSub.subscribe('ttArticles');
    self.ready.set(handle.ready());
  });
});

Template.articlesList.onRendered(function() {
  // --#affix--
  $('#sideNav').affix({
    offset: {
      top   : 0,
      bottom: $('footer').outerHeight(true)
    }
  });

  $('body').scrollspy({target: '.scrollspy'});
});

