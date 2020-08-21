$(function () {


    $("#submit").on("click", login);

    function login(e) {
        e.preventDefault();
        // if (!validInput(['username', 'password', 'email'])) return;
        console.log("logging in...");
        // creating user object to send in post to backend
        var user = {
            username: $("#username").val(),
            password: $("#password").val()
        }
        if (!user.username || !user.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(user);
        emailInput.val("");
        passwordInput.val("");
    }
    // login function to send ajax post with user info, then redirect user to their personal page
    function loginUser(user) {
        $.post("/api/login", user).then(() => {
            window.location.replace("/userPage")
        }).catch(err => {
            console.log(err);
        });
    }
});
