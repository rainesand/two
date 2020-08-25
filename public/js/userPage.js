$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page showing ther username
    $.get("/api/user_data").then(data => {
        console.log(data);
        $(".member-name").text(data.username);
    });


    $("#submit").on("click", function (e) {
        e.preventDefault();

        // TESTING TESTING TESTING -----------------------------------------------
        // TESTING TESTING TESTING -----------------------------------------------
        // TESTING TESTING TESTING -----------------------------------------------
        var user = {
            username: "test",
            email: "test@gmail.com",
            password: "asdfasdf"
        }
        $.get('/api/test', user).then((results) => {
            console.log(results);
            console.log("testing");
        });


        // TESTING TESTING TESTING -----------------------------------------------
        // TESTING TESTING TESTING -----------------------------------------------
        // TESTING TESTING TESTING -----------------------------------------------




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
            if (response.COUNT === "0") {
                noResults();
            }
            var results = response.ITEMS;
            results.forEach(show => {
                makeShowCard(show);
            })
        });

    });

});

function makeShowCard(show) {
    console.log("I'm making cards");

    var card =
        `<button type="button" data-toggle="modal" data-target="#myModal">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${show.image}" alt="show image">
            <div class="card-body">
                <h5 class="card-title">${show.title}</h5>
                <hr>
                <p class="card-text">${show.synopsis}</p>
            </div>
        </div>
        </button>`

    $("#results").append(card);
}

function noResults() {
    // Display no results message if none found
    var none =
        `<div class="container" id="no">
            <div class="row">
                <div class="col-md-6">
                    <h1>Sorry, no results were found. Try a different search term!</h1>
                </div>
            </div>
        </div>`

    $("#noResults").append(none);
}

