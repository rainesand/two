

var db = require("../models");
const passport = require("../config/passport");


module.exports = function (app) {
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.body);
    });
    // Backend register route, creates new user in DB
    app.post("/api/register", function (req, res) {
        console.log(req.body);
        db.User.create(req.body).then(function () {
            res.redirect(307, "/api/login");
        }).catch(err => {
            res.status(401).json(err);
        });
    });

    // Backend show post route, creates new showPost in DB
    app.post("/api/shows", function (req, res) {
        console.log(req.body);
        db.Show.create(req.body).then(function (post) {
            res.json(post);
        });

    });

    // user's recent show post route, creates new showPost in DB
    app.post("/api/recent", function (req, res) {
        console.log(req.body);
        db.Recent.create(req.body).then(function (post) {
            res.json(post);
        });
    });

    app.post("/api/discussPost", function (req, res) {
        console.log(req.body);
        db.Post.create(req.body).then(function (post) {
            res.json(post);
        });
    });

    app.get("/api/post/:netflixID", function (req, res) {
        db.Post.findAll({
            where: {
                netflixID: req.params.netflixID
            },
            order: [['createdAt', 'DESC']]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    })




    app.get("/api/recent/:id", function (req, res) {
        db.Recent.findAll({
            limit: 1,
            where: {
                UserId: req.params.id,
            },
            order: [['createdAt', 'DESC']]
        }).then(function (dbRecent) {
            res.json(dbRecent);
        });
    })

    // Route for logging user out
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });


    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's username and id
            res.json({
                username: req.user.username,
                id: req.user.id
            });
        }
    });

    // Route for getting users shows
    app.get("/api/shows/:id", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's username and id
            db.Show.findAll({
                where: {
                    UserId: req.params.id
                }
            }).then(function (dbShow) {

                res.json(dbShow);
            });
        }
    });

    app.get("/api/users/:id", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's username and id
            db.User.findAll({
                where: {
                    id: req.params.id
                }
            }).then(function (dbUser) {

                res.json(dbUser);
            });
        }
    });

    app.get("/api/feedShows", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            db.Show.findAll({ include: db.User }).then(function (dbShow) {
                res.json(dbShow);
            });
        }
    });

    app.put("/api/update", function (req, res) {
        db.Show.update({
            userRate: req.body.userRate,
            status: req.body.status
        }, {
            where: { id: req.body.id }
        }).then(function (dbShow) {

            res.json(dbShow);
        })

    })

    app.delete("/api/show/:id", function (req, res) {
        db.Show.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbShow) {
            res.json(dbShow);
        });
    });



};

