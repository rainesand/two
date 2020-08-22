$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page showing ther username
    $.get("/api/user_data").then(data => {
        console.log(data);
        $(".member-name").text(data.username);
    });
});