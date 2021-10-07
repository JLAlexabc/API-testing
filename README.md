# Web-ReST-API-Demo
  A ReST API Demo for blog articles manipulate situation.
  Mongodb used as database.
# For one article:
  .route("/articles/:inputTitle")
    .get   getting an article from db.
    .put/.patch   update an article.
    .delete  delete a article.
# For All atricles:
  .route("/articles")
    .get get all articles.
    .post add a new article
    .delete delete all articles.
