'use strict';
//
// namespace
//
var blog = {};

//
// model
//
var Article = function(data) {
  data = data || {};
  this.id = m.prop(data.id);
  this.title = m.prop(data.title);
  this.content = m.prop(data.content);
  this.posted_at = m.prop(data.posted_at);
}

Article.find = function(id) {
  return m.request({method: "GET", url: "/api/articles/" + id, type: Article, initialValue: new Article({})});
}

var ArticleComponent = {
  view: function(ctrl, args) {
    var article = args.article;

    return m("section", {class: "section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp"}, [
      m("div", {class: "mdl-card mdl-cell mdl-cell--12-col"} ,[
        m("div", {class: "mdl-card__title"}, [
          m("h4", {class: "mdl-card__title-text"}, [
            m("a", {"href": "/articles/" + article.id(), config: m.route}, article.title())
          ])
        ]),

        m("div", {class: "mdl-card__supporting-text"}, article.content()),

        m("div", {class:"mdl-card__actions mdl-card--border"}, [
          m("span", {class: "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"}, article.posted_at())
        ])
      ])
    ]);
  }
};

var home = {
  controller: function() {
    home.vm.init();
  },

  view: function() {
    return home.vm.article_list().map(function(article, index) {
      return m.component(ArticleComponent, {article: article});
    });
  }
};

home.vm = {
  init: function() {
    this.article_list = m.prop([]);
    m.request({method: "GET", url: "/api/articles", type: Article}).then(this.article_list);
  }
};

var article_page = {
  controller: function() {
    article_page.vm.init();
  },
  view: function(controller) {
    return m.component(ArticleComponent, {article: article_page.vm.article()});
  }
};

article_page.vm = {
  init: function() {
    var id = m.route.param("article_id");
    this._article = Article.find(id);
  },
  article: function() {
    return this._article();
  }
};

var main = document.getElementById("overview");
m.route(main, "/", {
  "/": home,
  "/articles/:article_id": article_page
});
