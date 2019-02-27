// dependencies
var cheerio = require("cheerio");
var request = require("request");
// models
var note = require("../models/Note.js");
var Article = require("../models/Article.js");
var Save = require("../models/Save.js");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        request("https://www.soompi.com/", function (error, response, html) {
            var $ = cheerio.load(html);

            $("h4.media-heading.list-media-heading").each(function(i, element) {
                var result = {};
                // var link = $(element).children().attr("href");
                // var title = $(element).children().text();
                result.title = $(element).children("h4").text();
                result.link = $(element).children("h4").children("a").attr("href");
                
                if (result.title && result.link) {
                    var entry = new Article(result);
                    // entry saved to the db
                    Article.update(
                        {link: result.link},
                        result,
                        { upsert: true },
                        function (error, doc){
                            if (error) {
                                console.log(error);
                            }
                        }
                    );
                }
            });
            res.json({"code" : "success"});
            // res.json(true);
        });
    });

    // Get route for  all the articles
    app.get("/articles", function (req, res) {
        Article.find({}, function (error, doc) {
            if (error) {
                console.log(error);
            } else {
                res.send(doc);
            }
        });
    });
    // Get route for  all the articles with the id
    app.get("/articles/:id", function (req, res) {
        Article.find({
                "_id": req.params.id
            })
            .populate("note")
            .exec(function (error, doc) {
                if (error) {
                    console.log(error)
                } else {
                    res.send(doc);
                }
            });
    });

    // get route to return all saved articles
    app.get("/saved/all", function (req, res) {
        Save.find({})
            .populate("note")
            .exec(function (error, data) {
                if (error) {
                    console.log(error);
                    res.json({"code" : "error"});
                } else {
                    res.json(data);
                }
            });
    });

    // post route to save the article
    app.post("/save", function (req, res) {
        var result = {};
        result.id = req.body._id;
        result.title = req.body.title;
        result.link = req.body.link;
        
        var entry = new Save(result);
        entry.save(function (err, doc) {
            // Log any errors
            if (err) {
                console.log(err);
                res.json(err);
            }
            // Or log the doc
            else {
                res.json(doc);
            }
        });
        //res.json(result);
    });

    // route to delete saved articles
    app.delete("/delete", function (req, res) {
        var result = {};
        result._id = req.body._id;
        Save.findOneAndRemove({
            '_id': req.body._id
        }, function (err, doc) {
            // Log any errors
            if (err) {
                console.log("error:", err);
                res.json(err);
            }
            // Or log the doc
            else {
                res.json(doc);
            }
        });
    });

    app.get("/notes/:id", function (req, res) {
        if(req.params.id) {
            note.find({
                "article_id": req.params.id
            })
            .exec(function (error, doc) {
                if (error) {
                    console.log(error)
                } else {
                    res.send(doc);
                }
            });
        }
    });


    // Create a new note/replace an existing note
    app.post("/notes", function (req, res) {
        if (req.body) {
            var newnote = new note(req.body);
            newnote.save(function (error, doc) {
                if (error) {
                    console.log(error);
                } else {
                    res.json(doc);
                }
            });
        } else {
            res.send("Error");
        }
    });
    // update note
    app.get("/notepopulate", function (req, res) {
        note.find({
            "_id": req.params.id
        }, function (error, doc) {
            if (error) {
                console.log(error);
            } else {
                res.send(doc);
            }
        });
    });

    // delete a note

    app.delete("/deletenote", function (req, res) {
        var result = {};
        result._id = req.body._id;
        note.findOneAndRemove({
            '_id': req.body._id
        }, function (err, doc) {
            // Log any errors
            if (err) {
                console.log("error:", err);
                res.json(err);
            }
            // Or log the doc
            else {
                res.json(doc);
            }
        });
    });
}
