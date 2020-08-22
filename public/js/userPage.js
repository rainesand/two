$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page showing ther username
    $.get("/api/user_data").then(data => {
        console.log(data);
        $(".member-name").text(data.username);
    });


    $("#submit").on("click", function () {
        var searchTerm = $("#searchBar").val().trim();
        console.log(searchTerm);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://cors-anywhere.herokuapp.com/https://unogsng.p.rapidapi.com/search?orderby=rating&limit=100&query=${searchTerm}`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "unogsng.p.rapidapi.com",
                "x-rapidapi-key": "a2bf636d02msh0285b0bad0d167cp1bad37jsn53ce1d57c625"
            }
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response);
        });

    
        
    });
});
