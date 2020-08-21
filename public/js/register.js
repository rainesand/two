$(function () {

    // when user clicks submit an ajax POST is sent containing their login information
    $("#submit").on("click", signup);

    function signup(e) {
        e.preventDefault();
        // if (!validInput(['username', 'password', 'email'])) return;
        console.log("sending user data back:");
        // creating user object to send in ajax post
        var user = {
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val()
        }
        console.log(user)
        $.post('/api/register', user).then(() => {
            window.location.replace("/userPage")
        });
    }
});
