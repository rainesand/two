const path = require("path");

// import middleware that check to see if user is logged in before allowing them access
const isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {

    //if user is logged in send them to their personal page, otherwise send them to register page
    // app.get("/", (req, res) => {
    //     // If the user already has an account send them to their feed
    //     if (req.user) {
    //         res.redirect("/userPage");
    //     }
    //     res.sendFile(path.join(__dirname, "../public/login.html"));
    // });

    // if user is logged in send them to their personal page, otherwise send them to login page
    app.get("/login", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/userPage");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    //send register page
    app.get("/register", (req, res) => {
        if(req.user) {
            res.redirect("/userPage");
        }
        res.sendFile(path.join(__dirname, "../public/register.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the register page
    app.get("/userPage", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/userPage.html"));
    });

    app.get("/feed", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/feed.html"));
    });

    app.get("/library", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/library.html"));
    });

}