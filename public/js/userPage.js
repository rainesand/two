$(document).ready(() => {
    // a GET request to figure out which user is logged in
    //  updates the HTML on the page showing ther username
    $.get("/api/user_data").then(data => {
        console.log(data);
        $(".member-name").text(data.username);
    });

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew7%3AUS&p=1&t=ns&st=adv",
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

        }
        var results = response.ITEMS;
        results.forEach(show => {
            newShowCard(show);
        })
    });

    $("#submit").on("click", function (e) {
        e.preventDefault();
        console.log("Searching");
        $("#newDisplay").addClass("hide");

        var searchTerm = $("#searchBar").val().trim();
        console.log(searchTerm);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=${searchTerm}-!1900%2C2020-!0%2C5-!0%2C10-!0-!Any-!Any-!Any-!gt100-!%7Bdownloadable%7D&t=ns&cl=all&st=adv&ob=Relevance&p=1&sa=and`,
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
    var pic = ""
    // Check to see if high quality image available
    if (show.largeimage === "") {
        pic = show.image;
    } else {
        pic = show.largeimage;
    }

    var card =
        `<div class="container>
        <button type="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" data-target="#${show.netflixid}Summary">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${pic}" alt="${show.title} Image">
            <div class="card-body">
            <h3><span class="badge badge-warning" id="ratingBadge"><i class="fas fa-star"></i>
            Score: ${show.rating}</span></h3>
                <h5 class="card-title">${show.title}</h5>
                <hr>
                <div class="collapse" id="${show.netflixid}Summary">
                    <p class="card-text">${show.synopsis}</p>
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#${show.netflixid}"><i class="fas fa-plus-circle"> </i> Add</button>
                </div>
            </div>
        </div>
        </button>
        </div>
        <!-- The Modal -->
    <div class="modal fade" id="${show.netflixid}">
      <div class="modal-dialog">
        <div class="modal-content">
        
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">${show.title}</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          
          <!-- Modal body -->
          <div class="modal-body">
            <div class="row align-items-center">
                <div class="col">
                    <img class="card-img-top" src="${pic}" alt="${show.title} Image">
                </div>
                <div class="row">
                <div class="col">
                    <div class="container">
                        <div class="form-group">
                            <label for="${show.netflixid}watchSelect">Watch Status</label>
                            <select id="${show.netflixid}watchSelect" class="form-control">
                                <option>Completed</option>
                                <option>Watching</option>
                                <option>Plan to Watch</option>
                            </select>
                        </div>
                    </div>
                </div>
                </div>
                <div class="row">
                <div class="col">
                    <div class="container">
                        <div class="form-group">
                            <label for="${show.netflixid}rateSelect">Rating</label>
                            <select class="form-control" id="${show.netflixid}rateSelect">
                                <option>10</option>
                                <option>9</option>
                                <option>8</option>
                                <option>7</option>
                                <option>6</option>
                                <option>5</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                                <option>1</option>
                            </select>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            

          <!-- Modal footer -->
          <div class="modal-footer center">
            
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-window-close"> </i> Cancel</button>
                <button type="button" id="${show.netflixid}add" class="btn btn-primary" data-dismiss="modal"><i class="fas fa-plus-circle"> </i> Add</button>
                <button type="button" id="${show.netflixid}discuss1" class="btn btn-warning"><i class="fas fa-users"></i> Discuss</button>
          </div>
          
        </div>
      </div>
    </div>`

    $("#results").append(card);

    $(`#${show.netflixid}discuss1`).on("click", function (e) {
        e.preventDefault();
        console.log("hello");
        $.get("/api/user_data").then(data => {
            var userId = data.id;
            var status = "";
            var rate = "";
            var pic = ""
            // Check to see if high quality image available
            if (show.largeimage === "") {
                pic = show.image;
            } else {
                pic = show.largeimage;
            }

            // status = $(`#${show.netflixid}watchSelect`).val().trim();
            // rate = $(`#${show.netflixid}rateSelect`).val().trim();
            var recentPost1 = {
                title: show.title,
                summary: show.synopsis,
                imdb: show.rating,
                userRate: 0,
                status: "status",
                img: pic,
                type: show.type,
                year: show.released,
                netflixID: show.netflixid,
                UserId: userId
            }
            console.log(recentPost1);
            $.post("/api/recent", recentPost1, function (res) {
                console.log("Show added to recent DB");
                location.replace("/discuss");
            });
        });

    });

    $(`#${show.netflixid}add`).on("click", function (e) {
        e.preventDefault();

        $("#addedAlertRes").fadeTo(2000, 500).slideUp(500, function () {
            $("#addedAlertRes").slideUp(500);
        });

        $.get("/api/user_data").then(data => {
            var userId = data.id;
            var status = "";
            var rate = "";
            status = $(`#${show.netflixid}watchSelect`).val().trim();
            rate = $(`#${show.netflixid}rateSelect`).val().trim();
            var showPost = {
                title: show.title,
                summary: show.synopsis,
                imdb: show.rating,
                userRate: rate,
                status: status,
                img: pic,
                type: show.type,
                year: show.released,
                netflixID: show.netflixid,
                UserId: userId
            }
            $.post("/api/shows", showPost, function (res) {
                console.log("Show added to DB");
            });
        });

    });
}

