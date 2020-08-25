$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page showing ther username
    $.get("/api/user_data").then(data => {
        console.log(data);
        $(".member-name").text(data.username);
    });


    $("#submit").on("click", function (e) {
        e.preventDefault();
        var searchTerm = $("#searchBar").val().trim();
        console.log(searchTerm);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=${searchTerm}-!1900%2C2018-!0%2C5-!0%2C10-!0-!Any-!Any-!Any-!gt100-!%7Bdownloadable%7D&t=ns&cl=all&st=adv&ob=Relevance&p=1&sa=and`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
                "x-rapidapi-key": "a2bf636d02msh0285b0bad0d167cp1bad37jsn53ce1d57c625"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            $("#results").empty();
            var results = response.ITEMS;
            results.forEach(show => {
                makeShowCard(show);
            });
            function makeShowCard(show) {
                console.log("I'm making cards");

            var card = `<div class="col-md-3">
                <div class="card">
                    <img class="card-img-top" src="${show.image}" alt="show image">
                    <div class="card-body">
                <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="checkBox">
                <label class="form-check-label" for="exampleCheck1">${show.title}</label>
                </div>
                </div>
                </div>
                </div>`
            console.log($("input[type='checkbox']").val());
            $("#results").append(card);
            }
        });


    });

});
