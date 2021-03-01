
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/wikiDB",{ useUnifiedTopology: true, useNewUrlParser: true });

const articleSchema = {
  title:String,
  content:String
}
////////////////////////////////////////////////////////////////////////////////Request for one atricles
const Article = mongoose.model("article",articleSchema);
app.route("/articles/:inputTitle")
  .get(function(req,res){
    //const keyTitle = req.params.inputTitle;
    Article.findOne({title:req.params.inputTitle},function(err,result){
      if(result && !err){
        res.send(result);
      }else{
        res.send("No article found!");
      }
    });
  })
  .put(function(req,res){ // put is using to replace the whole object
    Article.update(
      {title:req.params.inputTitle},//if missing the title the new object is alos will be not title just content
      {title:req.body.title,content:req.body.content},
      {overwirte:true},
      function(err,result){
        if(!err && result){
          res.send("successfuly update the article");
        }else{
          res.send(err);
        }
    });
  })
  .patch(function(req,res){
    Article.update(
      {title:req.params.inputTitle},
      {$set:req.body},
      function(err,result){
        if(!err && result){
          res.send("successfuly update the article");
        }else{
          res.send(err);
        }
      });
  })
  .delete(function(req,res){
    Article.deleteOne({title:req.params.inputTitle},function(err){
      if(err){
        res.send(err);
      }else{
        res.send("the article deleted successfuly!");
      }
    });
  });
////////////////////////////////////////////////////////////////////////////////Request for ALl atricles
app.route("/articles")
  .get(function(req,res){
    Article.find({},function(err,results){
      if(!err){
        res.send(results);
      }else{
        res.send(err);
      }
    });
  })
  .post(function(req,res){
    const newArticle = new Article({
      title:req.body.title,
      content:req.body.content
    });
    newArticle.save(function(err){
      if(err){
        res.send(err);
      }else{
        res.send("the new article insert successfuly!");
      }
    });
  })
  .delete(function(req,res){
    Article.deleteMany({},function(err){
      if(err){
        res.send(err);
      }else{
        res.send("the All articles deleted successfuly!");
      }
    });
  });

app.listen("3939",function(){
  console.log("Wiki-API online");
});