function newShowCard(show) {
    console.log("I'm making cards");
    var pic = ""
    // Check to see if high quality image available
    if (show.largeimage === "") {
        pic = show.image;
    } else {
        pic = show.largeimage;
    }

    var card =
        `
            <button id="${show.netflixid}Div"class="cardButt" type="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" data-target="#${show.netflixid}Summary">
            <div class="card" style="width: 14rem;">
                <img class="card-img-top" src="${pic}" alt="${show.title} Image">
                <div class="container-fluid score" id="${show.netflixid}Score">
                <h3><span class="badge badge-warning" id="ratingBadge"><i class="fas fa-star"></i>
                Score: ${show.rating}</span></h3>
                </div>
                <div class="card-body">
                    <div class="container">
                    <div class="row">
                    <div class="col">
                    <h5 class="card-title">${show.title}</h5>
                    <hr>
                    <div class="collapse" id="${show.netflixid}Summary">
                        <p class="card-text">${show.synopsis}</p>
                        <span type="button" class="btn btn-success" data-toggle="modal" data-target="#${show.netflixid}"> <i class="fas fa-plus"> </i> Add</span>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
             
            </div>
            </button>
            
            <!-- The Modal -->
    <div class="modal fade" id="${show.netflixid}">
      <div class="modal-dialog">
        <div class="modal-content">
        
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">${show.title}</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          
          <!-- Modal body -->
          <div class="modal-body">
            <div class="row align-items-center">
                <div class="col">
                    <img class="card-img-top" src="${pic}" alt="${show.title} Image">
                </div>
                <div class="row">
                <div class="col-md-7">
                    <div class="container">
                        <div class="form-group">
                            <label for="${show.netflixid}watchSelect">Watch Status</label>
                            <select id="${show.netflixid}watchSelect" class="form-control">
                                <option>Completed</option>
                                <option>Watching</option>
                                <option>Plan to Watch</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="container">
                        <div class="form-group">
                            <label for="${show.netflixid}rateSelect">Rating</label>
                            <select class="form-control" id="${show.netflixid}rateSelect">
                                <option>10</option>
                                <option>9</option>
                                <option>8</option>
                                <option>7</option>
                                <option>6</option>
                                <option>5</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                                <option>1</option>
                            </select>
                        </div>
                    </div>
                </div>

                </div>
            </div>
            

          <!-- Modal footer -->
          <div class="modal-footer center">
            
          <button type="button"  class="btn btn-danger" data-dismiss="modal"><i class="far fa-window-close"> </i> Cancel</button>
          <button type="button" id="${show.netflixid}add" class="btn btn-primary" data-dismiss="modal"><i class="fas fa-plus-circle"> </i> Add</button>
            <a id="discussButt" href="/discuss"><span type="button" id="${show.netflixid}discuss1" class="btn btn-warning"><i class="fas fa-users"></i> Discuss</span></a>

          </div>
          
        </div>
      </div>
    </div>`

    $("#newMenu").prepend(card);

    $("#discussButt").on("click", function (e) {
        e.preventDefault();

        $.get("/api/user_data").then(data => {
            var userId = data.id;
            var status = "";
            var rate = "";
            var pic = ""
            // Check to see if high quality image available
            if (show.largeimage === "") {
                pic = show.image;
            } else {
                pic = show.largeimage;
            }

            // status = $(`#${show.netflixid}watchSelect`).val().trim();
            // rate = $(`#${show.netflixid}rateSelect`).val().trim();
            var recentPost = {
                title: show.title,
                summary: show.synopsis,
                imdb: show.rating,
                userRate: 0,
                status: "status",
                img: pic,
                type: show.type,
                year: show.released,
                netflixID: show.netflixid,
                UserId: userId
            }
            console.log(recentPost);
            $.post("/api/recent", recentPost, function (res) {
                console.log("Show added to recent DB");
                location.replace("/discuss");
            });
        });

    });


    $(`#${show.netflixid}add`).on("click", function (e) {
        e.preventDefault();

        $("#addedAlertRes").fadeTo(2000, 500).slideUp(500, function () {
            $("#addedAlertRes").slideUp(500);
        });

        $.get("/api/user_data").then(data => {
            var userId = data.id;
            var rating = "";
            if (show.rating === "") {
                var rating = "7";
            } else {
                rating = show.rating;
            }
            var status = "";
            var rate = "";
            status = $(`#${show.netflixid}watchSelect`).val().trim();
            rate = $(`#${show.netflixid}rateSelect`).val().trim();
            var showPost = {
                title: show.title,
                summary: show.synopsis,
                imdb: rating,
                userRate: rate,
                status: status,
                img: pic,
                type: show.type,
                year: show.released,
                netflixID: show.netflixid,
                UserId: userId
            }
            $.post("/api/shows", showPost, function (res) {
                console.log(showPost);
                console.log("Show added to DB");
            });
        });

    });

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


function showAdd() {

}
